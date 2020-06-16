import React, { useState } from "react";
import ExchangeAccountList from "../ExchangeAccountList";
import ExchangeAccountSettings from "../ExchangeAccountSettings";
import ExchangeAccountDeposit from "../ExchangeAccountDeposit";
import ExchangeAccountWithdraw from "../ExchangeAccountWithdraw";
import ExchangeAccountCreate from "../ExchangeAccountCreate";

/**
 * @typedef {Object} DefaultProps
 * @property {string} path Current step path.
 * @property {function} setPath Set current step path function.
 */

/**
 * @param {DefaultProps} props Default props.
 * @returns {JSX.Element} Component JSX.
 */
const ConnectExchangeViewContent = ({ path, setPath }) => {
  const [selectedExchangeInternalId, setExchangeInternalId] = useState("");

  /**
   * Navigate to action page.
   * @param {string} [internalId] Selected internal exchange id.
   * @param {string} selectedPath Action path.
   * @returns {void}
   */
  const navigateToAction = (selectedPath, internalId) => {
    if (internalId) {
      setExchangeInternalId(internalId);
    }
    setPath(selectedPath);
  };

  switch (path) {
    case "realAccount":
    case "demoAccount":
    default:
      return <ExchangeAccountList navigateToAction={navigateToAction} type={path} />;
    case "createAccount":
      return <ExchangeAccountCreate />;
    case "createDemoAccount":
      return <ExchangeAccountWithdraw />;
    case "connectAccount":
      return <ExchangeAccountWithdraw />;
    case "settings":
      return <ExchangeAccountSettings internalId={selectedExchangeInternalId} />;
    case "deposit":
      return <ExchangeAccountDeposit />;
    case "withdraw":
      return <ExchangeAccountWithdraw />;
  }
};

export default ConnectExchangeViewContent;
