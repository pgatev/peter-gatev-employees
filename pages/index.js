import EmployeePairs from "@/components/EmployeePairs";
import styles from "./Index.module.css";
import { useState } from "react";
import CsvReader from "../components/CsvReader";
import { getEmployeeRecords } from "../utils";

export default function Index() {
  const [data, setData] = useState([]);

  return (
    <main>
      <div className="container">
        <CsvReader
          onDataLoaded={(data) => {
            setData(getEmployeeRecords(data));
          }}
        />
        {data.length ? <EmployeePairs data={data} /> : null}
      </div>
    </main>
  );
}
