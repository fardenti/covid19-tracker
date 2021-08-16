import { QueryClient, useQuery } from "react-query";
import { useRouter } from "next/router";
import { css } from "@emotion/react";
import CircleLoader from "react-spinners/CircleLoader";
import Image from "next/image";

import styles from "../../styles/Home.module.css";

const override = css`
  display: block;
  margin: 0 auto;
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

  const { country, countryInfo, population, recovered, todayRecovered } = data;
  return (
    <div key={id} className={styles.container}>
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
          <td className={styles.cell}> Recovered: {recovered}</td>
          <td className={styles.cell}> TodayRecovered: {todayRecovered}</td>
        </tr>
      </table>
    </div>
  );
};

export default Country;
