import React from "react";
import "./Modal.scss";
import { Dialog } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

/**
 * @typedef {import('@material-ui/core/Dialog').DialogProps} DialogProps
 * @typedef {Object} DefaultProps
 * @property {Boolean} state
 * @property {DialogProps["onClose"]} onClose
 * @property {Boolean} [persist]
 * @property {Object} children
 * @property {Object} [style]
 * @property {String} size
 * @property {boolean} [showCloseIcon]
 * @property {boolean} [newTheme]
 */

/**
 * Provides display of children elements in a modal.
 *
 * @param {DefaultProps} props Modal props.
 * @returns {JSX.Element} Modal element.
 */
const GenericModal = (props) => {
  const {
    state,
    onClose,
    persist = false,
    children,
    size,
    showCloseIcon = true,
    newTheme = false,
    style = {},
  } = props;
  const fullScreen = size === "fullscreen";

  return (
    <Dialog
      classes={{ paper: `modal ${size} ${newTheme ? "newTheme" : ""}` }}
      disableEscapeKeyDown={persist}
      fullScreen={fullScreen}
      maxWidth={fullScreen ? false : "lg"}
      onClose={(event, reason) => {
        if (reason !== "backdropClick" || !persist) {
          onClose(event, reason);
        }
      }}
      PaperProps={{
        style,
      }}
      open={state}
      //   keepMounted={fullScreen}
    >
      {/* @ts-ignore */}
      {showCloseIcon && <CloseIcon className="closeIcon" onClick={onClose} />}
      {children}
    </Dialog>
  );
};

export default GenericModal;
