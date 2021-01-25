const http = require('http');
const querystring = require('querystring');

const server = http.createServer((request1, response1) => {
  const method = request1.method;
  const url = request1.url;
  const path = url.split('?')[0];
  const query = querystring.parse(url.split('?')[1]);//JSON.parse() 方法用来解析JSON字符串


  //相应数据
  const responseData = {
    method,
    url,
    path,
    query
  }

  response1.setHeader('Content-Type', 'application/json'); //设置格式

  if (method === 'GET') {
    response1.end(
      
        JSON.stringify(responseData) //JSON.stringify() 方法将一个 JavaScript 对象或值转换JSON串
      
    )
  }

  if (method === 'POST') {
    let postData = '';
    request1.on('data', chunk => { //拼接箭头函数
      postData += chunk.toString();

    })
    request1.on('end', () => {
      responseData.postData = postData;
      response1.end( //回应
        JSON.stringify(responseData) //json 转换为字符串
      )
    })
  }

}

);

server.listen(9001, () => { //监听
  console.log('server is ready');
})