// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

import "@testing-library/cypress/add-commands";
import dayjs from "dayjs";

interface MockOptions {
  connectedProviders?: Provider[];
  enableStubbedCheck?: boolean;
  exchangeInternalId?: string;
}

Cypress.Commands.add("mock", (options: MockOptions = {}) => {
  const { connectedProviders = [], enableStubbedCheck = true, exchangeInternalId } = options;
  if (enableStubbedCheck) {
    // Check that nothing reaches real api
    // We could use Cypress.Server.defaults if there wasn't a bug: https://github.com/cypress-io/cypress/issues/5289
    // Warning: Not detecting stubbed calls `beforeEach` when called from `it`.
    cy.intercept({ url: `${Cypress.env("GATSBY_TRADEAPI_URL_NEW")}/**` }, (req) => {
      // throw new Error(`${req.url} was not stubbed.`);
    });
  }

  // Fixtures
  cy.intercept("GET", "*/exchanges", { fixture: "exchanges.json" });
  cy.intercept("*/symbols*", { fixture: "symbols.json" });

  const connectedProvidersData = connectedProviders.map((p) => ({
    connected: true,
    exchangeInternalId,
    exchangeInternalIds: [
      {
        disconnecting: false,
        disconnectionType: null,
        internalId: exchangeInternalId,
        profitsMode: "reinvest",
        profitsShare: 55,
        retain: 0,
      },
    ],
    id: p.id,
    name: p.name,
    type: "profitSharing",
  }));
  cy.intercept("GET", "*/user/providers*", connectedProvidersData).as("mockedConnectedProviders");
  cy.intercept("GET", "*/user/exchange/*/available_balance", { USDT: 50 });

  // Wallet
  cy.intercept("GET", "**/api/get-balance", (req) => {
    req.reply(200, {});
  });

  cy.intercept("GET", "*/user/exchanges/*/balance*", {
    "1BTC": 0.03504541,
    "1USDT": 1906.47,
    totalFreeBTC: 0.01149706,
    totalFreeUSDT: 614.67,
    totalLockedBTC: 0.02134296,
    totalLockedUSDT: 1173.86,
    totalPnlBTC: 0.00076658,
    totalPnlUSDT: 42.16,
  });
});

// Cypress.Commands.add("mockConnectedProviders", (providers) => {
//   const connectedProviders = providers.map((p) => ({
//     connected: true,
//     exchangeInternalId: `TheBull${faker.random.alphaNumeric(10)}_${faker.random.alphaNumeric(13)}`,
//     // exchangeInternalIds: [],
//     id: p.id,
//     name: p.name,
//   }));

//   cy.intercept("GET", "*/user/providers*", connectedProviders).as("mockedUserProviders");
// });

Cypress.Commands.add("mockSession", (user: User) => {
  cy.intercept("GET", "*/user/session", { validUntil: dayjs().add(2, "h").valueOf() });
  cy.intercept("GET", "*/user", user);
});

Cypress.Commands.add("mockProviders", (providers: Provider[]) => {
  cy.intercept("GET", "*/providers/profit_sharing/*", providers).as("mockedProviders");
});
