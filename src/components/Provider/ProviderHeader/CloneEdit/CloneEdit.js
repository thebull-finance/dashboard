import React, { useState } from "react";
import "./CloneEdit.scss";
import EditIcon from "../../../../images/ct/edit.svg";

/**
 * @typedef {Object} DefaultProps
 * @property {import('../../../../services/tradeApiClient.types').DefaultProviderGetObject} provider
 */
/**
 * Provides the navigation bar for the dashboard.
 *
 * @param {DefaultProps} props Default props
 * @returns {JSX.Element} Component JSX.
 */
const CloneEdit = ({ provider }) => {
  const [modal, showModal] = useState(false);

  return <img alt="zignaly" className="editIcon" onClick={() => showModal(true)} src={EditIcon} />;
};

export default CloneEdit;