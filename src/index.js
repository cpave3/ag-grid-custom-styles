import React, { useState } from "react";
import { render } from "react-dom";
import { AgGridReact } from "ag-grid-react";

import { faker } from "@faker-js/faker";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

import "./styles.css";

const generateGrade = () => faker.datatype.number({ min: 0, max: 100 });

const makeData = (rowsToMake) => {
  let data = [];

  for (let index = 0; index < rowsToMake; index++) {
    data.push({
      name: faker.name.findName(),
      ag101: generateGrade(),
      ag102: generateGrade(),
      ag103: generateGrade(),
      ag104: generateGrade(),
      ag105: generateGrade(),
    });
  }

  return data;
};

const getAverageGradeFromParams = (params) => {
  const data = { ...params.data };
  delete data.name; // remove the name, as it is irrelevant
  const dataKeys = Object.keys(data);
  const totalGrade = dataKeys.reduce((total, key) => {
    return total + data[key];
  }, 0);
  return totalGrade / dataKeys.length;
};

const App = () => {
  const [rowData] = useState(() => makeData(15));

  const [columnDefs] = useState([
    { field: "name", cellStyle: { fontWeight: "bold" } },
    { field: "ag101", cellClass: "score-cell" },
    { field: "ag102", cellClass: "score-cell" },
    { field: "ag103", cellClass: "score-cell" },
    { field: "ag104", cellClass: "score-cell" },
    { field: "ag105", cellClass: "score-cell" },
  ]);

  const getRowStyle = (params) => {
    const averageGrade = getAverageGradeFromParams(params);

    if (averageGrade < 50) {
      return { background: "#ff6961" };
    }

    return undefined;
  };

  const getRowClass = (params) => {
    const averageGrade = getAverageGradeFromParams(params);

    if (averageGrade >= 65) {
      return "green-row";
    }
    return undefined;
  };

  return (
    <div className="ag-theme-alpine" style={{ height: 600 }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        getRowStyle={getRowStyle}
        getRowClass={getRowClass}
      ></AgGridReact>
    </div>
  );
};

render(<App />, document.getElementById("root"));
