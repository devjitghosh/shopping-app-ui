import { useState, useEffect } from "react";
import axios from "axios";
function useFetch(fetchFunction) {
  const [data, setData] = useState([]);
  const [isDataLoading, setIsDataLoading] = useState(true);
  useEffect(() => {
    fetchFunction();
  }, []);

  return {
    data,
    setData,
    isDataLoading,
    setIsDataLoading,
  };
}

export default useFetch;
