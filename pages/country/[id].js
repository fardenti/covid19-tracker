import { QueryClient, useQuery } from "react-query";
import { useRouter } from "next/router";
import ClipLoader from "react-spinners/ClipLoader";
import Image from "next/image";

import styles from "../../styles/Home.module.css";

const Country = () => {
  const router = useRouter();
  const { id } = router.query;

  const { isLoading, error, data } = useQuery(["details", id], () =>
    fetch(`https://corona.lmao.ninja/v2/countries/${id}`).then((res) =>
      res.json()
    )
  );
  const results = data;

  if (isLoading) return <ClipLoader size={50} />;

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
