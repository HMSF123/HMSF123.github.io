function check_ins(List)//用于检测是否有新的控制性文本出现并做出相应反应
{
	for(var i=0;i<List.length;i++)
	{
		if(List[i].className=="name hide"||List[i].className=="name")//调整角色名称栏
		{
			if(List[i].innerText=="none\n") document.getElementById("namebox").style.display="none";
			else document.getElementById("namebox").style.display="initial";
			document.getElementById("namebox").innerText=List[i].innerText;
		}
		if(List[i].className=="charaAdd hide"||List[i].className=="charaAdd")//增加角色图片
		{
			var temp=document.createElement("img");
			temp.setAttribute("src",List[i].innerText.slice(0,-1)+".png");
			temp.setAttribute("class","chara");
			document.getElementById("character").appendChild(temp);
		}
		if(List[i].className=="charaDel hide"||List[i].className=="charaDel")//移除角色图片
		{
			var temp=document.querySelector("img[src='"+List[i].innerText.slice(0,-1)+".png']");
			document.getElementById("character").removeChild(temp);
		}
		if(List[i].className=="bkgnd hide"||List[i].className=="bkgnd")
		{
			
		}
	}
}
function roll_down()//自动滚动
{
	var temp=document.getElementById("story");
	console.log("st");
	setTimeout(function()
	{
		var intv=setInterval(function()
		{
			if(temp.clientHeight+temp.scrollTop>=temp.scrollHeight-3)
			{
				console.log("Bottom");
				clearInterval(intv);
			}
			else{temp.scrollTop+=2.5;}
		},10);
	},800);
	console.log("en");
	
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
	document.getElementById("story").style.height="25%";
    List=[];
    for(let mutation of mutationsList) {
        for (var i = 0; i < mutation.addedNodes.length; i++)
        List.push(mutation.addedNodes[i]);
    }
	roll_down();
    check_ins(List);
	console.log("!!!");
};
var observer = new MutationObserver(callback);// 创建一个观察器实例并传入回调函数
observer.observe(targetNode, config);// 以上述配置开始观察目标节点