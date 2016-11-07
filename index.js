/**
 * 感想：
 * (1). 过度依赖jquery等库($, on，很多原生的API不认识，DOM操作封装)
 * (2). 使用模板、reset.css, 正则表达式
 * (3). 上下左右居中 
 * (4). 浏览器兼容、设备兼容(响应式)
 * (5). 性能上优化 (http://web.jobbole.com/82551/)
 * (6). 两个数据源对应一个模板
 **/

(function(global, document) {

	var PDF_PATH = 'download/ebook/2015_con/';
	var lecturerAbout = [];
	var schedule = [];

	/**
	 * @讲师简介(需要修改简介文案直接在下面修改即可)
	 * name：名字
	 * job：职务
	 * brief：简介
	 *
	 * 暴露出数据为了兼容移动端
	 */
	global.__LECTURER_ABOUT__ = lecturerAbout = [{
		class: 'kaitao',
		name: '张开涛',
		job: '京东服务端架构师',
		brief: '2014年加入京东,主要负责商品详情页、详情页统服务架构与开发，设计并开发了多个亿级访问量系统。\
		工作之余喜欢写技术博客,有《跟我学Spring》、《跟我学Spring MVC》、《跟我学Shiro》、《跟我学Nginx+Lua开发》\
		等系列教程,目前博客访问量有460万+'
	}, {
		class: 'zhangshuai',
		name: '张帅',
		job: 'working in Adobe',
		brief: ' He got master degree from University of California Irvine (UCI), majoring in networked \
		systems, and bachelor degree from Beijing University of Posts and Telecommunications (BUPT).\
		After graduation from UCI this spring of 2015, he joined Adobe to start career where he \
		got the chance to experience with Nginx and AWS stuff.'
	}, {
		class: 'aapo',
		name: 'Aapo Talvensaari',
		job: 'IT Manager, Aalto Capital, Finland',
		brief: 'Aapo Talvensaari has over twenty years of experiencein consulting, software development, and systemadministration.\
		These days his main areas of interest include web and cloud technologies.\
		He is an active community member of OpenResty project, and an author of several OpenResty components.\
		In his spare time he enjoys to spend his time at cottage, and be close to nature'
	}, {
		class: 'chun',
		name: '章亦春',
		job: 'OpenResty 开源项目创建者',
		brief: '喜欢不务正业，Nginx 与 Systemtap 贡献者。以写程序为主，喜欢摆弄各种 UNIX风格的工具，\
		以及不同的编程语，例如 C/C++、Lua、Perl、Python、Haskell 等等'
	}, {
		class: 'dejiang',
		name: '朱德江',
		job: '广州酷狗ngx_lua实践者',
		brief: '五年前非常有幸在淘宝量子统计实习，能有机会近距离感受春哥和openresty的魅力。毕业后在北京一家创业公司，业余时间学习ngx_lua，应用openresty搞些兴趣项目。\
		两年前，来到了广州，将 openresty 应用于常规业务服务和核心基础服务。openresty社区尤其是春哥认真的回复，每次都让我收获许多；\
		我也能开始模仿着写些周边类库，resty-rsa，resty-kafka，希望能反馈社区，和大家一起玩得开心。'
	}, {
		class: 'weibin',
		name: '姚伟斌',
		job: '阿里云web平台组研发高级专家',
		brief: '现在正致力于通过阿里CDN让阿里云用户享受到稳定、快速、安全、低成本的内容分发服务。曾经就职于网易杭州研究院，开源软件开发\
		者与倡导者，开发多个知名Nginx模块，tengine核心开发人员，openresty的忠实用户。研究方向：高性能web服务器、cache服务器、网络加速、网络安全、大规模系统的运维自动化。'
	}, {
		class: 'zhangcong',
		name: '张聪',
		job: 'UPYUN系统开发工程师',
		brief: '目前主要负责 UPYUN CDN 相关的设计和开发工作，兼部分 UPYUN 分布式存储系统相关的运维工作；\
		在 NGINX C 模块和 OpenResty / ngx_lua 模块的开发和维护方面有一些经验积累，同时热衷于推动公司内部的测试及运维自动化。偶尔会关注 C, Lua, Python, Erlang 相关的编程语\
		言社区，同时对 Redis, NGINX 源代码研究工作非常感兴趣，崇尚简单实用的工程实践'
	}];

	/**
	 * @日程表
	 * time：时间点
	 * name: 名字
	 * doing：干嘛
	 */
	global.__SCHEDULE__ = schedule = [{
		time: "8:30",
		doing: '<span class="red">签到</span>'
	}, {
		time: "9:00",
		doing: "开场"
	}, {
		time: "9:15",
		name: "张聪",
		doing: "Using ngx_lua In UPYUN 2",
		pdf: 'zhangcong.pdf'
	}, {
		time: "10:10",
		name: "张帅",
		doing: "Be MicroService Hero",
		pdf: 'zhangshuai.pdf'
	}, {
		time: "11:05",
		name: "",
		doing: '<span class="blue">闪电演讲(速致)</span>',
		pdf: "suzhi.pdf"
	}, {
		time: "11:20",
		doing: '<span class="green">颁奖</span>'
	}, {
		time: "11:25",
		name: "Aapo Talvensaari",
		doing: "Developing OpenResty Framework",
		pdf: 'aapo.pdf'
	}, {
		time: "12:20",
		doing: '<span class="red">午餐</span>'
	}, {
		time: "13:30",
		name: "章亦春",
		doing: "浅谈OpenResty未来发展",
		pdf: "zhangyichun.pdf"
	}, {
		time: "14:30",
		name: "孙传文",
		doing: "Nginx+Lua模块在阿里的使用",
		pdf: "sunchuanwen.pdf"
	}, {
		time: "15:25",
		doing: '<span class="blue">闪电演讲</span>'
	}, {
		time: "15:45",
		doing: '<span class="blue">茶歇</span>'
	}, {
		time: "16:05",
		name: "朱德江",
		doing: "基于OpenResty的百万级长连接推送",
		pdf: "zhudejiang.pdf"
	}, {
		time: "17:00",
		name: "张开涛",
		doing: "Nginx+Lua在京东商品详情页的大规模应用",
		pdf: "zhangkaitao.pdf"
	}]

	var byClass = function(className) {
		return document.getElementsByClassName(className);
	};

	var byId = function(id) {
		return document.getElementById(id);
	};

	function renderSchedule() {
		var scheduleTmpl1 = byId('schedule-tmpl-1').innerHTML;
		var scheduleTmpl2 = byId('schedule-tmpl-2').innerHTML;
		var scheduleHtml = '';
		schedule.forEach(function(value, index) {
			if (index % 2 == 0) {
				scheduleHtml += '<li>';
				scheduleHtml += scheduleTmpl1.replace(/{(\w+)}/g, function($1, $2) {
					if ($2 == 'pdf' && value[$2]) {
						return '<a class="blue" download=' + value[$2] + ' href=' + PDF_PATH + value[$2] + '>演讲稿</a>'
					}
					return value[$2] ? value[$2] : '';
				});
			} else {
				scheduleHtml += scheduleTmpl2.replace(/{(\w+)}/g, function($1, $2) {
					if ($2 == 'pdf' && value[$2]) {
						return '<a class="blue" download=' + value[$2] + ' href=' + PDF_PATH + value[$2] + '>演讲稿</a>'
					}
					return value[$2] ? value[$2] : '';
				});
				scheduleHtml += '</li>';
			}
		});
		byId('schedule-list').innerHTML = scheduleHtml;
	}

	// 初始化页面触发click事件, 显示章亦春图片
	var initPage = function() {
		var aboutHtml = byId('about-tmpl').innerHTML;
		var event = new Event('click');

		event.INIT_PAGE = true;
		lecturerList.dispatchEvent(event);

		lecturerList.addEventListener('mouseover', function(e) {
			var target = e.target;
			if (target.classList.contains('gray')) {
				target.classList.remove('gray');
				target.addEventListener('mouseout', function addGray(e) {
					if (!this.classList.contains('largen')) {
						this.classList.add('gray');
						target.removeEventListener('mouseout', addGray);
					}
				}, false);
				// 停止事件冒泡
				e.stopPropagation();
			}
		}, false);

		// document.addEventListener("DOMContentLoaded", function(event) {
		// 需要重构
		renderSchedule()
			// });

	};

	var about = byId('about');
	var lecturerList = byClass('lecturer-list')[0];
	// 记录前一个被点击的头像
	var preClickedAvatar = null;
	var preClickedIndex = -1;

	// 使用事件委托，减少事件绑定
	lecturerList.addEventListener('click', function(e) {
		var target = e.target;
		var index = parseInt(target.getAttribute('data-index'));
		var aboutHtml = byId('about-tmpl').innerHTML;

		// 检测是否头像为140像素, 即是放大的图片
		if (target.classList.contains('avatar-140')) {
			return false;
		}

		// 初始化显示头像为章亦春
		if (e.INIT_PAGE) {
			target = target.children[3];
			index = 4;
			preClickedIndex = index;
		}

		if (index === 0) {
			return false;
		}

		// 使用简单的HTML模板
		aboutHtml = aboutHtml.replace(/{(\w+)}/g, function($1, $2) {
			return lecturerAbout[index - 1][$2];
		});

		if (preClickedAvatar && preClickedIndex != index) {
			// preClickedAvatar.firstElementChild.style.display = 'none';
			preClickedAvatar.classList.add('gray');
			preClickedAvatar.classList.remove('largen');
		}

		target.classList.remove('gray');
		target.classList.add('largen');
		// target.firstElementChild.style.display = 'inline-block';

		about.innerHTML = aboutHtml;
		preClickedAvatar = target;
		preClickedIndex = index;

	}, false);

	initPage();

	window.addEventListener('resize', function() {
		if (window.matchMedia('(min-width: 421px)').matches) {
			initPage();
		}
	})
})(this, document)