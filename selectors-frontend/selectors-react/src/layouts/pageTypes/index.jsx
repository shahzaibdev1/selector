/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
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
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
import usePageTypeData from "layouts/pageTypes/data/pageTypeData";
import { useContext, useEffect, useState } from "react";
import MDDialog from "components/MDDialog";
import {
  Alert,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import PropTypes from "prop-types";
import { Add } from "@mui/icons-material";
import MDButton from "components/MDButton";
import axios from "axios";
import MDInput from "components/MDInput";
import ReactSelect from "react-select";
import { AuthContext } from "contexts/authContext";

const Content = ({ marketPlaces, pageTypes, countries, values, setValues }) => {
  // const [values, setValues] = useState({
  //   marketplace: oldValues.marketplace,
  //   pageType: oldValues.pageType,
  //   country: oldValues.country,
  //   name: "",
  //   selector: "",
  //   nodeType: "",
  //   nodeValue: "",
  // });

  const handleChange = (name, value) => {
    setValues({ ...values, [name]: value });
  };

  return (
    <MDBox>
      <Grid container spacing={2} justifyContent='center' alignItems='center'>
        <Grid item xs={12} sm={6} md={4}>
          <ReactSelect
            options={marketPlaces}
            onChange={({ value }) => handleChange("marketplace", value)}
            placeholder='Select Marketplace...'
            value={marketPlaces.filter(
              (each) => each.value === values.marketplace
            )}
            styles={{
              container: (styles) => ({
                ...styles,
                fontSize: "14px",
                width: "100%",
              }),
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <ReactSelect
            options={countries}
            onChange={({ value }) => handleChange("country", value)}
            value={countries.filter((each) => each.value === values.country)}
            placeholder='Select Country...'
            styles={{
              container: (styles) => ({
                ...styles,
                fontSize: "14px",
                width: "100%",
              }),
            }}
          />
        </Grid>
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <ReactSelect
          options={pageTypes}
          onChange={({ value }) => handleChange("pageType", value)}
          placeholder='Select Page Type...'
          value={pageTypes.filter((each) => each.value === values.pageType)}
          styles={{
            container: (styles) => ({
              ...styles,
              fontSize: "14px",
              width: "100%",
            }),
          }}
        />
      </Grid>

      <Grid sx={{ mt: 3 }} container spacing={2} alignItems='center'>
        <Grid item xs={12} sm={6} md={4}>
          <MDBox>
            <MDInput
              placeholder='Selector Name'
              name='selectorName'
              value={values.selectorName}
              onChange={(e) => handleChange([e.target.name], e.target.value)}
              sx={{ width: "100%" }}
            />
          </MDBox>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <MDBox>
            <MDInput
              placeholder='selector'
              name='selector'
              value={values.selector}
              onChange={(e) => handleChange([e.target.name], e.target.value)}
              sx={{ width: "100%" }}
            />
          </MDBox>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <MDBox>
            <MDInput
              placeholder='Node Type'
              name='nodeType'
              value={values.nodeType}
              onChange={(e) => handleChange([e.target.name], e.target.value)}
              sx={{ width: "100%" }}
            />
          </MDBox>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <MDBox>
            <MDInput
              placeholder='Node Value'
              name='nodeValue'
              value={values.nodeValue}
              onChange={(e) => handleChange([e.target.name], e.target.value)}
              sx={{ width: "100%" }}
            />
          </MDBox>
        </Grid>
      </Grid>
    </MDBox>
  );
};

const ActionsMenu = ({ handleClose }) => (
  <>
    <Button autoFocus onClick={handleClose}>
      Disagree
    </Button>
    <Button onClick={handleClose} autoFocus>
      Agree
    </Button>
  </>
);

ActionsMenu.propTypes = {
  handleClose: PropTypes.func.isRequired,
};

const createMarketplaceData = (data) =>
  data.map((each) => ({
    value: each._id,
    label: each.marketplace,
  }));

const createCountryData = (data) =>
  data.map((each) => ({
    value: each._id,
    label: each.country,
  }));

const createPageTypeData = (data) =>
  data.map((each) => ({
    value: each._id,
    label: each.pageType,
  }));

function PageTypes() {
  const { number1 } = useContext(AuthContext);

  const [tRows, setTRows] = useState([]);
  const [geterror, setError] = useState({});
  const [open, setOpen] = useState(false);

  const [alertMsg, newalertMsg] = useState("");
  const [severity, newseverity] = useState("");
  const [status, setStatus] = useState(null);

  const handleClose11 = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setStatus(null);
    setOpen(false);
  };

  const fetchData = async () => {
    try {
      const result = await axios.get(
        "http://localhost:5000/api/v1/selectors/get-all-pagetypes"
      );

      setTRows(result.data.reverse());
    } catch (error) {
      console.log(error);
    }
  };
  const postData = async (newRow) => {
    let result = await axios.post(
      "http://localhost:5000/api/v1/selectors/add-page-type",
      { pageType: newRow.pageType, country: newRow.country }
    );
    return result;
  };

  const handleSaveRow = async (newRow, idx) => {
    console.log(newRow);
    setStatus("loading");
    try {
      let sendDATA = await postData(newRow);
      console.log(sendDATA);
      if (sendDATA.status === 201) {
        console.log("ok");
        fetchData();
        newalertMsg("Your Data Update SuccessFully");
        newseverity("success");
        setOpen(true);
      }
    } catch (err) {
      console.log(err);
      setError(err.response.data.errors);
      if (err.response.data.errors.country) {
        newalertMsg(err.response.data.errors.country);
      } else if (err.response.data.errors.message) {
        newalertMsg(err.response.data.errors.message);
      } else {
        newalertMsg("Fill Your Empty Field");
      }
      newseverity("error");
      setOpen(true);
    }
  };
  const [marketPlaces, setMarketplaces] = useState([]);
  const [countries, setCountries] = useState([]);

  const { columns, rows } = usePageTypeData(
    tRows,
    handleSaveRow,
    {
      marketplaces: marketPlaces,
      countries,
    },
    geterror,
    status
  );
  const [isOpen, setIsOpen] = useState(false);
  const theme = useTheme();
  const mq = useMediaQuery(theme.breakpoints.down("md"));
  const [values, setValues] = useState({
    pageType: "",
    country: "",
  });

  const handleClose = () => {
    setIsOpen(false);
  };

  const getData = async () => {
    let alldata = await axios.post(
      "http://localhost:5000/api/v1/selectors/get-dashboard-selectors",
      values
    );

    let filteredArr = [];
    alldata.data.data.forEach((data) =>
      data.listing.forEach((each) => filteredArr.push({ ...each, ...data }))
    );
    setTRows(filteredArr);
  };

  const getMarketplaces = async () => {
    let alldata = await axios(
      "http://localhost:5000/api/v1/selectors/list-marketplace"
    );

    let updatedData = createMarketplaceData(alldata.data);

    setMarketplaces(updatedData);
  };

  const getCountries = async (marketplace) => {
    try {
      const result = await axios.get(
        "http://localhost:5000/api/v1/selectors/list-countries"
      );

      let updatedData = createCountryData(result.data);
      setCountries(updatedData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // getData();
    getMarketplaces();
  }, []);

  useEffect(() => getCountries(values.marketplace), [values.marketplace]);
  // useEffect(() => getPageType(values.country), [values.country]);

  useEffect(() => {
    // let filteredArr = [];
    fetchData();
    // getData();
  }, [values.marketplace, values.country, values.pageType]);

  const addPageType = () =>
    setTRows([{ pageType: "", ID: "", url: "", newRow: true }, ...tRows]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={3} pb={3}>
        <MDBox mb={7} width='fit-content' ml='auto'>
          <MDButton endIcon={<Add />} onClick={addPageType} fullWidth={mq}>
            Add Page Type
          </MDButton>
        </MDBox>

        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                // onClick={() => setIsOpen(!isOpen)}
                variant='gradient'
                bgColor='info'
                borderRadius='lg'
                coloredShadow='info'
              >
                <MDTypography variant='h6' color='white'>
                  PageType
                </MDTypography>
              </MDBox>

              <MDBox pt={3}>
                <MDDialog
                  open={isOpen}
                  onClose={handleClose}
                  aria-labelledby='responsive-dialog-title'
                >
                  <MDBox>
                    <DialogTitle id='responsive-dialog-title'>
                      Add new selector
                    </DialogTitle>
                    <DialogContent>
                      <Content
                        pageTypes={tRows}
                        countries={countries}
                        values={values}
                        setValues={setValues}
                      />
                    </DialogContent>
                    <DialogActions>
                      <ActionsMenu
                        getData={getData}
                        handleClose={handleClose}
                        values={values}
                      />
                    </DialogActions>
                  </MDBox>
                </MDDialog>

                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>

          {/* <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Projects Table
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns: pColumns, rows: pRows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid> */}
        </Grid>
      </MDBox>
      {/* <Footer /> */}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose11}>
        <Alert
          onClose={handleClose11}
          severity={severity}
          sx={{ width: "100%" }}
        >
          {alertMsg}
        </Alert>
      </Snackbar>
    </DashboardLayout>
  );
}

export default PageTypes;
