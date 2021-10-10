import React from "react";
import { useQuery } from "react-query";
import axios from "axios";

async function fetchData() {
  const { data } = await axios.get("http://localhost:5000");
  return data;
}

export default fetchData;
