import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "../components/Navbar.js";
import todaysDate from "../components/Date.js";
import cx from "classnames";

import styles from "../styles/Home.module.css";

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

const Results = ({ results }) => {
  const [isDescending, setIsDescending] = useState(false);
  const [columnName, setColumnName] = useState("country");

  const sortToDescending = (columnTitle) => {
    return results.sort((a, b) => (a[columnTitle] < b[columnTitle] ? 1 : -1));
  };

  const sortToAscending = (columnTitle) => {
    return results.sort((a, b) => (a[columnTitle] > b[columnTitle] ? 1 : -1));
  };

  const sortedResults = useMemo(
    () =>
      isDescending ? sortToDescending(columnName) : sortToAscending(columnName),
    [columnName, isDescending]
  );

  const total = (value) => {
    const sum = results.reduce((number, data) => number + data[value], 0);
    return sum;
  };

  console.log(results);

  return (
    <div className={styles.container}>
      <Navbar />
      <h2 className={styles.topHeader}>Covid 19 Tracker</h2>
      <h3 className={styles.date}>Last updated: {todaysDate()}</h3>
      <div className={styles.totalNumbers}>
        <h3>Total Cases: {total("cases")}</h3>
        <h3>Total Death: {total("deaths")}</h3>
      </div>

      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            <th className={cx(styles.cell, styles.cellHeadings)}>
              Country <br />
              <button
                onClick={() => {
                  if (columnName === "country") {
                    setIsDescending(!isDescending);
                    return;
                  }
                  setColumnName("country");
                  setIsDescending(true);
                }}
              >
                sort by alehphabets
              </button>
            </th>
            <th className={cx(styles.cell, styles.cellHeadings)}>
              Today&#39;s Cases
              <br />
              <button
                onClick={() => {
                  if (columnName === "todayCases") {
                    setIsDescending(!isDescending);
                    return;
                  }
                  setColumnName("todayCases");
                  setIsDescending(true);
                }}
              >
                sort by Ascending / Descending
              </button>
            </th>
            <th className={cx(styles.cell, styles.cellHeadings)}>
              Today&#39;s Recovered
              <br />
              <button
                onClick={() => {
                  if (columnName === "todayRecovered") {
                    setIsDescending(!isDescending);
                    return;
                  }
                  setColumnName("todayRecovered");
                  setIsDescending(true);
                }}
              >
                sort by Ascending / Descending
              </button>
            </th>
            <th className={cx(styles.cell, styles.cellHeadings)}>
              Today&#39;s Deaths
              <br />
              <button
                onClick={() => {
                  if (columnName === "todayDeaths") {
                    setIsDescending(!isDescending);
                    return;
                  }
                  setColumnName("todayDeaths");
                  setIsDescending(true);
                }}
              >
                sort by Ascending / Descending
              </button>
            </th>
          </tr>
        </thead>

        {results.map(
          ({
            id,
            country,
            todayCases,
            todayDeaths,
            todayRecovered,
            countryInfo,
          }) => {
            if (typeof countryInfo._id !== "number") {
              return null;
            }
            return (
              <tbody key={countryInfo._id}>
                <tr>
                  <td className={cx(styles.cell, styles.countryName)}>
                    <Image
                      src={countryInfo.flag}
                      alt="flag"
                      className={styles.image}
                      width={20}
                      height={20}
                    />{" "}
                    <Link href={`/country/${countryInfo._id}`}>{country}</Link>
                  </td>
                  <td className={styles.cell}>{todayCases}</td>
                  <td className={styles.cell}>{todayRecovered}</td>
                  <td className={styles.cell}>{todayDeaths}</td>
                </tr>
              </tbody>
            );
          }
        )}
      </table>
    </div>
  );
};

export default Results;
