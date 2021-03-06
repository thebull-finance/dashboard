import React from "react";
import ResetPasswordForm from "../../components/Forms/ResetPasswordForm";
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
const RecoverPassword = ({ token }) => {
  const intl = useIntl();

  return (
    <>
      <Helmet>
        <title>
          {`${intl.formatMessage({ id: "recover.title" })} | ${intl.formatMessage({
            id: "product",
          })}`}
        </title>
      </Helmet>
      <ResetForm code={token} form={ResetPasswordForm} />
    </>
  );
};

export default RecoverPassword;
