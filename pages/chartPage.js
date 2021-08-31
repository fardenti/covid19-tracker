import React, { useState, useMemo } from "react";
import Image from "next/image";
import Navbar from "../shared/components/Navbar.js";
import BarChart from "../shared/components/BarChart.js";
import cx from "classnames";

const defaultEndpoint = "https://corona.lmao.ninja/v2/countries";

export async function getStaticProps() {
  const res = await fetch(defaultEndpoint);
  const data = await res.json();
  return {
    props: {
      results: data,
    },
  };
}
const ChartPage = ({ results }) => {
  return (
    <div>
      <Navbar />
      <BarChart results={results} />
    </div>
  );
};

export default ChartPage;
