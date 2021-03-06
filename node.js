日期：2021 / 8 / 19


node.js就是运行在服务端的js。
一个事件驱动I / O服务端的js环境， 基于google的V8引擎。 执行js的速度快， 性能好。

创建第一个node.js应用：
组成部分：
1. 引入required模块： 可以使用require指令来载入node.js模块。
如：
var http = require('http')
2. 创建服务器： 服务器可以监听客户端的请求， 类似于apache、 nginx等HTTP服务器
3. 接受请求并响应请求。 服务器很容易创建， 客户端可以使用浏览器或终端发送HTTP请求， 服务器接受请求后返回响应数据
如： http.createServer(function (request, response) {
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
		{ name: 'liuliu', age: 24 }
	]
	res.end(JSON.stringify(person))只能饭返回字符串或者二进制数据，不能传入数字、布尔值、需要调用JSON.stringify()

}).listen(8888) 绑定端口

执行该服务器：node XXX.js

分析node.js的HTTP服务器：
第一行引入http模块（require），并且将其赋值给http变量
接下来调用http模块的函数createServer，这个函数会返回一个对象，这个对象有一个listen的方法，这个方法有一个数值参数，指定这个服务器监听的端口号。

npm现今的nodejs新版，已经集成了npm，安装好node，npm也安装好啦

全局安装 npm i express - getApp

npm list - g查看所有的全局安装的模块
npm list grunt 查看grunt的版本号
npm update 更新包
npm ls 查看包列表

npm init 初始化package.json文件 创建模块
npm adduser 注册用户
npm publish 发布模块

配置淘宝镜像
npm i - g cnpm--registry = https://registry.npm.taobao.org

node.js交互式解释器REPL
node自带交互式解释器，可以执行一下任务：
读取 - 读取用户输入，解析输入的js数据结构并存储在内存中
执行：执行输入的数据结构
打印：输出结果
循环：ctrl + c两次退出REPL
node执行终端

变量声明要使用var，否则会直接打印出来
	> x=10
10
	>var y = 10
undefined
	> x + y
20

日期：2021 / 8 / 20


node.js回调函数
node.js的异步编程的直接体现就是回调函数。
异步编程依托于回调来实现，node使用了大量的回调函数，node所有的api都支持回调函数
如：function foo1（name，age，cllback）{ } 回调函数一般作为函数的最后一个参数出现

阻塞代码：
var fs = require('fs')
var data = fs.readFileSync('input.txt')
console.log(data.toString())
console.log('读取成功！！！')
运行结果：
XXXXX  文件内容
读取成功！！！

非阻塞代码：
var fs = require('fs')
fs.readFile('input.txt', function (err, data) {
	if (err) return console.error(err)
	console.log(data.toString())
})
console.log('读取成功！！！')
运行结果：
读取成功!!!
XXXXXX 文件内容

提高了程序的性能。
阻塞是按顺序进行的，非阻塞是不需要按顺序的。

node.js事件循环
node.js是单进程单线程应用程序，但是v8引擎提供的一部执行回调函数接口，通过这些接口可以处理大量的并发，所以性能非常高
基本上所有的事件机制都是用设计模式中观察者模式实现。
node.js单线程类似进入一个while(true)的事件循环，直到没有事件观察者退出，每个异步事件都生成一个事件观察者，如果有事件发生就调用该回调函数

事件驱动程序
node.js使用事件驱动模型，当web server接受到请求，就把它关闭后进行处理，然后去服务下一个web请求。
当这个请求完成，它被放回处理队列，当到达队列开头，这个结果被返回给用户。

该模型为非阻塞io或者事件驱动io，高校可扩展性非常强，因为webserver一直接受请求而不等待任何读写操作。

eventEmitters——> events-- > event loop-- > event Handlers
生成一个主循环来监听事件，当检测到事件时触发回调函数。

引入events模块，并通过实例化eventEmitter类来绑定和监听事件，
如：
引入模块
var events = require('events')
创建eventEmitter对象
var eventEmitter = new events.EventEmitter()

以下程序绑定事件处理程序
eventEmitter.on('eventName', eventHandler)

我们可以通过程序出发事件
eventEmitter.emit('eventName')

node.js所有的异步i / o操作在完成时都会发送一个事件到事件队列。
node.js里面的许多对象都会分发事件：
如：
一个fs.readStream对象会在文件被打开的时候触发一个事件。
所有这些产生事件的对象都是events.EventEmitter的实例。

eventEmitter类
events模块只提供了一个对象：events.EventEmitter。
eventEmitter的核心就是事件触发(emit)与事件监听(on)器功能的封装。

