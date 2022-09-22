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
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Images
import masterCardLogo from "assets/images/logos/mastercard.png";
import visaLogo from "assets/images/logos/visa.png";

// Material Dashboard 2 React context
import { useMaterialUIController } from "context";
import { useEffect, useState } from "react";
import MDDialog from "components/MDDialog";
import { Box, Divider, Paper, Typography } from "@mui/material";
import { Close, Done } from "@mui/icons-material";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import MDInput from "components/MDInput";

function PaymentMethod() {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const [showModal, setShowModal] = useState(false);
  const [prices, setPrices] = useState([]);
  let [searchParams, setSearchParams] = useSearchParams();
  let [session_id, setSession_id] = useState();
  let [couponCode, setCouponCode] = useState();

  const getPrices = async () => {
    let prices = await axios("http://localhost:5000/api/v1/billing/get-prices");

    setPrices(prices.data?.data?.data);
  };

  const handleBuy = async (lookup_key) => {
    try {
      let url = await axios.post(
        "http://localhost:5000/api/v1/billing/create-checkout-session",
        { lookup_key, couponCode }
      );

      window.location.replace(url?.data?.url);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePortalSession = async (event) => {
    try {
      let url = await axios.post(
        "http://localhost:5000/api/v1/billing/create-portal-session",
        { session_id: searchParams.get("session_id") }
      );

      window.location.replace(url?.data?.url);
    } catch (error) {
      console.log(error);
    }
  };

  const getPaymentProfile = async (event) => {
    try {
      let url = await axios(
        `http://localhost:5000/api/v1/billing/verify-session${
          "?session_id=" + searchParams.get("session_id")
        }`
      );

      console.log(url);
      if (url.data.payment_status === "paid") setSession_id(url.data.id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPaymentProfile();
    getPrices();
  }, []);

  return (
    <Card id="delete-account">
      <MDBox
        pt={2}
        px={2}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <MDTypography variant="h6" fontWeight="medium">
          Payment Method
        </MDTypography>

        {!session_id ? (
          <MDButton
            variant="gradient"
            color="dark"
            onClick={() => setShowModal(!showModal)}
          >
            <Icon sx={{ fontWeight: "bold" }}>add</Icon>
            &nbsp;{!showModal ? "add new method" : "Cancel"}
          </MDButton>
        ) : searchParams.get("success") ? (
          <>
            <MDBox>
              <MDButton
                variant="gradient"
                color="success"
                id="subscription-added"
                type="button"
                sx={{ mr: 3 }}
                startIcon={<Done />}
              >
                subscription added
              </MDButton>

              <MDButton
                variant="gradient"
                color="dark"
                id="checkout-and-portal-button"
                type="button"
                onClick={handlePortalSession}
              >
                Manage your billing information
              </MDButton>
            </MDBox>
          </>
        ) : (
          <>
            <MDBox>
              <MDButton
                variant="gradient"
                color="success"
                id="subscription-added"
                type="button"
                sx={{ mr: 3 }}
                startIcon={<Done />}
              >
                subscription added
              </MDButton>

              <MDButton
                variant="gradient"
                color="dark"
                id="checkout-and-portal-button"
                type="button"
                onClick={handlePortalSession}
              >
                Complete your subscription
              </MDButton>
            </MDBox>
          </>
        )}
      </MDBox>

      <MDBox p={2}>
        {showModal && (
          <Grid container spacing={2} justifyContent="space-between">
            <Grid item xs={12} sm={6} md={4}>
              <MDBox
                variant="outlined"
                component={MDBox}
                borderRadius="lg"
                sx={{
                  backgroundColor: "#f8f9fa",
                  height: 400,
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <MDBox
                  sx={{
                    color: "#2bbfeb",
                    width: "fit-content",
                    margin: "auto",
                  }}
                >
                  <MDBox>
                    <MDTypography
                      fontWeight="bold"
                      fontSize="small"
                      align="center"
                    >
                      Basic
                    </MDTypography>
                  </MDBox>

                  <MDBox p={2}>
                    <MDTypography
                      variant="caption"
                      display="flex"
                      alignItems="center"
                      align="center"
                    >
                      $
                      <MDTypography
                        sx={{ px: 0.5 }}
                        variant="h3"
                        fontWeight="bold"
                      >
                        {parseInt(prices[0]?.unit_amount_decimal || 0) / 100}
                      </MDTypography>
                      /month
                    </MDTypography>
                  </MDBox>
                  <Divider variant="fullWidth" />
                </MDBox>

                <MDBox>
                  <MDTypography variant="body1" align="center">
                    <Done sx={{ color: "#1A73E8", mr: 1 }} />
                    Feature 1
                  </MDTypography>
                  <MDTypography variant="body1" align="center">
                    <Done sx={{ color: "#1A73E8", mr: 1 }} />
                    Feature 2
                  </MDTypography>

                  <MDTypography variant="body1" align="center">
                    <Close sx={{ color: "red", mr: 1 }} />
                    Feature 3
                  </MDTypography>

                  <MDTypography variant="body1" align="center">
                    <Close sx={{ color: "red", mr: 1 }} />
                    Feature 4
                  </MDTypography>
                </MDBox>

                <MDBox mt={2}>
                  <MDInput
                    label="Coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                  />
                </MDBox>

                <MDButton
                  variant="outlined"
                  onClick={() => handleBuy(prices[0]?.lookup_key)}
                  color="info"
                  sx={{
                    width: "fit-content",
                    margin: "auto",
                    display: "block",
                  }}
                >
                  Buy this
                </MDButton>
              </MDBox>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              {prices[1] && (
                <MDBox
                  variant="outlined"
                  component={MDBox}
                  borderRadius="lg"
                  sx={{
                    backgroundColor: "#f8f9fa",
                    height: 400,
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <MDBox
                    sx={{
                      color: "#2bbfeb",
                      width: "fit-content",
                      margin: "auto",
                    }}
                  >
                    <MDBox>
                      <MDTypography
                        fontWeight="bold"
                        fontSize="small"
                        align="center"
                      >
                        Standard
                      </MDTypography>
                    </MDBox>

                    <MDBox p={2}>
                      <MDTypography
                        variant="caption"
                        display="flex"
                        alignItems="center"
                        align="center"
                      >
                        $
                        <MDTypography
                          sx={{ px: 0.5 }}
                          variant="h3"
                          fontWeight="bold"
                        >
                          {parseInt(prices[1]?.unit_amount_decimal || 0) / 100}
                        </MDTypography>
                        /month
                      </MDTypography>
                    </MDBox>
                    <Divider variant="fullWidth" />
                  </MDBox>

                  <MDBox>
                    <MDTypography variant="body1" align="center">
                      <Done sx={{ color: "#1A73E8", mr: 1 }} />
                      Feature 1
                    </MDTypography>
                    <MDTypography variant="body1" align="center">
                      <Done sx={{ color: "#1A73E8", mr: 1 }} />
                      Feature 2
                    </MDTypography>

                    <MDTypography variant="body1" align="center">
                      <Done sx={{ color: "#1A73E8", mr: 1 }} />
                      Feature 3
                    </MDTypography>

                    <MDTypography variant="body1" align="center">
                      <Close sx={{ color: "red", mr: 1 }} />
                      Feature 4
                    </MDTypography>
                  </MDBox>

                  <MDBox mt={2}>
                    <MDInput
                      label="Coupon code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                    />
                  </MDBox>

                  <MDButton
                    variant="outlined"
                    color="info"
                    onClick={() => handleBuy(prices[1]?.lookup_key)}
                    sx={{
                      width: "fit-content",
                      margin: "auto",
                      display: "block",
                    }}
                  >
                    Buy this
                  </MDButton>
                </MDBox>
              )}
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              {prices[2] && (
                <MDBox
                  variant="outlined"
                  component={MDBox}
                  borderRadius="lg"
                  sx={{
                    backgroundColor: "#f8f9fa",
                    height: 400,
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <MDBox
                    sx={{
                      color: "#2bbfeb",
                      width: "fit-content",
                      margin: "auto",
                    }}
                  >
                    <MDBox>
                      <MDTypography
                        fontWeight="bold"
                        fontSize="small"
                        align="center"
                      >
                        Advanced
                      </MDTypography>
                    </MDBox>

                    <MDBox p={2}>
                      <MDTypography
                        variant="caption"
                        display="flex"
                        alignItems="center"
                        align="center"
                      >
                        $
                        <MDTypography
                          sx={{ px: 0.5 }}
                          variant="h3"
                          fontWeight="bold"
                        >
                          {parseInt(prices[2]?.unit_amount_decimal || 0) / 100}
                        </MDTypography>
                        /month
                      </MDTypography>
                    </MDBox>
                    <Divider variant="fullWidth" />
                  </MDBox>

                  <MDBox>
                    <MDTypography variant="body1" align="center">
                      <Done sx={{ color: "#1A73E8", mr: 1 }} />
                      Feature 1
                    </MDTypography>
                    <MDTypography variant="body1" align="center">
                      <Done sx={{ color: "#1A73E8", mr: 1 }} />
                      Feature 2
                    </MDTypography>

                    <MDTypography variant="body1" align="center">
                      <Done sx={{ color: "#1A73E8", mr: 1 }} />
                      Feature 3
                    </MDTypography>

                    <MDTypography variant="body1" align="center">
                      <Done sx={{ color: "#1A73E8", mr: 1 }} />
                      Feature 4
                    </MDTypography>
                  </MDBox>

                  <MDBox mt={2}>
                    <MDInput
                      label="Coupon code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                    />
                  </MDBox>

                  <MDButton
                    variant="outlined"
                    color="info"
                    onClick={() => handleBuy(prices[2]?.lookup_key)}
                    sx={{
                      width: "fit-content",
                      margin: "auto",
                      display: "block",
                    }}
                  >
                    Buy this
                  </MDButton>
                </MDBox>
              )}
            </Grid>
          </Grid>
        )}
      </MDBox>
      {/*       
      <MDBox p={2}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <MDBox
              borderRadius="lg"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              p={3}
              sx={{
                border: ({ borders: { borderWidth, borderColor } }) =>
                  `${borderWidth[1]} solid ${borderColor}`,
              }}
            >
              <MDBox
                component="img"
                src={masterCardLogo}
                alt="master card"
                width="10%"
                mr={2}
              />
              <MDTypography variant="h6" fontWeight="medium">
                ****&nbsp;&nbsp;****&nbsp;&nbsp;****&nbsp;&nbsp;7852
              </MDTypography>
              <MDBox
                ml="auto"
                lineHeight={0}
                color={darkMode ? "white" : "dark"}
              >
                <Tooltip title="Edit Card" placement="top">
                  <Icon sx={{ cursor: "pointer" }} fontSize="small">
                    edit
                  </Icon>
                </Tooltip>
              </MDBox>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6}>
            <MDBox
              borderRadius="lg"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              p={3}
              sx={{
                border: ({ borders: { borderWidth, borderColor } }) =>
                  `${borderWidth[1]} solid ${borderColor}`,
              }}
            >
              <MDBox
                component="img"
                src={visaLogo}
                alt="master card"
                width="10%"
                mr={2}
              />
              <MDTypography variant="h6" fontWeight="medium">
                ****&nbsp;&nbsp;****&nbsp;&nbsp;****&nbsp;&nbsp;5248
              </MDTypography>
              <MDBox
                ml="auto"
                lineHeight={0}
                color={darkMode ? "white" : "dark"}
              >
                <Tooltip title="Edit Card" placement="top">
                  <Icon sx={{ cursor: "pointer" }} fontSize="small">
                    edit
                  </Icon>
                </Tooltip>
              </MDBox>
            </MDBox>
          </Grid>
        </Grid>
      </MDBox> */}
    </Card>
  );
}

export default PaymentMethod;
