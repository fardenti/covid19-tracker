import { QueryClient, useQuery } from "react-query";
import { useRouter } from "next/router";
import { css } from "@emotion/react";
import CircleLoader from "react-spinners/CircleLoader";
import Image from "next/image";
import Navbar from "../../shared/components/Navbar.js";
import todaysDate from "../../shared/components/Date.js";
import cx from "classnames";

import styles from "../../styles/Home.module.css";

const override = css`
  display: block;
  margin: auto;
  border-color: red;
`;

const Country = () => {
  const router = useRouter();
  const { id } = router.query;

  const { isLoading, error, data } = useQuery(["details", id], () =>
    fetch(`https://corona.lmao.ninja/v2/countries/${id}`).then((res) =>
      res.json()
    )
  );

  if (isLoading)
    return <CircleLoader color={`#36D7B7`} css={override} size={50} />;

  if (error) return "An error has occurred: " + error.message;

  const {
    country,
    population,
    countryInfo,
    cases,
    deaths,
    critical,
    recovered,
  } = data;
  return (
    <div className={styles.container}>
      <Navbar />
      <h2 className={styles.topHeader}>Details for {country}</h2>
      <h3 className={styles.date}>Last updated: {todaysDate()}</h3>
      {/* <div className={styles.container}>
        <h3 className={styles.title}>Country:</h3>
        <div>
          <span>
            <Image
              src={countryInfo.flag}
              alt="flag"
              className={styles.image}
              width={20}
              height={20}
            />{" "}
            {country}
          </span>
        </div>
      </div> */}
      <table className={styles.detailsTable}>
        <tr>
          <td className={cx(styles.cell, styles.cellHeadings)}>Country:</td>
          <td className={cx(styles.cell, styles.cellHeadings)}>Population:</td>
          <td className={cx(styles.cell, styles.cellHeadings)}>
            Total cases to date:
          </td>
          <td className={cx(styles.cell, styles.cellHeadings)}>
            Total deaths to date:
          </td>
          <td className={cx(styles.cell, styles.cellHeadings)}>
            Total recovered to date:
          </td>
          <td className={cx(styles.cell, styles.cellHeadings)}>
            Currently Critical:
          </td>
        </tr>
        <tr>
          <td className={cx(styles.cell, styles.countryName)}>
            <Image
              src={countryInfo.flag}
              alt="flag"
              className={styles.image}
              width={20}
              height={20}
            />{" "}
            {country}
          </td>
          <td className={styles.cell}>{population}</td>
          <td className={styles.cell}>{cases}</td>
          <td className={styles.cell}>{deaths}</td>
          <td className={styles.cell}>{recovered}</td>
          <td className={styles.cell}>{critical}</td>
        </tr>
      </table>
    </div>
  );
};

export default Country;
