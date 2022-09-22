import {
  Alert,
  Box,
  CircularProgress,
  Snackbar,
  TextField,
} from "@mui/material";

import React, { useEffect, useReducer, useState } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import MDButton from "components/MDButton";
import ReactSelect from "react-select";

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

const UpdateCountries = () => {
  const params = useParams();
  const { id } = params;
  const [country, newcountry] = useState("");
  const [marketplace, newMarketplace] = useState("");
  const [countrycode, newcountrycode] = useState("");

  const [open, setOpen] = React.useState(false);

  const [alertMsg, newalertMsg] = useState("");
  const [severity, newseverity] = useState("");
  const [status, setStatus] = useState(null);

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
        `http://localhost:5000/api/v1/selectors/updatecountry/${id}`,
        {
          countryCode: countrycode,
          country: country,
          marketplace: marketplace,
        }
      );
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

  useEffect(() => {
    getMarketplaces();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get(
          `http://localhost:5000/api/v1/selectors/findcountry/${id}`
        );
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
        newcountry(result.data.country);
        newcountrycode(result.data.countryCode);
        newMarketplace(result.data.marketplace._id);
        console.log(result);
      } catch (error) {
        dispatch({ type: "FETCH_FAIL", payload: error });
      }
    };
    fetchData();
    console.log(news);
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
        <p>Not Get</p>
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
              action=''
              method='post'
              className='create-1'
              onSubmit={handlesubmit}
            >
              <Box
                className='create-2 a'
                sx={{ marginBottom: { md: "-10px", xs: "0px" } }}
              >
                <TextField
                  id='outlined-required'
                  label='country'
                  value={country}
                  onChange={(e) => newcountry(e.target.value)}
                  name='country'
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
                  label='countrycode'
                  value={countrycode}
                  onChange={(e) => newcountrycode(e.target.value)}
                  name='countrycode'
                  sx={{ width: { md: "400px", xs: "100%" } }}
                />
              </Box>

              {/* <br />
              <Box
                className='create-2 a'
                sx={{ marginBottom: { md: "-10px", xs: "0px" } }}
              >
                <TextField
                  id='outlined-required'
                  label='Marketplace'
                  value={marketplace}
                  onChange={(e) => newMarketplace(e.target.value)}
                  name='Marketplace'
                  sx={{ width: { md: "400px", xs: "100%" } }}
                />
              </Box> */}

              <br />
              <ReactSelect
                options={marketPlaces}
                onChange={({ value }) => {
                  console.log(value);
                  newMarketplace(value);
                }}
                placeholder='Select Marketplace...'
                value={marketPlaces.filter((each) => {
                  return each.value === marketplace;
                })}
                styles={{
                  container: (styles) => ({
                    ...styles,
                    fontSize: "14px",
                    width: "43%",
                  }),
                }}
              />
              <br />

              <Box className='submit'>
                <MDButton type='submit' variant='outlined' color='secondary'>
                  Update{" "}
                  {status === "loading" && (
                    <CircularProgress
                      sx={{ ml: 1 }}
                      size='16px'
                      color='secondary'
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

export default UpdateCountries;
