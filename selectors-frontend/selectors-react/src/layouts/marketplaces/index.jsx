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
import marketPlacesData from "layouts/marketplaces/data/marketPlacesData";
import { useContext, useEffect, useReducer, useRef, useState } from "react";
import {
  Alert,
  Box,
  CircularProgress,
  Snackbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
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
      return { ...state, marketData: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

function Marketplaces() {
  const { number1 } = useContext(AuthContext);
  const [capture, newcapture] = useState([]);
  const initialstate = {
    marketData: [],
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

  const [{ loading, error, marketData }, dispatch] = useReducer(
    reducer,
    initialstate
  );

  const postData = async (newRow) => {
    let result = await axios.post(
      "http://localhost:5000/api/v1/selectors/add-marketplace",
      { marketplace: newRow.marketplaceName, url: newRow.URL }
    );
    return result;
  };

  const fetchData = async () => {
    dispatch({ type: "FETCH_REQUEST" });
    try {
      const result = await axios.get(
        "http://localhost:5000/api/v1/selectors/list-marketplace"
      );
      console.log(result);
      newcapture(
        result.data
          .map((item) => {
            return {
              marketplaceName: item.marketplace,
              URL: item.marketplaceUrl,
              ID: item._id,
            };
          })
          .reverse()
      );
      dispatch({ type: "FETCH_SUCCESS", payload: result.data });
    } catch (error) {
      dispatch({ type: "FETCH_FAIL", payload: error });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get(
          "http://localhost:5000/api/v1/selectors/list-marketplace"
        );
        console.log(result);
        newcapture(
          result.data
            .map((item) => {
              return {
                marketplaceName: item.marketplace,
                URL: item.marketplaceUrl,
                ID: item._id,
              };
            })
            .reverse()
        );
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (error) {
        dispatch({ type: "FETCH_FAIL", payload: error });
      }
    };
    fetchData();
    console.log(marketData);
    // console.log(picture.name);
  }, []);

  const [tRows, setTRows] = useState(capture);

  const handleSaveRow = async (newRow, idx) => {
    setStatus("loading");
    // setTRows(tRows.map((row, id) => (idx === id ? newRow : row)));
    try {
      let sendDATA = await postData(newRow);

      if (sendDATA.status === 200) {
        console.log("ok");
        newalertMsg("Your Data Update SuccessFully");
        newseverity("success");
        setOpen(true);
        fetchData();
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

  const { columns, rows } = marketPlacesData(
    tRows,
    handleSaveRow,
    geterror,
    status
  );
  const [values] = useState({ marketplace: "", pageType: "", country: "" });
  const theme = useTheme();
  const mq = useMediaQuery(theme.breakpoints.down("md"));

  const addMarketplace = () =>
    setTRows([{ marketplaceName: "", URL: "", newRow: true }, ...tRows]);

  useEffect(() => {
    setTRows(
      capture
        // .slice(number1, number1 + 4)
        .filter((each) => each.marketplaceName.includes(values.marketplace))
    );
  }, [values, capture, number1]);
  useEffect(() => {
    console.log(capture);
    // console.log(arrayObj.current);
  }, [capture]);

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
          <MDBox mb={7} width="fit-content" ml="auto">
            <MDButton endIcon={<Add />} onClick={addMarketplace} fullWidth={mq}>
              Add Marketplace
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
                  variant="gradient"
                  bgColor="info"
                  borderRadius="lg"
                  coloredShadow="info"
                >
                  <MDTypography variant="h6" color="white">
                    Authors Table
                  </MDTypography>
                </MDBox>
                <MDBox pt={3}>
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

export default Marketplaces;
