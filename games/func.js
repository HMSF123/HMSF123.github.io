/*
     ||=====||
     ||警告！||
     ||=====||

	 作者的代码水平太烂了，出于为您健康安全的考虑，请不要查看这份代码！
	 代码内容包括但不限于：
	 -意义不明的变量与函数命名
	 -低效的暴力遍历
	 -随意拼凑的函数
*/

var _NAME_BOX=document.getElementById("namebox");
function check_ins(List)//用于检测是否有新的控制性文本出现并做出相应反应
{
	for(var i=0;i<List.length;i++)
	{
		if(List[i].classList.contains("name"))//调整角色名称栏
		{
			_NAME_BOX.innerText=List[i].innerText;
			// 记得把这里改成通过添加hide类来实现
			if(List[i].innerText=="none\n")
			{
				if(window.innerWidth <= 820) _NAME_BOX.style.color="transparent";
				else _NAME_BOX.style.display="none";
			}
			else{_NAME_BOX.style.display="initial";_NAME_BOX.style.color="rgb(175, 175, 175)";}
		}
		if(List[i].classList.contains("chadd"))//增加角色图片
		{
			if(document.querySelector("img[src='"+List[i].innerText.slice(0,-1)+".png']"))
				{continue;}
			var temp=document.createElement("img");
			temp.setAttribute("src",List[i].innerText.slice(0,-1)+".png");
			temp.setAttribute("class","chara");
			document.getElementById("character").appendChild(temp);
		}
		if(List[i].classList.contains("chdel"))//移除角色图片
		{
			if(document.querySelector("img[src='"+List[i].innerText.slice(0,-7)+".png']")==null)
				{continue;}
			var temp=document.querySelector("img[src='"+List[i].innerText.slice(0,-7)+".png']");
			setTimeout(function(){
				temp.classList.add("hide");
				setTimeout(function(){
					document.getElementById("character").removeChild(temp);
				},500);
			},List[i].innerText.slice(-7,-1));
		}
		if(List[i].classList.contains("loc"))
		{
			document.getElementById("location").style="background-image: url("+List[i].innerText.slice(0,-1)+".png);";
		}
		if(List[i].classList.contains("choice")&&List[i].innerText=="next")
		{
			// console.log("succ");
			List[i].style.padding="0px";
			List[i].classList.add("nxt");
			List[i].firstChild.innerHTML="<img src='next.png' style='height: 100%;'>"
		}
	}
}
function roll_down()//自动滚动
{
	var temp=document.getElementById("story");
	temp.scrollTop=0;
	setTimeout(function()
	{
		var intv=setInterval(function()
		{
			if(temp.clientHeight+temp.scrollTop>=temp.scrollHeight-3)
			{
				// console.log("Bottom");
				clearInterval(intv);
			}
			else{temp.scrollTop+=2.5;}
		},10);
	},800);
}
function save_PaN()
{
	window.localStorage.setItem("name",_NAME_BOX.innerHTML);
	window.localStorage.setItem("chara",document.getElementById("character").innerHTML);
	window.localStorage.setItem("loc",document.getElementById("location").style.backgroundImage);
	// console.log("save_PaN");
}
function load_PaN()
{
	var temp=window.localStorage.getItem("name");
	_NAME_BOX.innerHTML=temp;
	document.getElementById("character").innerHTML=window.localStorage.getItem("chara");
	document.getElementById("location").style.backgroundImage=window.localStorage.getItem("loc");
	if(temp=="none\n") _NAME_BOX.style.display="none";
	else _NAME_BOX.style.display="initial";
	// console.log("load_PaN");
}
function clear_PaN()
{
	_NAME_BOX.innerHTML="";
	document.getElementById("character").innerHTML="";
	document.getElementById("location").style.backgroundImage="";
	// console.log("clear_PaN");
}
var List=[];
var targetNode = document.querySelector("#story");
// 观察器的配置（需要观察什么变动）
var config = {
    attributes: false, // 不用监听属性
    childList: true, // 监听子节点
    subtree: false // 不用监听子节点下面的所有节点
};
var callback = function(mutationsList) {
	if(window.innerWidth<=580 && window.innerHeight>=400)
		document.getElementById("story").style.height="calc(60% - 45px)";
	else document.getElementById("story").style.height="30%";
    List=[];
    for(let mutation of mutationsList) {
        for (var i = 0; i < mutation.addedNodes.length; i++)
        List.push(mutation.addedNodes[i]);
    }
	roll_down();
    check_ins(List);
	// console.log("!!!");
};

var observer = new MutationObserver(callback);// 创建一个观察器实例并传入回调函数
observer.observe(targetNode, config);// 以上述配置开始观察目标节点
document.addEventListener("keydown",function(event){
	if(document.getElementsByClassName("nxt").length==0) return;
	var key= event.which || event.keyCode;
	var button=document.querySelector("img[src='next.png']");
	var ifdark=document.body.classList.contains("dark");
	if(key==13||key==32)
	{
		if(ifdark){button.style.backgroundColor="rgba(255, 255, 255, 0.39)";}
		else{button.style.backgroundColor="rgba(0, 0, 0, 0.5)";}
	}
});


document.addEventListener("keyup",function(event){
	if(document.getElementsByClassName("nxt").length==0) return;
	var key= event.which || event.keyCode;
	var button=document.querySelector("img[src='next.png']");
	if(key==13||key==32)
	{
		button.style.backgroundColor="rgba(0, 0, 0, 0.1)";
		document.querySelector("p.nxt a").click();
	}
});
function set_height()
{
	let vh=window.innerHeight*0.01;
	document.documentElement.style.setProperty('--vh', `${vh}px`);
}
window.onload=function(){
	set_height();
	window.scrollTo(0,20);
};
window.onresize=function(){
	set_height();
	if(window.innerWidth<=580 && window.innerHeight>=400)
		document.getElementById("story").style.height="calc(60% - 45px)";
	else document.getElementById("story").style.height="30%";
};
