/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { AuthContext } from "contexts/authContext";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Data(tableRows) {
  const { selectors } = useContext(AuthContext);
  const navigate = useNavigate();
  const updateData = (e) => {
    navigate(`/updateselectors/${e}`);
  };
  const Selector = ({ selectors }) => {
    if (!Array.isArray(selectors)) selectors = [selectors];

    return (
      <MDBox lineHeight={1} textAlign="center">
        {selectors.map((selector) => (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
            key={selector}
          >
            {selector}{" "}
          </MDTypography>
        ))}{" "}
      </MDBox>
    );
  };

  useEffect(() => {
    console.log(tableRows);
  }, [tableRows]);

  return {
    columns: [
      { Header: "name", accessor: "name", align: "left" },
      { Header: "selector text", accessor: "selectorText", align: "left" },
      { Header: "Tag Name", accessor: "tagName", align: "left" },
      { Header: "attribute", accessor: "attribute", align: "left" },
      { Header: "hint", accessor: "hint", align: "left" },
      { Header: "Value To Match", accessor: "valueToMatch", align: "left" },
      {
        Header: "Value Access Property",
        accessor: "valueAccessProperty",
        align: "left",
      },
      { Header: "marketplace", accessor: "marketplace", align: "center" },
      { Header: "country", accessor: "country", align: "center" },
      { Header: "pageType", accessor: "pageType", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],

    rows: [
      ...tableRows.map((row) => ({
        name: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {" "}
            {row.SelectorsData1.selectorName}{" "}
          </MDTypography>
        ),
        selectorText: <Selector selectors={row.SelectorsData1.selectorText} />,
        tagName: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            {row.SelectorsData1.tagName}{" "}
          </MDTypography>
        ),
        attribute: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            {row.SelectorsData1.attribute}{" "}
          </MDTypography>
        ),
        valueToMatch: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            {row.SelectorsData1.valueToMatch}{" "}
          </MDTypography>
        ),
        valueAccessProperty: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            {row.SelectorsData1.valueAccessProperty}{" "}
          </MDTypography>
        ),
        hint: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            {row.SelectorsData1.hint}{" "}
          </MDTypography>
        ),
        marketplace: <MDBox> {row.marketplace.marketplace} </MDBox>,
        country: <MDBox> {row.country.country} </MDBox>,
        pageType: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            {row.pageType.pageType}{" "}
          </MDTypography>
        ),
        action: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
            onClick={() => {
              console.log(row.SelectorsData1.id);
              updateData(row.SelectorsData1.id);
            }}
          >
            Edit{" "}
          </MDTypography>
        ),
      })),
    ],
  };
}
