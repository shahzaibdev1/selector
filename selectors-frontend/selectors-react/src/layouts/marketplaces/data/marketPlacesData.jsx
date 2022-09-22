/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */

import { CircularProgress } from "@mui/material";
import axios from "axios";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export default function useData(tableRows, handleSave, geterror, status) {
  const navigate = useNavigate();
  const [state, setState] = useState({ URL: "", marketplaceName: "" });

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const updateData = (e) => {
    navigate(`/updatemarketplace/${e}`);
  };

  return {
    columns: [
      { Header: "URL", accessor: "URL", align: "left" },
      {
        Header: "Marketplace Name",
        accessor: "marketplaceName",
        align: "left",
      },
      { Header: "action", accessor: "action", align: "center" },
    ],

    rows: tableRows.map((row, idx) =>
      row.newRow
        ? {
            URL: (
              <MDInput
                fullWidth
                color='text'
                fontWeight='medium'
                placeholder='URL'
                helperText={geterror.url}
                error={!!geterror.url}
                name='URL'
                value={state.URL}
                onChange={handleChange}
              />
            ),
            marketplaceName: (
              <MDInput
                fullWidth
                color='text'
                fontWeight='medium'
                helperText={geterror.marketplace}
                error={!!geterror.marketplace}
                placeholder='Marketplace Name'
                name='marketplaceName'
                value={state.marketplaceName}
                onChange={handleChange}
              />
            ),
            action: (
              <MDButton
                fullWidth
                fontWeight='medium'
                onClick={() => handleSave(state, idx)}
              >
                Save{" "}
                {status === "loading" && (
                  <CircularProgress
                    sx={{ ml: 1, color: "#000000" }}
                    size='16px'
                  />
                )}
              </MDButton>
            ),
          }
        : {
            URL: (
              <MDTypography
                component='a'
                href='#'
                variant='caption'
                color='text'
                fontWeight='medium'
              >
                {" "}
                {row.URL}{" "}
              </MDTypography>
            ),
            marketplaceName: (
              <MDTypography variant='caption' color='text' fontWeight='medium'>
                {" "}
                {row.marketplaceName}{" "}
              </MDTypography>
            ),

            action: (
              <MDButton
                fullWidth
                fontWeight='medium'
                onClick={() => updateData(row.ID)}
              >
                Edit{" "}
              </MDButton>
            ),
          }
    ),
  };
}
