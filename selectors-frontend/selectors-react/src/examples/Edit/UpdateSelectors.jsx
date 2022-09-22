import {
  Alert,
  Box,
  CircularProgress,
  Snackbar,
  TextField,
} from "@mui/material";

import React, { useContext, useEffect, useReducer, useState } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import MDButton from "components/MDButton";
import { AuthContext } from "contexts/authContext";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, news: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

const Updateselectors = () => {
  const { selectorsData } = useContext(AuthContext);

  const params = useParams();
  const { id } = params;
  const [SelectorName, newSelectorName] = useState("");
  const [Selector, newSelector] = useState("");
  const [tagName, newtagName] = useState("");
  const [valueAccessProperty, newvalueAccessProperty] = useState("");
  const [valuevalueToMatch, newvaluevalueToMatch] = useState("");
  const [attribute, newattribute] = useState("");
  const [hint, newhint] = useState("");
  const [Marketplace, newMarketplace] = useState("");
  const [Country, newCountry] = useState("");
  const [PageType, newPagetype] = useState("");
  const [open, setOpen] = React.useState(false);
  const [alertMsg, newalertMsg] = useState("");
  const [severity, newseverity] = useState("");
  const [status, setStatus] = useState(null);
  const [listingID, newlistingID] = useState("");
  const [marketplaceID, newmarketplaceID] = useState("");
  const [countryID, newcountryID] = useState("");
  const [pagetypeID, newpagetypeID] = useState("");

  const initialstate = {
    news: [],
    loading: true,
    error: "",
  };

  const [{ loading, error, news }, dispatch] = useReducer(
    reducer,
    initialstate
  );

  const handlesubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    try {
      let result = await axios.patch(
        `http://localhost:5000/api/v1/selectors/updateselectors/${id}`,
        {
          selectorName: SelectorName,
          selector: Selector,
          tagName: tagName,
          valueAccessProperty: valueAccessProperty,
        }
      );
      // let result1 = await axios.patch(
      //   `http://localhost:5000/api/v1/selectors/updatecountry/${countryID}`,
      //   {
      //     country: Country,
      //   }
      // );
      // let result2 = await axios.patch(
      //   `http://localhost:5000/api/v1/selectors/updatemarketplace/${marketplaceID}`,
      //   { marketplace: Marketplace }
      // );
      // let result3 = await axios.patch(
      //   `http://localhost:5000/api/v1/selectors/updatepagetype/${pagetypeID}`,
      //   { pageType: PageType }
      // );
      console.log(result);
      console.log(result.status);
      if (result.status === 200) {
        newalertMsg("Your Data Update SuccessFully");
        newseverity("success");
        setOpen(true);
      }
    } catch (err) {
      setOpen(true);
      newalertMsg(`Sorry! Not Data Send`);
      newseverity("error");
    }
  };

  useEffect(() => {
    console.log(selectorsData);
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get(
          `http://localhost:5000/api/v1/selectors/findselectors/${id}`
        );
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
        let findselectors = result.data.listing.find(
          (x) => x._id === id
        );
        newSelectorName(findselectors.selectorName);
        newSelector(findselectors.selectorName);
        newtagName(findselectors.tagName);
        newvalueAccessProperty(findselectors.valueAccessProperty);
        newvaluevalueToMatch(findselectors.valueToMatch);
        newattribute(findselectors.attribute);
        newhint(findselectors.hint);
        newCountry(result.data.country.country);
        newPagetype(result.data.pageType.pageType);
        newMarketplace(result.data.marketplace.marketplace);
        newcountryID(result.data.country._id);
        newmarketplaceID(result.data.marketplace._id);
        newlistingID(findselectors._id);
        newpagetypeID(result.data.pageType._id);
      } catch (error) {
        dispatch({ type: "FETCH_FAIL", payload: error });
      }
    };
    fetchData();
    // console.log(picture.name);
  }, []);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setStatus(null);
    setOpen(false);
  };

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
        <h1>Not Get</h1>
      ) : (
        <Box
          sx={{
            backgroundColor: "white",
            marginTop: "20px",
            marginLeft: { md: "0px", xs: "0px" },
            marginRight: { md: "0px", xs: "0px" },
            borderRadius: "0.75rem",
            boxShadow:
              "rgba(255, 255, 255, 0.9) 0rem 0rem 0.0625rem 0.0625rem inset, rgba(0, 0, 0, 0.05) 0rem 1.25rem 1.6875rem 0rem",
            border: "1px solid rgba(224,224, 224, 1)",
            marginBottom: "20px",
          }}
        >
          <Box
            sx={{
              paddingLeft: { md: "17px", xs: "9px" },
              paddingTop: "20px",
              paddingRight: { md: "17px", xs: "9px" },
              paddingBottom: "10px",
            }}
          >
            <form
              action=""
              method="post"
              className="create-1"
              onSubmit={handlesubmit}
            >
              <Box
                className="create-2 a"
                sx={{ marginBottom: { md: "-10px", xs: "0px" } }}
              >
                <TextField
                  id="outlined-required"
                  label="SelectorName"
                  value={SelectorName}
                  onChange={(e) => newSelectorName(e.target.value)}
                  name="SelectorName"
                  sx={{ width: { md: "400px", xs: "100%" } }}
                />
              </Box>
              <br></br>
              <Box
                className="create-2 a"
                sx={{ marginBottom: { md: "-10px", xs: "0px" } }}
              >
                <TextField
                  id="outlined-required"
                  label="Selector"
                  value={Selector}
                  onChange={(e) => newSelector(e.target.value)}
                  name="Selector"
                  sx={{ width: { md: "400px", xs: "100%" } }}
                />
              </Box>
              <br></br>
              <Box
                className="create-2 a"
                sx={{ marginBottom: { md: "-10px", xs: "0px" } }}
              >
                <TextField
                  id="outlined-required"
                  label="tagName"
                  value={tagName}
                  onChange={(e) => newtagName(e.target.value)}
                  name="tagName"
                  sx={{ width: { md: "400px", xs: "100%" } }}
                />
              </Box>
              <br></br>
              <Box
                className="create-2 a"
                sx={{ marginBottom: { md: "-10px", xs: "0px" } }}
              >
                <TextField
                  id="outlined-required"
                  label="valueAccessProperty"
                  value={valueAccessProperty}
                  onChange={(e) => newvalueAccessProperty(e.target.value)}
                  name="valueAccessProperty"
                  sx={{ width: { md: "400px", xs: "100%" } }}
                />
              </Box>
              <br></br>

              <Box
                className="create-2 a"
                sx={{ marginBottom: { md: "-10px", xs: "0px" } }}
              >
                <TextField
                  id="outlined-required"
                  label="attribute"
                  value={attribute}
                  onChange={(e) => newvalueAccessProperty(e.target.value)}
                  name="attribute"
                  sx={{ width: { md: "400px", xs: "100%" } }}
                />
              </Box>

              <br></br>

              <Box
                className="create-2 a"
                sx={{ marginBottom: { md: "-10px", xs: "0px" } }}
              >
                <TextField
                  id="outlined-required"
                  label="valuevalueToMatch"
                  value={valuevalueToMatch}
                  onChange={(e) => newvaluevalueToMatch(e.target.value)}
                  name="valuevalueToMatch"
                  sx={{ width: { md: "400px", xs: "100%" } }}
                />
              </Box>

              <br></br>

              <Box
                className="create-2 a"
                sx={{ marginBottom: { md: "-10px", xs: "0px" } }}
              >
                <TextField
                  id="outlined-required"
                  label="hint"
                  value={hint}
                  onChange={(e) => newhint(e.target.value)}
                  name="hint"
                  sx={{ width: { md: "400px", xs: "100%" } }}
                />
              </Box>
              {/* <br></br> */}
              {/* <Box
                className='create-2 a'
                sx={{ marginBottom: { md: "-10px", xs: "0px" } }}
              >
                <TextField
                  id='outlined-required'
                  label='Marketplace'
                  value={Marketplace}
                  onChange={(e) => newMarketplace(e.target.value)}
                  name='Marketplace'
                  sx={{ width: { md: "400px", xs: "100%" } }}
                />
              </Box>
              <br></br>
              <Box
                className='create-2 a'
                sx={{ marginBottom: { md: "-10px", xs: "0px" } }}
              >
                <TextField
                  id='outlined-required'
                  label='Country'
                  value={Country}
                  onChange={(e) => newCountry(e.target.value)}
                  name='Country'
                  sx={{ width: { md: "400px", xs: "100%" } }}
                />
              </Box>
              <br></br>
              <Box
                className='create-2 a'
                sx={{ marginBottom: { md: "-10px", xs: "0px" } }}
              >
                <TextField
                  id='outlined-required'
                  label='Pagetype'
                  value={PageType}
                  onChange={(e) => newPagetype(e.target.value)}
                  name='Pagetype'
                  sx={{ width: { md: "400px", xs: "100%" } }}
                />
              </Box> */}

              <br />

              <Box className="submit">
                <MDButton type="submit" variant="outlined" color="secondary">
                  Update{" "}
                  {status === "loading" && (
                    <CircularProgress
                      sx={{ ml: 1 }}
                      size="16px"
                      color="secondary"
                    />
                  )}{" "}
                </MDButton>
              </Box>
            </form>
          </Box>
        </Box>
      )}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {alertMsg}
        </Alert>
      </Snackbar>
    </DashboardLayout>
  );
};

export default Updateselectors;
