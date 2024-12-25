var http = require('http') //http is core module.

http.createServer((req,res)=>{
    res.end("ch1>Hello Node Server 123</h1>")
}).listen(4000)

console.log("Server is Started on http://127.0.0.1:4000")
