const http = require('http');

const requesListen = (req, res) =>{
    console.log('req: ', req);
    console.log('res: ', res);
    res.end('hello world');
}

const sever = http.createServer(requesListen);
const port = 3000;

sever.listen(port, (err)=>{
    if(err){
        console.log('Sever is error: ', err);
    }else{
        console.log('Sever is running in port: ', port );
    }
});