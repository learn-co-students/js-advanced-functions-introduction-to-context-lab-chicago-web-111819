// Your code here
class TimeIn {
    constructor(date, hour) {
        this.date = date;
        this.hour = parseInt(hour);
        this.type = 'TimeIn';
    };
};

class TimeOut {
    constructor(date, hour) {
        this.date = date;
        this.hour = parseInt(hour);
        this.type = 'TimeOut';
    };
};

function createEmployeeRecord(empArr) {
    return {
        firstName: empArr[0],
        familyName: empArr[1],
        title: empArr[2],
        payPerHour: empArr[3],
        timeInEvents: [],
        timeOutEvents: []
    };
};

function createEmployeeRecords(empsArr) {
    return empsArr.map(createEmployeeRecord);
};

function createTimeInEvent(empObj, dateTimeStr) {
    const dateTimeArr = dateTimeStr.split(" ");
    const newTimeInEvent = new TimeIn(dateTimeArr[0],dateTimeArr[1]);
    empObj.timeInEvents.push(newTimeInEvent);
    return empObj;
};

function createTimeOutEvent(empObj, dateTimeStr) {
    const dateTimeArr = dateTimeStr.split(" ");
    const newTimeOutEvent = new TimeOut(dateTimeArr[0],dateTimeArr[1]);
    empObj.timeOutEvents.push(newTimeOutEvent);
    return empObj;
};

function hoursWorkedOnDate(empObj,date) {
    const tIn = empObj.timeInEvents.find( tIE => tIE.date === date);
    const tOut = empObj.timeOutEvents.find( tOE => tOE.date === date);
    return tOut.hour/100 - tIn.hour/100
};

function wagesEarnedOnDate(empObj,date) {
    return empObj.payPerHour * hoursWorkedOnDate(empObj,date);
};

function allWagesFor(empObj) {
    let totalWages = 0;
    for (let i = 0; i < empObj.timeInEvents.length; i++) {
        totalWages = totalWages + wagesEarnedOnDate(empObj,empObj.timeInEvents[i].date);
    };
    return totalWages;
};

function calculatePayroll(empObjs) {
    let payroll = 0;
    empObjs.forEach(e => payroll = payroll + allWagesFor(e));
    return payroll;
};

function findEmployeeByFirstName(empObjs,name) {
    return empObjs.find(e => e.firstName === name);
}