import React from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "../components/Navbar.js";
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

let Today = new Date();
const CurrentDate = Today.toISOString().split("T")[0];

const Results = ({ results }) => {
  return (
    <div className={styles.container}>
      <Navbar />
      <h2>Covid 19 Tracker</h2>
      <h3>Data Updated on: {CurrentDate}</h3>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={cx(styles.cell, styles.headings)}>Country</th>
            <th className={cx(styles.cell, styles.headings)}>
              Today&#39;s Cases
            </th>
            <th className={cx(styles.cell, styles.headings)}>
              Today&#39;s Recovered
            </th>
            <th className={cx(styles.cell, styles.headings)}>
              Today&#39;s Deaths
            </th>
          </tr>
        </thead>

        {results.map((result) => {
          const {
            id,
            country,
            todayCases,
            todayDeaths,
            todayRecovered,
            countryInfo,
          } = result;

          return (
            <tbody key={id}>
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
        })}
      </table>
    </div>
  );
};

export default Results;
