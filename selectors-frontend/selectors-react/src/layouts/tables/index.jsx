/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */

// React components
import { useEffect, useState } from "react";

// @mui material components
import {
  Button,
  IconButton,
  InputLabel,
  useTheme,
  useMediaQuery,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { Add } from "@mui/icons-material";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDDialog from "components/MDDialog";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
import authorsTableData from "layouts/tables/data/authorsTableData";

// Other components
import ReactSelect from "react-select";
import MDInput from "components/MDInput";
import axios from "axios";

const Content = ({
  marketPlaces,
  pageTypes,
  countries,
  values,
  setValues,
  selectorError,
}) => {
  // const [values, setValues] = useState({
  //   marketplace: oldValues.marketplace,
  //   pageType: oldValues.pageType,
  //   country: oldValues.country,
  //   name: "",
  //   selector: "",
  //   tagName: "",
  //   valueAccessProperty: "",
  // });

  const handleChange = (name, value) => {
    setValues({ ...values, [name]: value });
  };

  useEffect(() => {
    console.log(selectorError);
  }, [selectorError]);

  return (
    <MDBox>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={6} md={4}>
          <ReactSelect
            options={marketPlaces}
            onChange={({ value }) => handleChange("marketplace", value)}
            placeholder="Select Marketplace..."
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
          <p
            style={{
              fontSize: "0.75rem",
              color: "rgba(0,0,0,0.6)",
              fontWeight: "300",
              marginLeft: "14px",
              height: "20px",
            }}
          >
            {selectorError.marketplace}
          </p>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <ReactSelect
            options={countries}
            onChange={({ value }) => handleChange("country", value)}
            value={countries.filter((each) => each.value === values.country)}
            placeholder="Select Country..."
            styles={{
              container: (styles) => ({
                ...styles,
                fontSize: "14px",
                width: "100%",
              }),
            }}
          />
          <p
            style={{
              fontSize: "0.75rem",
              color: "rgba(0,0,0,0.6)",
              fontWeight: "300",
              marginLeft: "14px",
              height: "20px",
            }}
          >
            {selectorError.country}
          </p>
        </Grid>
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <ReactSelect
          options={pageTypes}
          onChange={({ value }) => handleChange("pageType", value)}
          placeholder="Select Page Type..."
          value={pageTypes.filter((each) => each.value === values.pageType)}
          styles={{
            container: (styles) => ({
              ...styles,
              fontSize: "14px",
              width: "100%",
            }),
          }}
        />
        <p
          style={{
            fontSize: "0.75rem",
            color: "rgba(0,0,0,0.6)",
            fontWeight: "300",
            // height: "20px",
            marginLeft: "14px",
          }}
        >
          {selectorError.pageType}
        </p>
      </Grid>

      <Grid sx={{ mt: 3 }} container spacing={2} alignItems="center">
        <Grid item xs={12} sm={6} md={4}>
          <MDBox>
            <MDInput
              placeholder="Selector Name"
              name="selectorName"
              helperText={selectorError.selectorName}
              error={!!selectorError.selectorName}
              value={values.selectorName}
              onChange={(e) => handleChange([e.target.name], e.target.value)}
              sx={{ width: "100%" }}
            />
          </MDBox>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <MDBox>
            <MDInput
              placeholder="Selector Text"
              name="selectorText"
              value={values.selectorText}
              helperText={selectorError.selectorText}
              error={!!selectorError.selectorText}
              onChange={(e) => handleChange([e.target.name], e.target.value)}
              sx={{ width: "100%" }}
            />
          </MDBox>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <MDBox>
            <MDInput
              placeholder="Tag Name"
              name="tagName"
              value={values.tagName}
              helperText={selectorError.tagName}
              error={!!selectorError.tagName}
              onChange={(e) => handleChange([e.target.name], e.target.value)}
              sx={{ width: "100%" }}
            />
          </MDBox>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <MDBox>
            <MDInput
              placeholder="attribute"
              name="attribute"
              value={values.attribute}
              helperText={selectorError.attribute}
              error={!!selectorError.attribute}
              onChange={(e) => handleChange([e.target.name], e.target.value)}
              sx={{ width: "100%" }}
            />
          </MDBox>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <MDBox>
            <MDInput
              placeholder="Value To Match"
              name="valueToMatch"
              value={values.valueToMatch}
              helperText={selectorError.valueToMatch}
              error={!!selectorError.valueToMatch}
              onChange={(e) => handleChange([e.target.name], e.target.value)}
              sx={{ width: "100%" }}
            />
          </MDBox>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <MDBox>
            <MDInput
              placeholder="Value Access Property"
              name="valueAccessProperty"
              value={values.valueAccessProperty}
              helperText={selectorError.valueAccessProperty}
              error={!!selectorError.valueAccessProperty}
              onChange={(e) => handleChange([e.target.name], e.target.value)}
              sx={{ width: "100%" }}
            />
          </MDBox>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <MDBox>
            <MDInput
              placeholder="Hint"
              name="hint"
              value={values.hint}
              helperText={selectorError.hint}
              error={!!selectorError.hint}
              onChange={(e) => handleChange([e.target.name], e.target.value)}
              sx={{ width: "100%" }}
            />
          </MDBox>
        </Grid>
      </Grid>
    </MDBox>
  );
};

const ActionsMenu = ({ handleClose, values, getData, newselectorError }) => {
  const selectorpostData = async (newData) => {
    let result = await axios.post(
      "http://localhost:5000/api/v1/selectors",
      values
    );
    return result;
  };

  const addSelector = async () => {
    try {
      let sendDATA = await selectorpostData(values);

      if (sendDATA.status === 200) {
        console.log("OK");
        handleClose();
        getData();
        newselectorError({
          tagName: "",
          attribute: "",
          nodeValue: "",
          marketplace: "",
          selector: "",
          selectorName: "",
        });
      }
    } catch (error) {
      console.log(error);
      newselectorError(error.response.data.errors);
    }
    // setStatus("loading");
    // try {
    //   let sendDATA = await postData(updatevalues);
    //   if (sendDATA.status === 200) {
    //     console.log("ok");
    //     newalertMsg("Data Added");
    //     newseverity("success");
    //     setOpen(true);
    //     setError({ marketplace: "", url: "" });
    //   }
    // } catch (err) {
    //   setError(err.response.data.errors);
    //   console.log(err);
    //   if (err.response.data.errors.marketplace) {
    //     newalertMsg("Fill Your Empty Field");
    //   } else if (err.response.data.errors.url) {
    //     newalertMsg("Fill Your Empty Field");
    //   } else {
    //     newalertMsg(err.response.data.errors.message);
    //   }
    //   newseverity("error");
    //   setOpen(true);
    // }
  };

  // const addSelector = async () => {
  //   const data = await axios.post(
  //     "http://localhost:5000/api/v1/selectors",
  //     values
  //   );

  // getData();

  //   handleClose();
  // };

  return (
    <>
      <Button autoFocus onClick={addSelector}>
        Add
      </Button>
      <Button onClick={handleClose} autoFocus>
        Cancel
      </Button>
    </>
  );
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

const pageTypeList = [
  { value: "", label: "All page types" },
  { value: "productPage", label: "Product Page" },
  { value: "productListingPage", label: "Product Listing page" },
  // { value: "facebook", label: "Facebook Marketplace" },
];

const countryList = [
  { value: "", label: "All countries" },
  { value: "US", label: "US" },
  { value: "UK", label: "UK" },
  // { value: "facebook", label: "Facebook Marketplace" },
];

const tableRows = [
  {
    name: "title",
    selector: ["#productTitle"],
    marketplace: "amazon",
    tagName: "span",
    nodeValue: "id",
    country: "US",
    pageType: "productPage",
  },

  {
    name: "price",
    selector: [".a-offscreen", ".a-price-whole"],
    tagName: "span",
    marketplace: "amazon",
    nodeValue: "class",
    country: "US",
    pageType: "productPage",
  },

  {
    name: "title",
    selector: ["#productTitle"],
    tagName: "span",
    marketplace: "facebook",
    nodeValue: "id",
    country: "US",
    pageType: "productPage",
  },
];

function Tables() {
  const [tRows, setTRows] = useState([]);
  const { columns, rows } = authorsTableData(tRows);
  const [isOpen, setIsOpen] = useState(false);
  const [marketPlaces, setMarketplaces] = useState([]);
  const [countries, setCountries] = useState([]);
  const [pageTypes, setPageTypes] = useState([]);
  const [values, setValues] = useState({
    marketplace: "",
    pageType: "",
    country: "",
    selectorName: "",
    selectorText: "",
    valueAccessProperty: "",
    valueToMatch: "",
    attribute: "",
    tagName: "",
    hint: "",
  });
  const theme = useTheme();
  const mq = useMediaQuery(theme.breakpoints.down("md"));

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleChange = (name, value) => {
    setValues({ ...values, [name]: value });
  };

  const getData = async () => {
    let alldata = await axios.post(
      "http://localhost:5000/api/v1/selectors/get-dashboard-selectors",
      values
    );

    let filteredArr = [];
    alldata.data.data.forEach((data) => {
      data.listing.forEach((each) => {
        let SelectorsData1 = {
          id: each._id,
          selectorName: each.selectorName,
          tagName: each.tagName,
          selectorText: each.selectorText,
          attribute: each.attribute,
          valueToMatch: each.valueToMatch,
          hint: each.hint,
          valueAccessProperty: each.valueAccessProperty,
        };
        filteredArr.push({ SelectorsData1, ...data });
      });
    });
    setTRows(filteredArr);
  };

  const getMarketplaces = async () => {
    let alldata = await axios(
      "http://localhost:5000/api/v1/selectors/list-marketplace"
    );

    let updatedData = createMarketplaceData(alldata.data);
    if (values.marketplace === "Select all") {
      setMarketplaces(alldata);
    } else {
      setMarketplaces(updatedData);
    }
  };

  const getCountries = async (marketplace) => {
    try {
      let alldata = await axios(
        `http://localhost:5000/api/v1/selectors/list-countries?marketplace=${marketplace}`
      );

      let updatedData = createCountryData(alldata.data);
      setCountries(updatedData);
    } catch (err) {
      console.log(err);
    }
  };

  const getPageType = async (country) => {
    try {
      let alldata = await axios(
        `http://localhost:5000/api/v1/selectors/get-all-pagetypes?country=${country}`
      );

      let updatedData = createPageTypeData(alldata.data);
      setPageTypes(updatedData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // getData();
    getMarketplaces();
  }, []);

  // useEffect(() => {
  //   console.log(tRows);
  // }, [tRows]);

  useEffect(() => {
    if (values.marketplace !== "") {
      getCountries(values.marketplace);
      console.log("not empty");
    } else if (values.marketplace === "Select all") {
      setCountries([]);
    } else {
      setCountries([]);
      console.log("Empty");
    }
  }, [values.marketplace]);

  useEffect(() => {
    if (values.country !== "") {
      getPageType(values.country);
    } else if (values.marketplace === "Select all") {
      setPageTypes([]);
    } else {
      setPageTypes([]);
    }
  }, [values.country, values.marketplace]);

  useEffect(() => {
    // let filteredArr = [];
    getData();
  }, [values.marketplace, values.country, values.pageType]);

  const [displaymarketplace, newdisplaymarket] = useState("none");
  const [displaycountry, newdisplaycountry] = useState("none");
  const [displaypagetype, newdisplaypageype] = useState("none");
  const [error, setError] = useState({});
  const [alertMsg, newalertMsg] = useState("");
  const [severity, newseverity] = useState("");
  const [status, setStatus] = useState(null);
  const [open, setOpen] = useState(false);

  const [marketplaceinput, newmarketplaceinput] = useState("");
  const [countryinput, newcountryinput] = useState("");
  const [updatevalues, setupdateValues] = useState({
    pagetype: "",
    country: "",
    countrycode: "",
    marketplace: "",
    marketplaceurl: "",
  });
  const [selectorError, newselectorError] = useState({});

  const handleChange1 = (e) => {
    setupdateValues({ ...updatevalues, [e.target.name]: e.target.value });
  };

  const handleClose1 = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setStatus(null);
    setOpen(false);
  };

  const postData = async (newData) => {
    let result = await axios.post(
      "http://localhost:5000/api/v1/selectors/add-marketplace",
      { marketplace: newData.marketplace, url: newData.marketplaceurl }
    );
    return result;
  };

  const countrypostData = async (newData) => {
    let result = await axios.post(
      "http://localhost:5000/api/v1/selectors/add-country",
      {
        country: newData.country,
        countryCode: newData.countrycode,
        marketplace: marketplaceinput,
      }
    );
    return result;
  };

  const pagepostData = async (newData) => {
    let result = await axios.post(
      "http://localhost:5000/api/v1/selectors/add-page-type",
      { pageType: newData.pagetype, country: countryinput }
    );
    return result;
  };

  const savemarketplace = async () => {
    setStatus("loading");
    try {
      let sendDATA = await postData(updatevalues);
      if (sendDATA.status === 200) {
        console.log("ok");
        newalertMsg("Data Added");
        newseverity("success");
        setOpen(true);
        setError({ marketplace: "", url: "" });
      }
    } catch (err) {
      setError(err.response.data.errors);
      console.log(err);
      if (err.response.data.errors.marketplace) {
        newalertMsg("Fill Your Empty Field");
      } else if (err.response.data.errors.url) {
        newalertMsg("Fill Your Empty Field");
      } else {
        newalertMsg(err.response.data.errors.message);
      }
      newseverity("error");
      setOpen(true);
    }
  };

  const savepagetype = async () => {
    setStatus("loading");
    try {
      let sendDATA = await pagepostData(updatevalues);
      if (sendDATA.status === 201) {
        console.log("ok");
        newalertMsg("Data Added");
        newseverity("success");
        setOpen(true);
        setError({ country: "", pageType: "" });
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

  const savecountry = async () => {
    setStatus("loading");
    try {
      let sendDATA = await countrypostData(updatevalues);
      if (sendDATA.status === 200) {
        newalertMsg("Data Added");
        newseverity("success");
        setOpen(true);
        setError({ marketPlace: "", country: "", countryCode: "" });
      }
    } catch (err) {
      setError(err.response.data.errors);
      console.log(err);
      if (err.response.data.errors.marketplace) {
        newalertMsg(err.response.data.errors.marketplace);
      } else if (err.response.data.errors.message) {
        newalertMsg(err.response.data.errors.message);
      } else if (err.response.data.errors.country) {
        newalertMsg("Fill Your Empty Field");
      } else {
        newalertMsg("Fill Your Empty Field");
      }
      newseverity("error");
      setOpen(true);
    }
  };

  const marketplaceClicker = () => {
    newdisplaymarket("flex");
    newdisplaycountry("none");
    newdisplaypageype("none");
  };

  const countryClicker = () => {
    newdisplaymarket("none");
    newdisplaycountry("flex");
    newdisplaypageype("none");
  };

  const pagetypeClicker = () => {
    newdisplaymarket("none");
    newdisplaycountry("none");
    newdisplaypageype("flex");
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={3} pb={3}>
        <Grid container mb={7} spacing={1} alignItems="center">
          <Grid item xs={12} sm={6} md={3}>
            <InputLabel sx={{ pb: 1 }}>Filter by Marketplace</InputLabel>

            <Grid container alignItems="center">
              <Grid item xs={10}>
                <ReactSelect
                  options={[
                    { value: "", label: "Select all" },
                    ...marketPlaces,
                  ]}
                  onChange={({ value }) => {
                    handleChange("marketplace", value);
                  }}
                  placeholder="Select Marketplace..."
                  styles={{
                    input: (styles) => ({ ...styles, height: "20px" }),
                    container: (styles) => ({ ...styles, fontSize: "14px" }),
                  }}
                />
              </Grid>

              <Grid item xs={2}>
                <IconButton onClick={marketplaceClicker}>
                  <Add />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <InputLabel sx={{ pb: 1 }}>Filter by country</InputLabel>
            <Grid container alignItems="center">
              <Grid item xs={10}>
                <ReactSelect
                  options={[{ value: "", label: "Select all" }, ...countries]}
                  onChange={({ value }) => {
                    handleChange("country", value);
                  }}
                  placeholder="Select country"
                  styles={{
                    container: (styles) => ({ ...styles, fontSize: "14px" }),
                  }}
                />
              </Grid>

              <Grid item xs={2}>
                <IconButton onClick={countryClicker}>
                  <Add />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <InputLabel sx={{ pb: 1 }}>Filter by Page Type</InputLabel>
            <Grid container alignItems="center">
              <Grid item xs={10}>
                <ReactSelect
                  options={[{ value: "", label: "Select all" }, ...pageTypes]}
                  onChange={({ value }) => handleChange("pageType", value)}
                  placeholder="Select page type..."
                  styles={{
                    container: (styles) => ({ ...styles, fontSize: "14px" }),
                  }}
                />
              </Grid>

              <Grid item xs={2}>
                <IconButton onClick={pagetypeClicker}>
                  <Add />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>

          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            display="flex"
            alignSelf="flex-end"
            justifyContent="flex-end"
          >
            <MDButton
              endIcon={<Add />}
              sx={{ display: "flex", alignItems: "center" }}
              onClick={() => setIsOpen(!isOpen)}
              fullWidth={mq}
            >
              Add selector
            </MDButton>
          </Grid>
        </Grid>

        <Grid
          container
          spacing={6}
          sx={{
            marginBottom: "50px",
            marginTop: "-80px",
            display: displaymarketplace,
          }}
        >
          <Grid item xs={12} sm={6} md={4}>
            <MDInput
              fullWidth
              color="text"
              fontWeight="medium"
              placeholder="URL"
              helperText={error.url}
              error={!!error.url}
              name="marketplaceurl"
              value={updatevalues.marketplaceurl}
              onChange={handleChange1}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            {" "}
            <MDInput
              fullWidth
              color="text"
              fontWeight="medium"
              placeholder="Marketplace Name"
              name="marketplace"
              helperText={error.marketplace}
              error={!!error.marketplace}
              value={updatevalues.marketplace}
              onChange={handleChange1}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4} sx={{ textAlign: "end" }}>
            <MDButton
              sx={{ width: "157px" }}
              fontWeight="medium"
              onClick={() => savemarketplace()}
            >
              Save
              {status === "loading" && (
                <CircularProgress
                  sx={{ ml: 1, color: "#000000" }}
                  size="16px"
                />
              )}
            </MDButton>
          </Grid>
        </Grid>

        <Grid
          container
          spacing={6}
          sx={{
            marginBottom: "50px",
            marginTop: "-80px",
            display: displaypagetype,
          }}
        >
          <Grid item xs={12} sm={6} md={4}>
            <MDInput
              fullWidth
              color="text"
              fontWeight="medium"
              placeholder="Page Type"
              name="pagetype"
              helperText={error.pageType}
              error={!!error.pageType}
              value={updatevalues.pagetype}
              onChange={handleChange1}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            {" "}
            <ReactSelect
              options={countries}
              onChange={({ value }) => {
                console.log(value);
                newcountryinput(value);
              }}
              placeholder="Select Country..."
              value={countries.filter((each) => each.value === countryinput)}
              styles={{
                container: (styles) => ({
                  ...styles,
                  fontSize: "14px",
                  width: "100%",
                }),
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4} sx={{ textAlign: "end" }}>
            <MDButton
              sx={{ width: "157px" }}
              fontWeight="medium"
              onClick={() => savepagetype()}
            >
              Save
              {status === "loading" && (
                <CircularProgress
                  sx={{ ml: 1, color: "#000000" }}
                  size="16px"
                />
              )}
            </MDButton>
          </Grid>
        </Grid>

        <Grid
          container
          spacing={6}
          sx={{
            marginBottom: "50px",
            marginTop: "-80px",
            display: displaycountry,
          }}
        >
          <Grid item xs={12} sm={6} md={3}>
            <MDInput
              fullWidth
              color="text"
              fontWeight="medium"
              helperText={error.country}
              error={!!error.country}
              placeholder="Country Name"
              name="country"
              value={updatevalues.country}
              onChange={handleChange1}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            {" "}
            <MDInput
              fullWidth
              placeholder="Country Short Code"
              color="text"
              name="countrycode"
              helperText={error.countryCode}
              error={!!error.countryCode}
              fontWeight="medium"
              value={updatevalues.countrycode}
              onChange={handleChange1}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            {" "}
            <ReactSelect
              options={marketPlaces}
              onChange={({ value }) => newmarketplaceinput(value)}
              placeholder="Select Marketplace..."
              value={marketPlaces.filter(
                (each) => each.value === marketplaceinput
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

          <Grid item xs={12} sm={6} md={3} sx={{ textAlign: "end" }}>
            <MDButton
              sx={{ width: "157px" }}
              fontWeight="medium"
              onClick={() => savecountry()}
            >
              Save
              {status === "loading" && (
                <CircularProgress
                  sx={{ ml: 1, color: "#000000" }}
                  size="16px"
                />
              )}
            </MDButton>
          </Grid>
        </Grid>

        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                // onClick={() => setIsOpen(!isOpen)}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Selectors
                </MDTypography>
              </MDBox>

              <MDBox pt={3}>
                <MDDialog
                  open={isOpen}
                  onClose={handleClose}
                  aria-labelledby="responsive-dialog-title"
                >
                  <MDBox>
                    <DialogTitle id="responsive-dialog-title">
                      Add new selector
                    </DialogTitle>
                    <DialogContent>
                      <Content
                        marketPlaces={marketPlaces}
                        pageTypes={pageTypes}
                        countries={countries}
                        values={values}
                        setValues={setValues}
                        selectorError={selectorError}
                      />
                    </DialogContent>
                    <DialogActions>
                      <ActionsMenu
                        getData={getData}
                        handleClose={handleClose}
                        values={values}
                        newselectorError={newselectorError}
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
        </Grid>
      </MDBox>
      {/* <Footer /> */}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose1}>
        <Alert
          onClose={handleClose1}
          severity={severity}
          sx={{ width: "100%" }}
        >
          {alertMsg}
        </Alert>
      </Snackbar>
    </DashboardLayout>
  );
}

export default Tables;
