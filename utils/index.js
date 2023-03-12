function countDaysInRanges(dateFrom1, dateTo1, dateFrom2, dateTo2) {
  const rangeStart = Math.max(dateFrom1, dateFrom2);
  const rangeEnd = Math.min(dateTo1, dateTo2);
  const minutes = 1000 * 60;
  const hours = minutes * 60;
  const days = hours * 24;
  const result = Math.round((rangeEnd - rangeStart) / days);

  return result < 0 ? 0 : result;
}

function groupEmployeesByProjects(data) {
  const projects = new Map();
  for (let i = 0; i < data.length; i++) {
    const key = data[i].projectId;
    if (!projects.has(key)) {
      projects.set(key, []);
    }
    const employees = projects.get(key);
    employees.push(data[i]);
  }
  return projects;
}

export function generatePairs(data) {
  const result = [];
  const projects = groupEmployeesByProjects(data);

  for (let [projectId, employees] of projects) {
    for (let i = 0; i < employees.length; i++) {
      let current = employees[i];
      for (let j = i + 1; j < employees.length; j++) {
        let employee = employees[j];
        let commonDays = countDaysInRanges(
          current.dateFrom,
          current.dateTo,
          employee.dateFrom,
          employee.dateTo
        );
        result.push({
          employee1: current.employeeId,
          employee2: employee.employeeId,
          projectId: projectId,
          commonDays: commonDays,
        });
      }
    }
  }
  result.sort((a, b) => b.commonDays - a.commonDays);
  return result;
}

export function getEmployeeRecords(data) {
  return data.map((r) => {
    const employeeId = r[0];
    const projectId = r[1];
    const dateFrom = new Date(Date.parse(r[2]));
    const dateTo = r[3] == "NULL" ? new Date() : new Date(Date.parse(r[3]));
    return {
      employeeId: employeeId,
      projectId: projectId,
      dateFrom: dateFrom,
      dateTo: dateTo,
    };
  });
}
