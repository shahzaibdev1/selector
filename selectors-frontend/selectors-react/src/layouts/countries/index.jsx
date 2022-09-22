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
import useCountriesData from "layouts/countries/data/countriesData";
import { useContext, useEffect, useReducer, useState } from "react";
import MDDialog from "components/MDDialog";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Snackbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import PropTypes from "prop-types";
import { Add } from "@mui/icons-material";
import MDButton from "components/MDButton";
import axios from "axios";
import Pagination from "examples/Pagination/pagination";
import { AuthContext } from "contexts/authContext";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, countryData: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

const Content = () => <div>My Class</div>;

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

function Countries() {
  const { number1 } = useContext(AuthContext);

  const [capture, newcapture] = useState([]);
  const initialstate = {
    countryData: [],
    loading: true,
    error: "",
  };

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

  const [{ loading, error }, dispatch] = useReducer(reducer, initialstate);

  const postData = async (newRow) => {
    let result = await axios.post(
      "http://localhost:5000/api/v1/selectors/add-country",
      {
        country: newRow.country,
        countryCode: newRow.countryCode,
        marketplace: newRow.marketplace,
      }
    );
    return result;
  };

  const fetchData = async () => {
    dispatch({ type: "FETCH_REQUEST" });
    try {
      const result = await axios.get(
        "http://localhost:5000/api/v1/selectors/list-countries"
      );
      console.log(result);
      newcapture(result.data.reverse());
      dispatch({ type: "FETCH_SUCCESS", payload: result.data });
    } catch (error) {
      dispatch({ type: "FETCH_FAIL", payload: error });
    }
  };

  useEffect(() => {
    fetchData();
    getMarketplaces();
  }, []);

  const [tRows, setTRows] = useState(capture);

  const handleSaveRow = async (newRow, idx) => {
    setStatus("loading");
    // setTRows(tRows.map((row, id) => (idx === id ? newRow : row)));
    console.log(newRow);
    try {
      let sendDATA = await postData(newRow);

      if (sendDATA.status === 200) {
        fetchData();
        console.log("ok");
        newalertMsg("Your Data Update SuccessFully");
        newseverity("success");
        setOpen(true);
      }
    } catch (err) {
      // console.log(err + "errorr");
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

  const createMarketplaceData = (data) =>
    data.map((each) => ({
      value: each._id,
      label: each.marketplace,
    }));

  const [marketPlaces, setMarketplaces] = useState([]);

  const getMarketplaces = async () => {
    let alldata = await axios(
      "http://localhost:5000/api/v1/selectors/list-marketplace"
    );

    let updatedData = createMarketplaceData(alldata.data);

    setMarketplaces(updatedData);
  };

  const { columns, rows } = useCountriesData(
    tRows,
    handleSaveRow,
    {
      marketplaces: marketPlaces,
    },
    geterror,
    status
  );
  const [isOpen, setIsOpen] = useState(false);
  const [values] = useState({ marketplace: "", pageType: "", country: "" });
  const theme = useTheme();
  const mq = useMediaQuery(theme.breakpoints.down("md"));

  const handleClose = () => {
    setIsOpen(false);
  };

  const createFunction = (props, Component) => <Component {...props} />;

  const addCountry = () =>
    setTRows([{ country: "", countryCode: "", newRow: true }, ...tRows]);
  const [no1, newno1] = useState(0);

  useEffect(() => {
    // let filteredArr = [];
    setTRows(
      capture
        // .slice(number1, number1 + 4)
        .filter(
          (each) =>
            each.country
              ?.toLowerCase()
              .includes(values.country?.toLowerCase()) ||
            each.shortName
              ?.toLowerCase()
              .includes(values.country?.toLowerCase())
        )
    );
  }, [values, capture, no1, number1]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "80vh",
          }}
        >
          <CircularProgress />
        </Box>
      ) : error ? (
        <p>Not Data Get</p>
      ) : (
        <MDBox pt={3} pb={3}>
          <MDBox mb={7} width='fit-content' ml='auto'>
            <MDButton endIcon={<Add />} onClick={addCountry} fullWidth={mq}>
              Add country
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
                    Countries
                  </MDTypography>
                </MDBox>
                <MDBox pt={3}>
                  <MDDialog
                    Content={Content}
                    Actions={() => createFunction({ handleClose }, ActionsMenu)}
                    title='My TItle'
                    open={isOpen}
                    setOpen={setIsOpen}
                  />
                  <DataTable
                    table={{ columns, rows }}
                    isSorted={false}
                    entriesPerPage={false}
                    showTotalEntries={false}
                    noEndBorder
                  />
                </MDBox>
              </Card>

              {/* <Pagination capturedata={capture} /> */}
            </Grid>
          </Grid>
        </MDBox>
      )}
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

export default Countries;
