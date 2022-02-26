import React, { useEffect, useMemo, useState } from "react";
import { Projects } from "../components/projects/Projects";
import base from "../lib/Airtable";
import styled from "styled-components";
import { filterHeaders } from "../utils/utils";

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }

      input {
        font-size: 1rem;
        padding: 5;
        border: 1px solid black;
        
        margin: 0;
        border: 0;
      }
    }
  }

  .pagination {
    padding: 1rem;
  }

  .double-right {
    color: red;
    height: 1p;
  }
`;

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [skipPageReset, setSkipPageReset] = React.useState(false);

  useEffect(() => {
    getProjects();
  }, []);

  const getProjects = () => {
    base("projects_table")
      .select({
        view: "All projects",
      })
      .eachPage((records, fetchNextPage) => {
        records.forEach((record) => {
          // console.log(record);
        });

        setProjects(records);
        fetchNextPage();
        // console.log(records);
      });
  };
  const dataProjects = useMemo(() => {
    const rowsData = [];

    for (let i = 0; i < projects.length; i++) {
      let rowData = projects[i]?.fields;

      let row = {};

      for (let k in rowData) {
        if (typeof rowData[k] === "object") {
          for (let l in rowData[k]) {
            if (typeof rowData[k][l] === "object") {
              for (let n in rowData[k][l]) {
                row[n] = rowData[k][l][n];
              }
            } else {
              row[l] = rowData[k][l];
            }
          }
        } else {
          row[k] = rowData[k];
        }
      }
      rowsData.push(row);
    }

    return rowsData;
  }, [projects]);

  const columns = useMemo(() => {
    let cols = [];

    const projectsData = projects[0]?.fields;

    for (let element in projectsData) {
      let col = {};

      if ((typeof _, element === "object")) {
        col["Header"] = element;
        col["accessor"] = [];

        for (let elem in projectsData[element]) {
          col.columns.push({
            Header: elem,
            accessor: elem,
          });
        }
      } else {
        col["Header"] = element;
        col["accessor"] = element;
      }
      cols.push(col);
    }
    return cols;
  }, [projects]);

  // console.log("rows data", data);

  const filteredCols = filterHeaders(columns);
  const [data, setData] = React.useState(dataProjects);
  

  const updateMyData = (rowIndex, columnId, value) => {
    setSkipPageReset(true);
    setData((old) =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value,
          };
        }
        return row;
      })
    );
  };

  if (!columns) {
    return <p>Failed</p>;
  }

  if (projects.length <= 0) {
    return <p>Loading</p>;
  }



  console.log(dataProjects,"Heyyeyeyyeyeshdjwhjwejg");
  return (
    <>
      <Styles>
        <Projects
          columns={columns}
          data={dataProjects}
          skipPageReset={skipPageReset}
          updateMyData={updateMyData}
        />
      </Styles>
    </>
  );
}
