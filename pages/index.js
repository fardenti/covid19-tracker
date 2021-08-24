import React, { useState, useEffect } from "react";
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
  const [isDescending, sortData] = useState(false);

  console.log(results);

  return (
    <div className={styles.container}>
      <Navbar />
      <h2 className={styles.topHeader}>Covid 19 Tracker</h2>
      <h3 className={styles.date}>Last updated: {todaysDate()}</h3>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={cx(styles.cell, styles.cellHeadings)}>Country</th>
            <th className={cx(styles.cell, styles.cellHeadings)}>
              Today&#39;s Cases
              <br />
              <button
                onClick={() =>
                  sortData(
                    results.sort((a, b) =>
                      a.todayCases < b.todayCases ? 1 : -1
                    )
                  )
                }
              >
                sort descending
              </button>
            </th>
            <th className={cx(styles.cell, styles.cellHeadings)}>
              Today&#39;s Recovered
            </th>
            <th className={cx(styles.cell, styles.cellHeadings)}>
              Today&#39;s Deaths
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
