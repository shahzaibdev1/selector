/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */

import { useEffect, useState } from "react";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import { useNavigate } from "react-router-dom";
import ReactSelect from "react-select";
import { CircularProgress } from "@mui/material";

export default function useData(tableRows, handleSave, data, geterror, status) {
  const navigate = useNavigate();

  const [state, setState] = useState({ ID: "", country: "", pageType: "" });

  const updateData = (e) => {
    navigate(`/updatepagetype/${e}`);
  };

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    console.log(tableRows);
    console.log(data);
  }, []);

  return {
    columns: [
      { Header: "Page Type", accessor: "pageType", align: "left" },
      { Header: "country", accessor: "country", align: "left" },
      { Header: "action", accessor: "action", align: "center" },
    ],

    rows: tableRows.map((row, idx) =>
      row.newRow
        ? {
            pageType: (
              <MDInput
                fullWidth
                color='text'
                fontWeight='medium'
                placeholder='Page Type'
                name='pageType'
                helperText={geterror.pageType}
                error={!!geterror.pageType}
                value={state.pageType}
                onChange={handleChange}
              />
            ),
            country: (
              <ReactSelect
                options={data.countries}
                onChange={({ value }) => setState({ ...state, country: value })}
                placeholder='Select Country...'
                value={data.countries.filter(
                  (each) => each.value === state.country
                )}
                styles={{
                  container: (styles) => ({
                    ...styles,
                    fontSize: "14px",
                    width: "100%",
                  }),
                }}
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
            pageType: (
              <MDTypography variant='caption' color='text' fontWeight='medium'>
                {row.pageType}
              </MDTypography>
            ),
            country: (
              <MDTypography variant='caption' color='text' fontWeight='medium'>
                {row.country?.country}
              </MDTypography>
            ),

            action: (
              <MDButton
                fullWidth
                fontWeight='medium'
                onClick={() => updateData(row._id)}
              >
                Edit
              </MDButton>
            ),
          }
    ),
  };
}
