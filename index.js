//'HTTP서버'의 기능은 http모듈, https모듈이 담당
var http=require('http');

//DB모듈을 불러오는 코드
//DB질의를 위한 모듈
var employeeService = require('./lib/employees');
//employeeService변수에는 lib.employees.js에 정의된 함수를 포함하는 객체가 할당된다.
//employeeService모듈!

//클라이언트로부터 요청을 받을 때마다 createServer()콜백을 수행
//'req인자'는 요청객체. http.ClientRequest객체. 클라이언트에 대한 정보와, 요청된 자원 정보를 담고있음
//'res인자'는 응답객체. http.ServerResponse객체. 응답과 관련된 정보와 함수를 담고있음
http.createServer(function(req,res){
    
    var _url; //인자를 파싱한 url
    
    req.method = req.method.toUpperCase(); //메서드 명을 소문자로 사용하는 클라이언트에 대비해서 대문자로 통일
    
    console.log(req.method+' '+req.url); //localhost:1337에클라이언트가 요청을 보내면 서버가 자신이 듣고 있음을 알려준다.
    //req.method로 GET을 출력하고, req.url로 / 또는 /aaa 를 서버콘솔에 출력함
    
    
    //만약 클라이언트가 GET요청이 아닌 요청을 시도한다면 적절히 응답해주자
    if(req.method !== 'GET'){
        
        //res.writeHead()함수를 호출하여, 응답코드501을 반환함
        //wrteHead(인자1, 인자2)
        //인자1 = 501이며, 클라이언트에 반환할 상태코드
        //인자2 = { ~ } 이며, 응답헤더로, 'Context=Type'을 일반 텍스트(text/plain)으로 설정함
        res.writeHead(501, {
            'Content-Type' : 'text/plain'
        });
        
        return res.end(req.method+' is not implemented by this server.');
    }
    
    
    //만약 클라이언트 요청이 GET이면 요청을 라우팅해야한다.
    if(_url = /^\/employees$/i.exec(req.url)){
        //요청이 '/employees'인지 확인하여,
        //직원 목록 반환
        
        res.writeHead(200); //응답코드 200번은 '정상'
        
        employeeService.getEmployees(function(error, data){//**콜백함수의 첫번째 인자로 오류객체(error)가 온다.(노드 관례상)
            if(error){
                //500 오류 전송    
            }
            //200코드와 데이터 전송
            
        });
        
        return res.end('employee list');
        
    }
    else if(_url = /^\/employees\/(\d+)$/i.exec(req.url)){
        //요청이 '/employees/숫자'인지 확인하여,
        //라우트에 포함된 id로 직원을 검색
        
        res.writeHead(200);
        
        employeeService.getEmployee(_url[1], function(error, data){//**콜백함수의 첫번째 인자로 오류객체(error)가 온다.(노드 관례상)
            if(error){
                //500 오류 전송
            }
            //200코드와 데이터 전송
        });
        
        return res.end('a single employee');
        
    }
    else{
        //위 두개의 조건과 일치하지 않으면 정적파일로 가정
        //정적 파일 전송
        res.writeHead(200);
        res.end('static file');
    }
            
    
}).listen(1337, '127.0.0.1');
//서버를 생성해서 port 1337번을 듣기(listen) 시작한다.

console.log('server running at http://127.0.0.1:1337/');