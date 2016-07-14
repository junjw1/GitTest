/*employees.js DB질의를 위한 모듈*/

//단순 DB모듈
var employeeDb = require('../database/employees');
//require는 특정파일과 특정경로를 받아들인다. json파일의 경로를 넘겨주고 있다.
//명시한 josn 파일을 'js컬렉션'형태로 메모리에 올려 다른 함수에서 참조할 수 있도록 함

//두 함수를 외부에 공개(export)한다.
exports.getEmployees = getEmployees;
exports.getEmployee = getEmployee;

//전체직원목록을 반환하는 함수, 인자로 callback, callback은 IO완료시 수행되는 함수이다.
function getEmployees(callback) {
    //setTimeout(인자1, 인자2)
    //인자1에 function~이, 인자2에 500이
    setTimeout(function () { //DB지연 흉내
        callback(null, employeeDb);
    }, 500);
}

//특정 직원의 정보를 반환하는 함수
//인자1로 employee id와, //인자2로 callback을 받는다. callback은 IO완료시 수행되는 함수이다.
function getEmployee(employeeId, callback) {//**콜백함수를 인자로 받을 땐, 반드시 마지막인자로 받는다(노드 관례상)
    
    //callback인자로 익명함수를 넘겨서 getEmployees함수를 호출함
    getEmployees(function(error, data){
        //error과 data를 인자로 익명함수를 실행함
       
        //실행된 익명함수는 error가 존재하면 callback함수를 수행하여 오류를 호출자에 전파함
        if(error){
            return callback(error);
        }
        
        //error가 없다면, data를 순회하며 ID가 employeeId와 일치하는 직원을 찾는다.
        var result = data.find(function(item){
           return item.id===employeeId; 
        });
        
        //db에서 찾은 employee객체와 함께 callback을 호출함
        callback(null, result);
        
    });
    
    
}
