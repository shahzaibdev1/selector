/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { forwardRef } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// Custom styles for the MDDialog
import MDDialogRoot from "components/MDDialog/MDDialogRoot";
import { useMaterialUIController } from "context";

const MDDialog = forwardRef(({ open, children, ...rest }, ref) => {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  return (
    <MDDialogRoot {...rest} open={open} ownerState={{ children, darkMode }} ref={ref}>
      {children}
    </MDDialogRoot>
  );
});

// Setting default values for the props of MDDialog
MDDialog.defaultProps = {
  open: false,
  children: false,
};

// Typechecking props of the MDDialog
MDDialog.propTypes = {
  open: PropTypes.bool,
  children: PropTypes.node,
};

export default MDDialog;
