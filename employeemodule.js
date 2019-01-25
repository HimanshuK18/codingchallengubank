
const Employee = require('./empClass.js');
exports.employeeLeaves = function (filename) {
  const fs = require('fs');
  var DataLeave = [];
  //file stream read is not recommended  even though it's performance is good for big files, 
  //as a file stream reads data in chunks of 64 Kb and where each chuck ends or starts data is very hard to guess.
  //for this requirement we need to read data one row at a time.
  fs.readFile(filename, 'utf8', function(err, leavesData) {
    if (err) throw err;
    //create a array where each row of data is a array element
    var employeeLeaves = leavesData.split("\r\n");
    //sort the array
    employeeLeaves.sort();
    //now read the array and calcullate the leaves of each enployee
    var emp1 = new Employee(employeeLeaves[0].replace(/\d+/g,''), 1);
    DataLeave.push(emp1);
    for (let i=1;i<= employeeLeaves.length -1; i++)
    {
      if (DataLeave[DataLeave.length -1].name == employeeLeaves[i].replace(/\d+/g,''))
      {
        DataLeave[DataLeave.length -1].total = DataLeave[DataLeave.length -1].total + 1;
      } 
      else
      { 
        var emp = new Employee(employeeLeaves[i].replace(/\d+/g,''), 1);
        DataLeave.push(emp);
      }
    }
    return DataLeave;
  });
}