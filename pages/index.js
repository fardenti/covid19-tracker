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
      <h2>Covid 19 Tracker</h2>
      <h3>Today&#39;s Data</h3>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.cell}>Country</th>
            <th className={styles.cell}>Today&#39;s Cases</th>
            <th className={styles.cell}>Today&#39;s Deaths</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result) => (
            <tr key={result.id}>
              <td className={styles.cell}>{result.country}</td>
              <td className={styles.cell}>{result.todayCases}</td>
              <td className={styles.cell}>{result.todayDeaths}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Results;
