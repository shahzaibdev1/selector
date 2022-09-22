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

// @mui material components
import { Dialog } from "@mui/material";
import { styled } from "@mui/material/styles";

export default styled(Dialog)(({ theme, ownerState }) => {
  const { palette, functions, typography } = theme;
  const { color, bgWhite, darkMode } = ownerState;

  const { gradients, light } = palette;
  const { pxToRem, linearGradient } = functions;
  const { size } = typography;

  // backgroundImage value
  let backgroundImageValue;

  if (bgWhite) {
    backgroundImageValue = gradients[color]
      ? linearGradient(gradients[color].main, gradients[color].state)
      : linearGradient(gradients.info.main, gradients.info.state);
  } else if (color === "light") {
    backgroundImageValue = linearGradient(gradients.dark.main, gradients.dark.state);
  }

  return {
    backgroundImage: backgroundImageValue,
    fontSize: size.lg,
    transform: `translateY(${pxToRem(-2)})`,
    ".MuiDialog-paper": {
      backgroundColor: darkMode ? palette.background.sidenav : light.focus,
      width: "fit-content",
      maxWidth: "none",
    },
  };
});