同样通过require('events')来进行对该模块的访问
new events.EventEmitter() 创建EventEmitter对象

EventEmitter对象如果在实例化时发生错误，会触发error事件。
当添加新的监听器时，newListener事件会触发，
当监听器被移除时，removeListener事件被触发。

如:
var events = require('events')
var eventEmitter = new events.EventEmitter()
eventEmitter.on('name', function () {
	console.log('打印出你的名字')
})
setTimeout(function () {
	eventEmitter.emit('name')
}, 1000)

运行结果：
1秒后控制台输出啦'打印出你的名字'。
原理：
eventEmitter对象注册了一个name监听器，通过定时，在1秒后像eventEmitter对象发送name，此时会调用name的监听器

eventEmitter的方法：
addListener(event, listener)
为指定事件添加一个监听器到监听器数组的尾部。
on(event, listener)
注册一个监听器
once(event, listener)
注册一次性监听器
removeListener(event, listener)
移除监听器
removeAllListeners([event])
移除所有事件的所有监听器
emit(event, [arg1], [arg2])
按监听器的顺序执行每个监听器

js语言自身只有字符串数据类型，没有二进制数据类型
但在处理TCP流或文件流时，必须使用到二进制数据。
因此node.js专门定义了一个buffer类，该类用来创建一个专门存放二进制数据的缓冲区。



//2021/8/25
vue实现对div的拖拽
首先设置div样式
	.charts {
	position: absolute;
	right: 10px;
	top: 200px;
	width: 800px;
	z - index: 999;

}
其次在html中引入样式
	< div class="charts" >
		<div class="chart-container" v-show="hdm">
			<div @</div>
		<div class="chart-body">
			<div id="hdmChart" style="width: 600px;height:400px" v-show="hdm" ref="hdm"></div>
		</div>
      </div >
    </div >
	编写js代码
var draggableElems = document.querySelectorAll(".panel-group");
// array of Draggabillies
var draggies = [];
// init Draggabillies
for (var i = 0; i < draggableElems.length; i++) {
	var draggableElem = draggableElems[i];
	var draggie = new Draggabilly(draggableElem, {
		containment: ".container"
	});
	draggies.push(draggie);
}


//折现图结合echarts
import * as echarts from 'echarts' //引入echarts，当然全局需要npm安装echarts模块
//<div id="hdmChart" style="width: 600px;height:400px" v-show="hdm" ref="hdm"></div>
// 获取表出现的div的id，注意给表设置固定的宽高px单位，不要用%
var chartDom = document.getElementById("hdmChart");
var myChart = echarts.init(chartDom);//初始化
var option = {
	title: { //出现在图标头部
		text: "横断面分析",
		left: "center",
		textStyle: {
			color: "#fff"
		}
	},
	tooltip: { //鼠标划到点上显示的内容
		// trigger: 'axis',
		// axisPointer: {
		//     type: 'shadow'
		// },
		// position: { top: 0 },
		//自定义显示的内容
		formatter: function () {
			let str = '';
			// pipeType管道类型
			console.log(arguments)
			var pipe;
			for (var i = 0; i < data.length; i++) {
				console.log(data[i].pipeType)
				if (arguments[0].value == data[i].deep) {
					console.log(data[i].pipeType)
					pipe = data[i].pipeType
				}
			}
			console.log(pipe)
			str = `管线类型：` + `${pipe}` + `<br>` + `距起点距离：` + `${arguments[0].name}` + `m` + `<br>` + `管道埋深：` + `${arguments[0].value}` + `m`

			return str
		}
	},
	// 图表距离外部div的四边间距
	grid: {
		left: '3%',
		right: '20%',
		bottom: '3%',
		containLabel: true
	},
	xAxis: [
		{
			type: 'category',
			data: xAxisData,
			axisTick: {
				alignWithLabel: true
			},
			nameTextStyle: {
				color: '#fff'
			},
			axisLabel: {
				rotate: -45
			},
			name: '距起点距离(单位:m)'
		}
	],
	yAxis: [
		{
			type: 'value',
			nameTextStyle: {
				color: '#fff'
			},
			name: '管线埋深(单位:m)'
		}
	],
	series: [
		{
			name: '管线埋深',
			type: 'line', //折线图，，，绘制柱状图要改为bar
			barWidth: '20%',
			data: yAxisData,
			symbolSize: 15,
			// symbol:'circle',
			// showBackground: true, //是否带有背景颜色
        	// backgroundStyle: {
            //     color: 'rgba(180, 180, 180, 0.2)'
        	// }
			itemStyle: {
				normal: {
					// borderColor:'red',  // 拐点边框颜色
					lineStyle: {
						width: 5,  // 设置线宽
						type: 'solid'  //'dotted'虚线 'solid'实线
					}
				}
			}
		}
	],
}
option && myChart.setOption(option);

