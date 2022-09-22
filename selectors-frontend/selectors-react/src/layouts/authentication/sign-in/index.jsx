import { useContext, useEffect, useState } from "react";
import axios from "axios";
// react-router-dom components
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/authContext";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import { Alert, CircularProgress, Snackbar } from "@mui/material";

function Basic() {
  const { user, login } = useContext(AuthContext);
  // const [rememberMe, setRememberMe] = useState(false);
  let navigate = useNavigate();

  // const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const [email, newemail] = useState();
  const [password, newpassword] = useState();
  const [error, setError] = useState({});

  const [alertMsg, newalertMsg] = useState("");
  const [severity, newseverity] = useState("");
  const [status, setStatus] = useState(null);
  const [open, setOpen] = useState(false);

  const handleChange1 = (e) => {
    newemail(e.target.value);
  };

  const handleChange2 = (e) => {
    newpassword(e.target.value);
  };

  const handleSubmit = async () => {
    console.log("ok");
    setStatus("loading");
    try {
      let result = await axios.post(
        "http://localhost:5000/api/v1/users/sign-in",
        {
          email: email,
          password: password,
        }
        // { "Content-Type": "application/json" }
      );

      console.log(result.data.data);
      if (result.status === 200) {
        login(result.data.data);
        console.log(result);
        newemail("");
        newpassword("");
        newalertMsg("You Have Successfully Login");
        newseverity("success");
        setOpen(true);
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.response.data.error);
      console.log(err + "errorr");
      setOpen(true);
      newalertMsg(err.response.data.error.message);
      newseverity("error");
    }
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
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign in
          </MDTypography>
          {/* <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <FacebookIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GitHubIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GoogleIcon color="inherit" />
              </MDTypography>
            </Grid>
          </Grid> */}
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput
                type="email"
                label="Email"
                fullWidth
                // helperText={error.email}
                // error={!!error.email}
                onChange={handleChange1}
                value={email}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Password"
                fullWidth
                // helperText={error.password}
                // error={!!error.password}
                onChange={handleChange2}
                value={password}
              />
            </MDBox>
            {/* <MDBox display='flex' alignItems='center' ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant='button'
                fontWeight='regular'
                color='text'
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Remember me
              </MDTypography>
            </MDBox> */}
            <MDBox mt={4} mb={1}>
              <MDButton
                variant="gradient"
                color="info"
                fullWidth
                onClick={handleSubmit}
              >
                sign in
                {status === "loading" && (
                  <CircularProgress sx={{ ml: 1, color: "#fff" }} size="16px" />
                )}
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Don&apos;t have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/signup"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign up
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
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

export default Basic;
