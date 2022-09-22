import { Box, Button } from "@mui/material";
import { AuthContext } from "contexts/authContext";
import React, { useContext, useEffect, useState } from "react";

const dataa = [
  { no: 1, color: "red" },
  { no: 2, color: "blue" },
  { no: 3, color: "blue" },
  { no: 4, color: "blue" },
  { no: 5, color: "blue" },
  { no: 6, color: "blue" },
  { no: 7, color: "blue" },
  { no: 8, color: "blue" },
  { no: 9, color: "blue" },
  { no: 10, color: "blue" },
  { no: 11, color: "blue" },
  { no: 12, color: "blue" },
  { no: 13, color: "blue" },
];

const Pagination = ({ capturedata }) => {
  let capture = capturedata;
  const { number } = useContext(AuthContext);

  const [no, newno] = useState(0);
  const [no1, newno1] = useState(0);
  const [length, newlength] = useState(0);
  const [lengthno, newlengthno] = useState(0);

  useEffect(() => {
    console.log(dataa[no]);
    if (no > 0) {
      // dataa[no - 1].color = "blue";
    }
    // if (no !== dataa.length) dataa[no].color = "red";

    console.log(no);
  }, [no]);

  useEffect(() => {
    // console.log(dataa[no]);
    // console.log(capture.length);
    console.log(capture.length);
    console.log(capture.slice(no1, no1 + 4));
    console.log(dataa.slice(no1, no1 + 4));
    console.log(length);
    console.log(no1);
    number(no1);
    // newlength(Math.floor(capture.length / 4));
    newlength(Math.floor(capture.length / 4 + 1));
  }, [capture, no1, length]);

  return (
    <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
      <Button
        sx={{ fontSize: "40px" }}
        onClick={() => {
          let number = true;
          let number1 = 1;
          if (no1 === 0) {
            if (capture.length % 4 === 0) {
              newno1(capture.length - 4);
            } else {
              while (number) {
                if ((capture.length + number1) % 4 !== 0) {
                  number1++;
                } else {
                  newno1(capture.length + number1 - 4);
                  number = false;
                }
              }
            }
          } else {
            newno1(no1 - 4);
          }
          console.log(capture.slice(no1, no1 + 4));
          // if (no > 0) {
          //   dataa[no].color = "blue";
          //   newno(no - 1);
          //   dataa[no - 1].color = "red";
          // } else {
          //   newno(dataa.length - 1);
          //   dataa[dataa.length - 1].color = "red";
          //   dataa[0].color = "blue";
          // }

          if (lengthno > 0) {
            newlengthno(lengthno - 1);
          } else {
            newlengthno(length - 1);
          }
        }}
      >
        -
      </Button>

      {/* {dataa.map((value, index) => {
    if (dataa.length) {
      return (
        <Button
          key={index}
          sx={{
            color: value.color,
            border: `1px solid ${value.color}`,
          }}
          onClick={() => {
            dataa[no].color = "blue";
            newno(value.no - 1);
            dataa[value.no - 1].color = "red";
            console.log("Hello");
          }}
        >
          {value.no}
        </Button>
      );
    }
  })} */}
      <br />
      {!(dataa.length < 3) && (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <div
            style={{
              color: "#FFF",
              border: "1px solid red",
              borderRadius: "360px",
              backgroundColor: "red",
              width: "30px",
              height: "30px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            {/* {dataa[no].no ? dataa[no].no : dataa[0].no}{" "} */}
            {/* {no} */}
            {lengthno}
          </div>
          <div
            onClick={() => {
              // if (no === dataa.length - 1) {
              //   newno(0);
              // } else {
              //   newno(no + 1);
              // }

              if (lengthno === length - 1) {
                newlengthno(0);
              } else {
                newlengthno(no + 1);
              }
            }}
            style={{
              color: "#FFF",
              border: "1px solid blue",
              borderRadius: "360px",
              backgroundColor: "blue",
              marginLeft: "10px",
              marginRight: "10px",
              width: "30px",
              height: "30px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            {/* {no + 1 === dataa.length ? 0 : no + 1} */}
            {lengthno + 1 === length ? 0 : lengthno + 1}
          </div>
          <div
            onClick={() => {
              if (no === dataa.length - 2) {
                newno(0);
              } else if (no === dataa.length - 1) {
                newno(1);
              } else {
                newno(no + 2);
              }
            }}
            style={{
              color: "#FFF",
              border: "1px solid blue",
              borderRadius: "360px",
              backgroundColor: "blue",
              width: "30px",
              height: "30px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            {/* {dataa[no + 2].no ? dataa[no + 2].no : dataa[0].no} */}
            {/* {no + 2 === dataa.length + 1
          ? 1
          : no + 2 === dataa.length
          ? 0
          : no + 2} */}
            {lengthno + 2 === length + 1
              ? 1
              : lengthno + 2 === length
              ? 0
              : lengthno + 2}
          </div>
        </div>
      )}
      <Button
        sx={{ fontSize: "20px" }}
        onClick={() => {
          if (no < capture.length) {
            if (no1 > capture.length - 5) {
              console.log("Hello");
              newno1(0);
            } else {
              newno1(no1 + 4);
            }
            // console.log(dataa[no]);
            //   if (no === dataa.length - 1) {
            //     dataa[0].color = "red";
            //     dataa[dataa.length - 1].color = "blue";
            //     newno(0);
            //   } else {
            //     dataa[no].color = "blue";
            //     newno(no + 1);
            //     dataa[no + 1].color = "red";
            //   }
            // } else {
            //   newno(0);
            // }

            if (lengthno === length - 1) {
              newlengthno(0);
            } else {
              newlengthno(lengthno + 1);
            }
          } else {
            newlengthno(0);
          }
        }}
      >
        +
      </Button>
    </Box>
  );
};

export default Pagination;
