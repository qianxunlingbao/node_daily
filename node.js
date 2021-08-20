node.js就是运行在服务端的js。
一个事件驱动I / O服务端的js环境， 基于google的V8引擎。 执行js的速度快， 性能好。

创建第一个node.js应用：
组成部分：
1. 引入required模块： 可以使用require指令来载入node.js模块。
如：
var http = require('http')
2. 创建服务器： 服务器可以监听客户端的请求， 类似于apache、 nginx等HTTP服务器
3. 接受请求并响应请求。 服务器很容易创建， 客户端可以使用浏览器或终端发送HTTP请求， 服务器接受请求后返回响应数据
如： http.createServer(function(request, response) {
	设置请求头
	response.writeHead(200, {
		'content-type': 'text/plain'
	})
	// req.write()在页面上返回数据
	res.write('login')
	// 返回数据后使用end，不然不能返回数据
	发送响应数据
	response.end('hello world') 此处使用send也行，但是send在一个请求中只能出现一次，多次会报错
	
	var person = [
		{name:'liuliu',age:24}
	]
	res.end(JSON.stringify(person))只能饭返回字符串或者二进制数据，不能传入数字、布尔值、需要调用JSON.stringify()

}).listen(8888) 绑定端口

执行该服务器：node XXX.js

分析node.js的HTTP服务器：
	第一行引入http模块（require），并且将其赋值给http变量
	接下来调用http模块的函数createServer，这个函数会返回一个对象，这个对象有一个listen的方法，这个方法有一个数值参数，指定这个服务器监听的端口号。

npm现今的nodejs新版，已经集成了npm，安装好node，npm也安装好啦

全局安装 npm i express -getApp

npm list -g查看所有的全局安装的模块
npm list grunt 查看grunt的版本号
npm update 更新包
npm ls 查看包列表

npm init 初始化package.json文件 创建模块
npm adduser 注册用户
npm publish 发布模块

配置淘宝镜像
npm i -g cnpm --registry=https://registry.npm.taobao.org

node.js交互式解释器REPL
	node自带交互式解释器，可以执行一下任务：
	读取-读取用户输入，解析输入的js数据结构并存储在内存中
	执行：执行输入的数据结构
	打印：输出结果
	循环：ctrl+c两次退出REPL
node执行终端

变量声明要使用var，否则会直接打印出来
>x=10
10
>var y = 10
undefined
>x+y
20



