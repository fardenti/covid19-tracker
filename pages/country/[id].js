import { QueryClient, useQuery } from "react-query";
import { useRouter } from "next/router";
import { css } from "@emotion/react";
import CircleLoader from "react-spinners/CircleLoader";
import Image from "next/image";
import Navbar from "../../components/Navbar.js";

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
  const results = data;

  if (isLoading)
    return <CircleLoader color={`#36D7B7`} css={override} size={50} />;

  if (error) return "An error has occurred: " + error.message;

  const { country, population, countryInfo, cases, critical, recovered } = data;
  return (
    <div className={styles.container}>
      <Navbar />
      <table className={styles.table}>
        <tr>
          <td className={styles.cell}>
            {" "}
            Country: {country} <br />
            <Image
              src={countryInfo.flag}
              alt="flag"
              className={styles.image}
              width={50}
              height={50}
            />
          </td>
          <td className={styles.cell}> Population: {population}</td>
          <td className={styles.cell}> Total cases to date: {cases}</td>
          <td className={styles.cell}> Total Recovered: {recovered}</td>
          <td className={styles.cell}> Current Critical: {critical}</td>
        </tr>
      </table>
    </div>
  );
};

export default Country;
