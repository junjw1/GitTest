/*클라이언트에 응답을 전송하는 모듈*/

//200, 404, 500, 파일응답 4가지 형태의 응답을 위한 4개의 함수 export

var fs = require('fs');

exports.send404 = function(response){//요 response인자는 index.js에서 res로 될 것이다.
    console.error("resource not found");
    
    response.writeHead(404,{
        'Content-Type': 'text/plain' //(1)응답페이로드에 따라 적절한 'Content-Type헤더'를 설정하고
    });
    
    response.end('not found'); //(2)end()호출하여 페이로드를 쓰고 응답을 종료한다.
    
}
exports.sendJson = function(data, response){
    
    response.writeHead(200,{
        'Content-Type': 'application/json'
    });
    response.end(JSON.stringify(data));
    
}
exports.send500 = function(data, response){
    console.error(data.red);
    
    response.writeHead(500, {
        'Content-Type': 'text/pain'
    });
    
    response.end(data);
    
}
exports.staticFile = function(staticPath){ //staticPath인자는 파일시스템에 모든정적내용이 존재하는 파일인 '마운트지점'
    
    return function(data, response){ //staticFile()함수가 잔환하는 함수
        var readStream;
        
        //route를 수정하여 /home과 /home.html을 모두 동작하도록 한다.
        data = data.replace(/^(\/home)(.html)?$/i, '$1.html');
        data = '.' + staticPath + data;
        
        //path가 가리키는 파일의 정보를 읽어옴. 
        fs.stat(data, function(error, stats){
            
            //파일이 존재x거나 dir이라면 send404()함수 호출(재사용!!)
            if(error || stats.isDirectory()){
                
                return exports.send404(response);
            }
            
            //파일이 존재하면 그 파일의 '읽기 스트림'을 생성하고, 파이프로 response객체에 연결한다.
            //**response객체 - http.ServerResponse 객체는 '쓰기가능 스트림 인터페이스'를 구현한다.
            //그래서 추가코드없이 스트림과 response를 직접 연결할수있다.
            readStream = fs.createReadStream(data);            
            return readStream.pipe(response);
            
        });
    }
    
}