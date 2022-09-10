import React, { useEffect, useState } from 'react';
import './style.css';
const APIURL = ``;
const defaultOptions = { ServiceTypes: [], CarCount: [] };

export default function App() {
  const [railData, setRailData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({
    CarCount: '',
    TrainNumber: '',
    ServiceType: '',
    LineCode: '',
  });
  const [optionValues, setOptionValues] = useState({ ...defaultOptions });
  useEffect(() => {
    getData();
    setInterval(getData, 12000);
  }, []);

  const handleSearch = () => {
    // call postData
    let newRailData = [...railData];
    if (filters.CarCount) {
      newRailData = doRailDataFilter(
        newRailData,
        'CarCount',
        Number(filters.CarCount)
      );
    }
    if (filters.TrainNumber) {
      newRailData = doRailDataFilter(
        newRailData,
        'TrainNumber',
        filters.TrainNumber
      );
    }
    if (filters.ServiceType) {
      newRailData = doRailDataFilter(
        newRailData,
        'ServiceType',
        filters.ServiceType
      );
    }
    if (filters.LineCode) {
      newRailData = doRailDataFilter(newRailData, 'LineCode', filters.LineCode);
    }
    setFilteredData(newRailData);
  };
  useEffect(() => handleSearch(), [railData, filters]);
  const doRailDataFilter = (list, key, value) => {
    const output = [];
    for (var i = 0; i < list.length; i++) {
      if (list[i][key] === value) {
        output.push(list[i]);
      }
    }
    return output;
  };
  const getData = async (url = '', data = {}) => {
    // const response = await fetch(url, {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     // TODO Add header
    //   },
    //   body: JSON.stringify(data),
    // });
    // return response.json();
    const trainData = [
      {
        TrainId: '100',
        TrainNumber: '301',
        CarCount: 6,
        DirectionNum: 1,
        DestinationStationCode: 'A01',
        LineCode: 'RD',
        SecondsAtLocation: 0,
        ServiceType: 'Normal',
      },
      {
        TrainId: '200',
        TrainNumber: 'XY1',
        CarCount: 6,
        DirectionNum: 2,
        CircuitId: 4321,
        DestinationStationCode: null,
        LineCode: null,
        SecondsAtLocation: 25,
        ServiceType: 'Special',
      },
    ];
    setRailData(trainData);
    // assign default value/reset the dropdown
    const optionValues = { ...defaultOptions };
    // populate dropdown values from train response
    trainData.forEach((i) => {
      if (optionValues.ServiceTypes.indexOf(i.ServiceType) === -1) {
        optionValues.ServiceTypes.push(i.ServiceType);
      }
      if (optionValues.CarCount.indexOf(i.CarCount) === -1) {
        optionValues.CarCount.push(i.CarCount);
      }
    });
    setOptionValues(optionValues);
  };
  const handleChange = ({ target: { name, value } }) => {
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
  };
  return (
    <div>
      <h3>Welcome to Rail</h3>
      <div className="d-flex" style={{ flexDirection: 'column' }}>
        <div>Filters:</div>
        <div className="d-flex">
          <input
            name="TrainNumber"
            id="TrainNumber"
            value={filters.TrainNumber}
            placeholder="Search Train Number"
            onChange={handleChange}
          />
          <div>
            <label for="ServiceType">Service Type: </label>
            <select name="ServiceType" id="ServiceType" onChange={handleChange}>
              <option value="">--Select--</option>
              {optionValues.ServiceTypes.map((i) => (
                <option value={i} key={`ServiceTypes_` + i}>
                  {i}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Colored Lines</label>
            <select name="LineCode" id="LineCode" onChange={handleChange}>
              <option value="">--Select--</option>
              <option value="RD">Red</option>
            </select>
          </div>
          <input
            name="CarCount"
            id="CarCount"
            value={filters.CarCount}
            placeholder="Search Car Count"
            onChange={handleChange}
          />
        </div>
      </div>
      <div>
        <h3>Trains</h3>
      </div>
      <table width="100%">
        <thead>
          <tr>
            <th>Train Number</th>
            <th>Car Count</th>
            <th>Direction Number</th>
            <th>CircuitId</th>
            <th>Destination Station Code</th>
            <th>Line Code</th>
            <th>Service Type</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((train) => (
            <tr>
              <td>{train.TrainNumber}</td>
              <td>{train.CarCount}</td>
              <td>{train.DirectionNum}</td>
              <td>{train.CircuitId}</td>
              <td>{train.DestinationStationCode}</td>
              <td>{train.LineCode}</td>
              <td>{train.ServiceType}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