//2021/8/26
使用vue结合element中的表格table对数据进行绑定
使用template中的slot-scope属性进行scope绑定，然后可以直接使用scope.row.city获取到此时的数据值
	< el - table : data = "tableData" v - loading="loading" border >
		<el-table-column label="ID" prop="id">
			<!-- <span v-for="item in tableData" : {{ item.id }}</span> -->
        </el - table - column >
	<el-table-column label="养老院名称" prop="name"></el-table-column>
	<el-table-column label="省" prop="province">
		<span>河北省</span>
		{/* <!-- <span
			v-for="item in provinceData"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
            <span v-if="item.value == province">{{ item.label }}</span>
          </span>--> */}
    </el-table-column >
	<el-table-column label="市" prop="city">
		<template slot-scope="scope">
			<span
				v-for="item in cityData"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
              <span v-if="item.value == scope.row.city">{{ item.label }}</span>
            </span>
          </template>
    </el-table-column>
	<el-table-column label="区县" prop="county">
		<template slot-scope="scope">
			<span
				v-for="(item,index) in cityData"
              :key="index"
              :label="item.label"
              :value="item.value"
            >
              <span v-if="item.value == scope.row.city">
				<span
					v-for="item in cityData[index].children"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                  <span v-if="item.value == scope.row.county">{{ item.label }}</span>
			</span>
              </span>
            </span>
          </template >
          {/* < !-- < template slot - scope="scope" > */}
	{/* <span
		v-for="item in countyData"
              : key="item.value"
              : label="item.label"
              : value="item.value"
	>
		<span v-if="item.value == scope.row.county">{{ item.label }}</span>
	</span>
          </template > --> */}
    </el-table-column >
	<el-table-column label="操作" width="210">
		<template slot-scope="scope">
			{/* <!-- <el-button @click="openView(scope.row)" plain type="warning">查看</el-button> --> */}
            <el-dialog :visible.sync="visibleHouse" title="养老院更新" width="734px">
              <el-form :model="house" label-width="100px">
                <el-form-item label="养老院名称">
			<el-input v-model="house.name" placeholder="养老院名称"></el-input>
		</el-form-item>
		<el-form-item label="省">
			<el-select
				disabled
				v-model="house.province"
                    @change="provinceChange"
                    placeholder="河北省"
                    clearable
                  >
                    <el-option
				v-for="item in provinceData1"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
            </el-form-item >
	<el-form-item label="市">
		<el-select v-model="house.city" @change="cityChange1" placeholder="市" clearable>
                    <el-option
			v-for="item in cityData1"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select >
                </el-form-item >
	<el-form-item label="区/县" @paste.native.capture.prevent="handlePaste" >
		<el-select @change="countyChange" v - model="house.county" placeholder = "区县" clearable >
			<el-option
				v-for="item in countyData1"
                      : key="item.value"
                      : label="item.label"
                      : value="item.value"
			></el-option>
                  </el-select >
                </el-form-item >
              </el-form >

	<span slot="footer" class="dialog-footer">
		<el-button @click="visibleHouse = false">取 消</el-button>
	<el-button type="primary" @click="houseUpdate" > 确 定</el-button >
              </span >
            </el-dialog >
	<el-button plain type="primary" @click="openUpdate(scope.row)" > 修改</el-button >
		<el-button plain type="danger" @click="handleDelete(scope.row)" > 删除</el-button >
          </template >
        </el-table-column >
      </el-table >


{/* 2021/8/31 */}

server-sent-events sse事件推送
(单向通信)服务器向客户端推送消息(WebSocket全双工通信，服务端客户端双向通信)

服务端会不断的发送数据流过来，相当于完成一次长时间的下载 

sse基于http协议，目前除了IE，其他浏览器都适用

sse与websocket作用相似，都是建立浏览器与服务器之间的通信渠道，然后服务器向浏览器推送信息。

sse与websocket的区别：
sse使用HTTP协议，现有的服务器软件都支持。websocket是一个独立协议
sse属于轻量级，使用简单；websocket协议相对复杂
sse默认支持断线重连，websocket需要自己实现
sse一般只用来传送文本，二进制数据需要编码后传送，websocket默认支持传送二进制数据
sse支持自定义发送的消息类型

