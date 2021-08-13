import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import styles from "../styles/Home.module.css";
import ClipLoader from "react-spinners/ClipLoader";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Example />
    </QueryClientProvider>
  );
}

function Example() {
  const { isLoading, error, data } = useQuery("repoData", () =>
    fetch("https://corona.lmao.ninja/v2/countries").then((res) => res.json())
  );
  const results = data;
  console.log(results);
  if (isLoading) return <ClipLoader size={50} />;

  if (error) return "An error has occurred: " + "error.message";

  return (
    <div>
      <tr key={results[1].id}>
        <td className={styles.cell}>
          {" "}
          Country: {results[1].country} <br />
          <img src={results[1].countryInfo.flag} className={styles.image} />
        </td>
        <td className={styles.cell}> Population: {results[1].population}</td>
        <td className={styles.cell}> Recovered: {results[1].recovered}</td>
        <td className={styles.cell}>
          {" "}
          TodayRecovered: {results[1].todayRecovered}
        </td>
        <td className={styles.cell}> Population: {results[1].population}</td>
      </tr>
    </div>
  );
}
