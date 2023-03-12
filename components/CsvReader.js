import { useState } from "react";
import Papa from "papaparse";
import styles from "./CsvReader.module.css";

export default function CsvReader({ onDataLoaded }) {
  const [error, setError] = useState("");
  const [file, setFile] = useState(null);

  function handleChange(e) {
    setError("");

    if (e.target.files.length > 0) {
      const inputFile = e.target.files[0];

      if (inputFile.type !== "text/csv") {
        setError("Please submit a csv file.");
        return;
      }

      setFile(inputFile);
    }
  }

  function handleSubmit() {
    if (!file) {
      setError("Please submit a csv file.");
      return;
    }
    const reader = new FileReader();
    reader.onload = async ({ target }) => {
      const parsedData = Papa.parse(target.result, {
        skipEmptyLines: true,
      })?.data;
      onDataLoaded(parsedData);
    };
    reader.readAsText(file);
  }
  return (
    <div className={styles.csvReader}>
      <input type="file" accept=".csv" onChange={handleChange} />
      {error ? <span>{error}</span> : null}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
