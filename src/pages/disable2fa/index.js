import React from "react";
import ConfirmTwoFADisableForm from "../../components/Forms/ConfirmTwoFADisableForm";
import { Helmet } from "react-helmet";
import { useIntl } from "react-intl";
import ResetForm from "components/Forms/ResetForm";

/**
 * @typedef {Object} PositionPageProps
 * @property {string} token Token aquired by the recover request.
 */

/**
 * Recover Password page component.
 *
 * @param {PositionPageProps} props Component properties.
 * @returns {JSX.Element} Recover Password element.
 */
const Disable2FA = ({ token }) => {
  const intl = useIntl();

  return (
    <>
      <Helmet>
        <title>
          {`${intl.formatMessage({ id: "security.2fa.disable" })} | ${intl.formatMessage({
            id: "product",
          })}`}
        </title>
      </Helmet>
      <ResetForm code={token} form={ConfirmTwoFADisableForm} />
    </>
  );
};

export default Disable2FA;
