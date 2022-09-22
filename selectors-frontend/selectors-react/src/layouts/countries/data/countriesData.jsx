/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */

import { CircularProgress } from "@mui/material";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactSelect from "react-select";

export default function useData(tableRows, handleSave, data, geterror, status) {
  const navigate = useNavigate();
  const [state, setState] = useState({
    ID: "",
    country: "",
    countryCode: "",
    marketplace: "",
  });

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const updateData = (e) => {
    navigate(`/updatecountry/${e}`);
  };

  useEffect(() => {
    console.log(tableRows[0]);
    console.log(state.marketplace);
  }, [tableRows, state]);

  return {
    columns: [
      //   { Header: "ID", accessor: "ID", align: "left" },
      { Header: "Country", accessor: "country", align: "left" },
      { Header: "CountryCode", accessor: "countryCode", align: "left" },
      { Header: "MarketPlace", accessor: "marketplace", align: "left" },
      { Header: "action", accessor: "action", align: "center" },
    ],

    rows: [
      ...tableRows.map((row, idx) =>
        row.newRow
          ? {
              country: (
                <MDInput
                  fullWidth
                  color='text'
                  fontWeight='medium'
                  error={!!geterror.country}
                  helperText={geterror.country}
                  placeholder='Country Name'
                  name='country'
                  onChange={handleChange}
                  value={state.country}
                />
              ),
              countryCode: (
                <MDInput
                  fullWidth
                  onChange={handleChange}
                  placeholder='Country Short Code'
                  color='text'
                  error={!!geterror.countryCode}
                  helperText={geterror.countryCode}
                  name='countryCode'
                  fontWeight='medium'
                  value={state.countryCode}
                />
              ),
              marketplace: (
                <ReactSelect
                  options={data.marketplaces}
                  onChange={({ value }) =>
                    setState({ ...state, marketplace: value })
                  }
                  placeholder='Select Marketplace...'
                  value={data.marketplaces.filter(
                    (each) => each.value === state.marketplace
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
              // ID: (
              //   <MDTypography variant="caption" color="text" fontWeight="medium">
              //     {row.ID}
              //   </MDTypography>
              // ),
              country: (
                <MDTypography
                  variant='caption'
                  color='text'
                  fontWeight='medium'
                >
                  {row.country}{" "}
                </MDTypography>
              ),
              countryCode: (
                <MDTypography
                  variant='caption'
                  color='text'
                  fontWeight='medium'
                >
                  {row.countryCode}{" "}
                </MDTypography>
              ),
              marketplace: (
                <MDTypography
                  variant='caption'
                  color='text'
                  fontWeight='medium'
                >
                  {row.marketplace.marketplace}
                </MDTypography>
              ),

              action: (
                <MDButton
                  fullWidth
                  fontWeight='medium'
                  onClick={() => updateData(row._id)}
                >
                  Edit{" "}
                </MDButton>
              ),
            }
      ),
    ],
  };
}
