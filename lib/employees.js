//단순 DB모듈
var employeeDb = require('../database/employees');
//require는 특정파일과 특정경로를 받아들인다. json파일의 경로를 넘겨주고 있다.

//두 함수를 외부에 공개(export)한다.
exports.getEmployees = getEmployees;
exports.getEmployee = getEmployee;

//전체직원목록을 반환하는 함수, 인자로 callback, callback은 IO완료시 수행되는 함수이다.
function getEmployees(callback) {
    //setTimeout(인자1, 인자2)
    //인자1에 function~이, 인자2에 500이
    setTimeout(function () {
        callback(null, employeeDb);
    }, 500);
}

//특정 직원의 정보를 반환하는 함수, 인자로 callback, callback은 IO완료시 수행되는 함수이다.
function getEmployee(employeeId, callback) {
    getEmployees(function(error, data){
       
        if(error){
            return callback(error);
        }
        
        var result = data.find(function(item){
           return item.id===employeeId; 
        });
        
        callback(null, result);
        
    });
    
}