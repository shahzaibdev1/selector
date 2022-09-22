import {
  Alert,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Container,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Snackbar,
  TextareaAutosize,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";

import { AuthContext } from "../../contexts/authContext";
import React, { useContext, useEffect, useReducer, useState } from "react";
import { Link, useParams } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DehazeIcon from "@mui/icons-material/Dehaze";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import FeedIcon from "@mui/icons-material/Feed";
import PeopleIcon from "@mui/icons-material/People";
import HomeIcon from "@mui/icons-material/Home";

import axios from "axios";

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
const label = { inputProps: { "aria-label": "Checkbox demo" } };

const Updatedata = () => {
  const params = useParams();
  const { id } = params;
  const [title, newNewstitle] = useState("");
  const [shortDescription, newshortDes] = useState("");
  const [website, newwebsite] = useState("");
  const [description, newdescription] = useState("");
  const [open, setOpen] = React.useState(false);
  const [featured, newfeatured] = useState(false);
  const [check, newcheck] = useState("false");
  const [changevalue, newchangevalue] = useState(0);
  const [alertMsg, newalertMsg] = useState("");
  const [severity, newseverity] = useState("");
  const [status, setStatus] = useState(null);
  const { login, user, token } = useContext(AuthContext);
  // const [picture, setPicture] = useState("");

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
      axios.patch(
        `http://localhost:5000/news/updateData/${id}`,
        {
          title: title,
          shortDescription: shortDescription,
          description: description,
          website: website,
          featured: check,
          // user: {
          //   image: picture,
          // },
          //   website: newwebsite,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      newalertMsg("Your Data Update SuccessFully");
      newseverity("success");
      setOpen(true);
    } catch (err) {
      setOpen(true);
      newalertMsg(`Sorry! Not Data Send`);
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

  const [displaySideBar, newdisplaySideBar] = useState("none");
  const [DazeIconDisplay, newDazeIconDisplay] = useState("flex");
  const [MoveIconDisplay, newMoveIconDisplay] = useState("none");
  const [show, newshow] = useState(false);
  const [IconShow, notShow] = useState(true);
  const newsClicker = () => {
    newshow(!show);
    notShow(!IconShow);
  };

  const DazebtnClicker = () => {
    newdisplaySideBar("flex");
    newMoveIconDisplay("flex");
    newDazeIconDisplay("none");
  };

  const MorevertbtnClicker = () => {
    newdisplaySideBar("none");
    newMoveIconDisplay("none");
    newDazeIconDisplay("flex");
  };

  const handleClick = () => {
    // if (featured === true) {
    //   if (changevalue === 0) {
    //     newcheck("true");
    //     newchangevalue(1);
    //   } else if (changevalue === 1) {
    //     newcheck("false");
    //     newchangevalue(0);
    //   }
    // }
    // if (featured === false) {
    console.log("clicker");
    if (changevalue === 0) {
      newcheck("true");
      newchangevalue(1);
    } else if (changevalue === 1) {
      newcheck("false");
      newchangevalue(0);
    }
    // }
  };

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get(
          `http://localhost:5000/news/findOne/${id}`
        );
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
        newNewstitle(result.data.title);
        newwebsite(result.data.website);
        console.log(result);
        newshortDes(result.data.shortDescription);
        newdescription(result.data.description);
        newcheck(result.data.featured);
        if (result.data.featured === "false") {
          newfeatured(false);
        } else if (result.data.featured === "true") {
          newchangevalue(1);
          newfeatured(true);
        }
      } catch (error) {
        dispatch({ type: "FETCH_FAIL", payload: error });
      }
    };
    fetchData();
    console.log(news);
    // console.log(picture.name);
  }, []);

  const [checked, setChecked] = React.useState(featured);

  useEffect(() => {
    setChecked(featured);
  }, [featured]);

  useEffect(() => {
    console.log(check);
  }, [check]);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <Box sx={{ backgroundColor: "rgb(240,242,245)", height: "100%" }}>
      <Grid container>
        <Grid item md={2}></Grid>
        <Grid item md={8} sx={{ width: "100%", marginBottom: "10px" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              border: "1px solid rgba(224,224, 224, 1)",
              margin: { md: "20px 52px", xs: "10px 5px" },
              width: { md: "75%", xs: "98%" },
              zIndex: "9",
              padding: "8px 12px",
              marginTop: { md: "10px !important", xs: "13px" },
              alignItems: "center",
              boxShadow:
                "rgba(255, 255, 255, 0.9) 0rem 0rem 0.0625rem 0.0625rem inset, rgba(0, 0, 0, 0.05) 0rem 1.25rem 1.6875rem 0rem",
              borderRadius: "0.75rem",
              position: "fixed",
              Zindex: "1200",
              backdropFilter: "saturate(200%) blur(0.875rem)",
              backgroundColor: "rgba(255, 255, 255, 0.6)",
              color: "rgb(52, 71, 103)",
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Box
                sx={{
                  dipslay: "flex",
                  flexDirection: "row",
                  alignItem: "center",
                }}
              >
                {/* <Typography sx={{ paddingTop: "10px" }}></Typography> */}
                <Typography sx={{ color: "rgb(0,0,0,0.6)", fontSize: "15px" }}>
                  <HomeIcon
                    sx={{
                      fontSize: "17px",
                      color: "rgb(0,0,0,0.6)",
                      position: "relative",
                      top: "3px",
                    }}
                  />{" "}
                  / All News / Update News
                </Typography>
              </Box>
              <Typography
                sx={{
                  // marginLeft: { md: "25px", sm: "10px" },
                  fontSize: { md: "1rem", xs: "15px" },
                }}
              >
                Update News
              </Typography>
            </Box>

            <Box
              sx={{
                display: { md: "flex", xs: "none" },
                flexDirection: { md: "row", xs: "column" },
                justifyContent: "space-between",
              }}
            >
              <Tooltip title='All News' arrow>
                <Typography
                  sx={{
                    paddingRight: "10px",
                    fontSize: { md: "1rem", xs: "15px" },
                  }}
                >
                  <Link
                    to='/userinfo'
                    style={{
                      color: "black",
                      textDecoration: "none",
                    }}
                  >
                    {" "}
                    <FeedIcon />
                  </Link>
                </Typography>
              </Tooltip>

              <Tooltip title='View Account' arrow>
                <Typography
                  sx={{
                    fontSize: { md: "1rem", xs: "15px" },
                  }}
                >
                  <Link
                    to='/userinfo'
                    style={{
                      color: "black",
                      textDecoration: "none",
                    }}
                  >
                    {" "}
                    <AccountCircleIcon />
                  </Link>
                </Typography>
              </Tooltip>
              {/* <Typography
                  sx={{
                    marginRight: { md: "25px", xs: "auto" },
                    display: { md: "none", xs: "flex" },
                    fontSize: "15px",
                  }}
                >
                  <Link
                    to='/addnews'
                    style={{
                      color: "black",
                      textDecoration: "none",
                    }}
                  >
                    {" "}
                    Add Product
                  </Link>
                </Typography> */}
            </Box>
            <Box sx={{ display: { md: "none", xs: "flex" } }}>
              <DehazeIcon
                onClick={DazebtnClicker}
                sx={{ display: DazeIconDisplay }}
              />
              <MoreVertIcon
                onClick={MorevertbtnClicker}
                sx={{ display: MoveIconDisplay }}
              />
            </Box>
          </Box>
          <Container>
            <Box
              sx={{
                backgroundColor: "white",
                marginTop: "103px",
                marginLeft: { md: "32px", xs: "0px" },
                marginRight: { md: "32px", xs: "0px" },
                borderRadius: "0.75rem",
                boxShadow:
                  "rgba(255, 255, 255, 0.9) 0rem 0rem 0.0625rem 0.0625rem inset, rgba(0, 0, 0, 0.05) 0rem 1.25rem 1.6875rem 0rem",
                border: "1px solid rgba(224,224, 224, 1)",
                marginBottom: "10px",
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
                      label='News Title'
                      value={title}
                      onChange={(e) => newNewstitle(e.target.value)}
                      name='title'
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
                      label='Website'
                      value={website}
                      onChange={(e) => newwebsite(e.target.value)}
                      name='website'
                      sx={{ width: { md: "400px", xs: "100%" } }}
                    />
                  </Box>
                  <br></br>

                  <Typography
                    sx={{
                      fontSize: "15px",
                      fontWeight: "500",
                      color: "rgb(2,2,2,0.65)",
                    }}
                  >
                    Short Description
                  </Typography>
                  <Box
                    className='create-2 a'
                    sx={{ marginBottom: { md: "-10px", xs: "0px" } }}
                  >
                    <TextareaAutosize
                      maxRows={4}
                      maxcolumns={4}
                      className='textArea'
                      label='Short Description'
                      aria-label='maximum height'
                      placeholder='Start Here'
                      value={shortDescription}
                      name='shortDescription'
                      onChange={(e) => newshortDes(e.target.value)}
                      style={{
                        maxWidth: "100%",
                        width: "100%",
                        minHeight: "79px",
                        fontSize: "15px",
                        paddingLeft: "8px",
                        paddingRight: "8px",
                      }}
                    />
                  </Box>

                  <br></br>
                  <Typography
                    sx={{
                      fontSize: "15px",
                      fontWeight: "500",
                      color: "rgb(2,2,2,0.65)",
                    }}
                  >
                    Detailed Description
                  </Typography>
                  <Box
                    className='create-2 a'
                    sx={{ marginBottom: { md: "-10px", xs: "0px" } }}
                  >
                    <TextareaAutosize
                      maxRows={4}
                      maxcolumns={4}
                      className='textArea'
                      label='Long Description'
                      aria-label='maximum height'
                      placeholder='Start Here'
                      value={description}
                      name='description'
                      onChange={(e) => newdescription(e.target.value)}
                      style={{
                        maxWidth: "100%",
                        width: "100%",
                        minHeight: "139px",
                        fontSize: "15px",
                        paddingLeft: "8px",
                        paddingRight: "8px",
                      }}
                    />
                  </Box>
                  <br></br>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom: "-15px",
                      marginTop: "-6px",
                    }}
                  >
                    <Typography>Featured</Typography>
                    <Checkbox
                      onClick={handleClick}
                      checked={checked}
                      onChange={handleChange}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  </Box>
                  <br />

                  <Box className='submit'>
                    <Button type='submit' variant='outlined' color='secondary'>
                      Update{" "}
                      {status === "loading" && (
                        <CircularProgress
                          sx={{ ml: 1 }}
                          size='16px'
                          color='secondary'
                        />
                      )}{" "}
                    </Button>
                  </Box>
                </form>
              </Box>
            </Box>
          </Container>
        </Grid>
      </Grid>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {alertMsg}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Updatedata;
