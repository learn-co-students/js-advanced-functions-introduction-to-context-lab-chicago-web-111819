
function createEmployeeRecord(employeeData) {
  return {
    firstName: employeeData[0],
    familyName: employeeData[1],
    title: employeeData[2],
    payPerHour: employeeData[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}

function createEmployeeRecords(employeesData) {
  return employeesData.map(employee => createEmployeeRecord(employee));
}

function createTimeInEvent(employee, timeStamp) {
  let [dt, hr ] = timeStamp.split(" ");
  employee.timeInEvents.push({
    type: "TimeIn",
    hour: Number.parseInt(hr, 10),
    date: dt
  });
  return employee;
}

function createTimeOutEvent(employee, timeStamp) {
  let [dt, hr ] = timeStamp.split(" ");
  employee.timeOutEvents.push({
    type: "TimeOut",
    hour: Number.parseInt(hr, 10),
    date: dt
  });
  return employee;
}

function hoursWorkedOnDate(employee, givenDate) {
  let inTime = employee.timeInEvents.find(it => it.date === givenDate);
  let outTime = employee.timeOutEvents.find(ot => ot.date === givenDate);
  return (outTime.hour - inTime.hour)/100;
}

function wagesEarnedOnDate(employee, givenDate) {
  return hoursWorkedOnDate(employee, givenDate) * employee.payPerHour;
}

function allWagesFor(employee) {
  let payableDates = employee.timeInEvents.map(tie => tie.date);
  let wages = payableDates.reduce((startAmt, givenDate) => startAmt + wagesEarnedOnDate(employee, givenDate), 0);
  return wages;
}





