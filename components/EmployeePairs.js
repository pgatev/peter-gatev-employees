import { generatePairs } from "@/utils";
import styles from "./EmployeePairs.module.css";
export default function EmployeePairs({ data }) {
  const pairs = generatePairs(data);

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Employee 1</th>
          <th>Employee 2</th>
          <th>Project ID</th>
          <th>Days worked</th>
        </tr>
      </thead>
      <tbody>
        {pairs.map((r) => (
          <tr key={r.employee1 + r.employee2}>
            <td>{r.employee1}</td>
            <td>{r.employee2}</td>
            <td>{r.projectId}</td>
            <td>{r.commonDays}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
