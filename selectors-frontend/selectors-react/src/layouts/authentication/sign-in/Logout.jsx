import { useContext, useEffect, useState } from "react";
import axios from "axios";
// react-router-dom components
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/authContext";

// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import { Alert, CircularProgress, Snackbar } from "@mui/material";

function Logout() {
  const { logout } = useContext(AuthContext);
  const [alertMsg, newalertMsg] = useState("");
  const [severity, newseverity] = useState("");
  const [status, setStatus] = useState(null);
  const [open, setOpen] = useState(false);
  let navigate = useNavigate();

  const logout1 = () => {
    setStatus("loading");
    logout();
    newalertMsg("You Have Successfully Login");
    newseverity("success");
    setOpen(true);
    // navigate("/authentication/sign-in", { replace: true });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setStatus(null);
    setOpen(false);
  };
  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography
            variant="h6"
            fontWeight="medium"
            color="white"
            mt={1}
            sx={{ cursor: "pointer" }}
            onClick={logout1}
          >
            Do You Want To Logout
            {status === "loading" && (
              <CircularProgress sx={{ ml: 1, color: "#fff" }} size="16px" />
            )}
          </MDTypography>
        </MDBox>
      </Card>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {alertMsg}
        </Alert>
      </Snackbar>
    </BasicLayout>
  );
}

export default Logout;
