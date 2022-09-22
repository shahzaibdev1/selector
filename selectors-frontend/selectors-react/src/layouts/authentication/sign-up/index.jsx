// react-router-dom components
import { Link, Navigate, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
// import Checkbox from "@mui/material/Checkbox";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/bg-sign-up-cover.jpeg";
import { useContext, useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../../../contexts/authContext";
import { Alert, CircularProgress, Snackbar } from "@mui/material";

function Cover() {
  const navigate = useNavigate();
  const [errors, seterrors] = useState({});
  const { login } = useContext(AuthContext);
  const [alertMsg, newalertMsg] = useState("");
  const [severity, newseverity] = useState("");
  const [status, setStatus] = useState(null);
  const [open, setOpen] = useState(false);
  const [values, setvalues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (event) => {
    setvalues({ ...values, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    console.log(values.name + "  " + values.email + "  " + values.password);
    console.log(errors);
  }, [values, errors]);

  const signup = async () => {
    setStatus("loading");
    try {
      let result = await axios.post(
        "http://localhost:5000/api/v1/users/sign-up",
        values,
        { "Content-Type": "application/json" }
      );

      if (result.status === 201) {
        // login(result.data.data);
        // navigate("/dashboard1");
        console.log(result);
        newalertMsg("You Have Successfully Register");
        newseverity("success");
        setOpen(true);
      }
    } catch (err) {
      seterrors(err.response.data.error);
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
    <CoverLayout image={bgImage}>
      <Card>
        <MDBox
          variant='gradient'
          bgColor='info'
          borderRadius='lg'
          coloredShadow='success'
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign='center'
        >
          <MDTypography variant='h4' fontWeight='medium' color='white' mt={1}>
            Join us today
          </MDTypography>
          <MDTypography display='block' variant='button' color='white' my={1}>
            Enter your email and password to register
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component='form' role='form'>
            <MDBox mb={2}>
              <MDInput
                type='text'
                label='FirstName'
                variant='standard'
                fullWidth
                value={values.firstName}
                // helperText={errors.name}
                // error={!!errors.name}
                name='firstName'
                onChange={handleChange}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type='text'
                label='LastName'
                variant='standard'
                fullWidth
                value={values.lastName}
                // helperText={errors.name}
                // error={!!errors.name}
                name='lastName'
                onChange={handleChange}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type='email'
                label='Email'
                variant='standard'
                value={values.email}
                // helperText={errors.email}
                // error={!!errors.email}
                name='email'
                onChange={handleChange}
                fullWidth
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type='password'
                label='Password'
                // helperText={errors.password}
                // error={!!errors.password}
                name='password'
                value={values.password}
                onChange={handleChange}
                variant='standard'
                fullWidth
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type='password'
                label='ConfirmPassword'
                // helperText={errors.password}
                // error={!!errors.password}
                name='confirmPassword'
                value={values.confirmPassword}
                onChange={handleChange}
                variant='standard'
                fullWidth
              />
            </MDBox>
            {/* <MDBox display='flex' alignItems='center' ml={-1}>
              <Checkbox />
              <MDTypography
                variant='button'
                fontWeight='regular'
                color='text'
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;I agree the&nbsp;
              </MDTypography>
              <MDTypography
                component='a'
                href='#'
                variant='button'
                fontWeight='bold'
                color='info'
                textGradient
              >
                Terms and Conditions
              </MDTypography>
            </MDBox> */}
            <MDBox mt={4} mb={1}>
              <MDButton
                variant='gradient'
                color='info'
                fullWidth
                onClick={signup}
              >
                sign up{" "}
                {status === "loading" && (
                  <CircularProgress sx={{ ml: 1, color: "#fff" }} size='16px' />
                )}
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign='center'>
              <MDTypography variant='button' color='text'>
                Already have an account?{" "}
                <MDTypography
                  component={Link}
                  to='/authentication/sign-in'
                  variant='button'
                  color='info'
                  fontWeight='medium'
                  textGradient
                >
                  Sign In
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
    </CoverLayout>
  );
}

export default Cover;
