/*
 * Copyright 2019 Hitachi Vantara Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from "react";
import PropTypes from "prop-types";
import Snackbar from "@material-ui/core/Snackbar";
import deprecatedPropType from "@material-ui/core/utils/deprecatedPropType";
import Slide from "@material-ui/core/Slide";
import HvSnackBarContentWrapper from "./SnackbarContentWrapper";

const snackBarDirComponent = direction => props => (
  <Slide {...props} direction={direction} />
);

const HvSnackbar = props => {
  const {
    classes,
    className,
    id,
    open,
    onClose,
    label,
    message,
    anchorOrigin,
    autoHideDuration,
    variant,
    showIcon,
    customIcon,
    action,
    transitionDuration,
    transitionDirection
  } = props;

  return (
    <Snackbar
      classes={classes}
      className={className}
      id={id}
      anchorOrigin={anchorOrigin}
      open={open}
      onClose={onClose}
      autoHideDuration={autoHideDuration}
      transitionDuration={transitionDuration}
      TransitionComponent={snackBarDirComponent(transitionDirection)}
    >
      <HvSnackBarContentWrapper
        label={label || message}
        variant={variant}
        customIcon={customIcon}
        showIcon={showIcon}
        action={action}
      />
    </Snackbar>
  );
};

HvSnackbar.propTypes = {
  /**
   * Class names to be applied.
   */
  className: PropTypes.string,
  /**
   * Id to be applied to the root node.
   */
  id: PropTypes.string,
  /**
   * A Jss Object used to override or extend the component styles.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the component when define as top right.
     */
    anchorOriginTopRight: PropTypes.string,
    /**
     * Styles applied to the component when define as top left.
     */
    anchorOriginTopLeft: PropTypes.string,
    /**
     * Styles applied to the component when define as top center.
     */
    anchorOriginTopCenter: PropTypes.string,
    /**
     * Styles applied to the component when define as bottom center.
     */
    anchorOriginBottomCenter: PropTypes.string,
    /**
     * Styles applied to the component when define as bottom left.
     */
    anchorOriginBottomLeft: PropTypes.string,
    /**
     * Styles applied to the component when define as bottom right.
     */
    anchorOriginBottomRight: PropTypes.string
  }).isRequired,
  /**
   *  If true, Snackbar is open.
   */
  open: PropTypes.bool,
  /**
   * Callback fired when the component requests to be closed. Typically onClose is used to set state in the parent component, which is used to control the Snackbar open prop. The reason parameter can optionally be used to control the response to onClose, for example ignoring clickaway.
   */
  onClose: PropTypes.func,
  /**
   * The message to display.
   * @deprecated Instead use the label property
   */
  message: deprecatedPropType(PropTypes.node),
  /**
   * The message to display.
   */
  label: PropTypes.string,
  /**
   *  The anchor of the Snackbar. vertical: "top", "bottom" | horizontal: "left","center","right. It defines where the snackbar will end his animation
   */
  anchorOrigin: PropTypes.shape({
    vertical: PropTypes.string,
    horizontal: PropTypes.string
  }),
  /**
   * The number of milliseconds to wait before automatically calling the onClose function. onClose should then set the state of the open prop to hide the Snackbar
   */
  autoHideDuration: PropTypes.number,
  /**
   * Variant of the snackbar.
   */
  variant: PropTypes.oneOf(["success", "warning", "error", "info", "default"]),
  /**
   * Custom icon to replace the variant default.
   */
  customIcon: PropTypes.node,
  /**
   * Controls if the associated icon to the variant should be shown.
   */
  showIcon: PropTypes.bool,
  /**
   * Action to display.
   */
  action: PropTypes.node,
  /**
   * Duration of transition in milliseconds.
   */
  transitionDuration: PropTypes.number,
  /**
   * Direction of slide transition set to one of "left", "right", "top", or "bottom".
   */
  transitionDirection: PropTypes.oneOf(["up", "down", "left", "right"])
};

HvSnackbar.defaultProps = {
  className: "",
  id: undefined,
  message: undefined,
  label: "",
  open: false,
  anchorOrigin: { vertical: "top", horizontal: "right" },
  onClose: null,
  autoHideDuration: 2000,
  customIcon: null,
  showIcon: false,
  action: null,
  variant: "default",
  transitionDuration: 0,
  transitionDirection: "up"
};

export default HvSnackbar;
