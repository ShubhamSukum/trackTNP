import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { api2022, api2022ppo } from "../configs/config";

export const DataContext = createContext();

export const DataProvider2022 = ({ children }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [dataPpo, setDataPpo] = useState([]);
  const [loadingPpo, setLoadingPpo] = useState(true);
  const [errorPpo, setErrorPpo] = useState(null);

  useEffect(() => {
    axios
      .get(api2022)
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });

    axios
      .get(api2022ppo)
      .then((response) => {
        setDataPpo(response.data);
        setLoadingPpo(false);
      })
      .catch((error) => {
        setErrorPpo(error.message);
        setLoadingPpo(false);
      });
  }, []);

  return (
    <DataContext.Provider
      value={{ data, loading, error, dataPpo, loadingPpo, errorPpo }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData2022 = () => {
  return useContext(DataContext);
};
