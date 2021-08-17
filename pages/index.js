import React from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "../components/Navbar.js";

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
  console.log(results);

  return (
    <div className={styles.container}>
      <Navbar />
      <h2>Covid 19 Tracker</h2>
      <h3>Today&#39;s Data</h3>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.cell}>Country</th>
            <th className={styles.cell}>Today&#39;s Cases</th>
            <th className={styles.cell}>Today&#39;s Recovered</th>
            <th className={styles.cell}>Today&#39;s Deaths</th>
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
          console.log(countryInfo._id);
          return (
            <tbody key={id}>
              <tr>
                <td className={styles.cell}>
                  <Link href={`/country/${countryInfo._id}`}>{country}</Link>
                  <br />
                  <Image
                    src={countryInfo.flag}
                    alt="flag"
                    className={styles.image}
                    width={20}
                    height={20}
                  />
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
