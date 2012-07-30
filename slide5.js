var num = 1;
var slides;

var mesDom = {
	classnameDo:function(way,node,class1,class2) {
		switch(way) {
			case 'replace':
				if(!mesDom.classnameDo('check',node,class1)) {
					node.className.replace(class2,class1);
				} else {
					node.className.replace(class1,class2);
				}
			break;
			case 'add':
				if(!mesDom.classnameDo('check',node,class1)) {
					node.className += node.className ? ' '+class1 : class1;
				}
			break;
			case 'remove':
				var rep = node.className.match(' '+class1) ? ' '+class1 : class1;
				node.className = node.className.replace(rep,'');
			break;
			case 'check':
				var result = false;
				var tmp = node.className.split(' ');
				for (var i = 0; i < tmp.length; i++) {
					if(tmp[i] == class1) {
						result = true;
					}
				}
				return result;
			break;
		}
	}
}

window.onload = function() {
	slides = document.querySelectorAll('.slide');
	onhashchange();
	freshSlide();
}

window.onkeydown = function(e) {
	if(e.keyCode == 37 || e.keyCode == 38) {
		e.preventDefault();
		back();
	}
	if(e.keyCode == 39 || e.keyCode == 40) {
		e.preventDefault();
		forward();
	}
}

window.onhashchange = function(e) {
	var newNum = ~~window.location.hash.split("#")[1];
	if(!newNum) {
		newNum = 1;
	}
	if(newNum == num) {
		return;
	}
	num = newNum;
	freshSlide();
}

function freshSlide() {
	for (var i = 0; i < slides.length; i++) {
		mesDom.classnameDo('remove',slides[i],'pre');
		mesDom.classnameDo('remove',slides[i],'current');
		mesDom.classnameDo('remove',slides[i],'next');
	};
	var current = document.querySelector('.slide:nth-of-type('+ num +')');
	var next = document.querySelector('.slide:nth-of-type('+ (num+1) +')')
	var pre = document.querySelector('.slide:nth-of-type('+ (num-1) +')')
	mesDom.classnameDo('add',current,'current');
	if(next) {
		mesDom.classnameDo('add',next,'next');
	}
	if(pre) {
		mesDom.classnameDo('add',pre,'pre');
	}
	
	window.location.hash = num;
}

function back() {
	if(num == 1) {
		var alertbox = document.querySelector('.alert-first');
		mesDom.classnameDo('add',alertbox,'alert-show');
		setTimeout(function(){mesDom.classnameDo('remove',alertbox,'alert-show');},1100);
		return;
	}
	num--;
	freshSlide();
}

function forward() {
	var current = document.querySelector('.current');
	var frameList = current.querySelector('.to-show');
	if(frameList) {
		var firstFrameListItem = current.querySelector('.to-show');
		mesDom.classnameDo('remove',firstFrameListItem,'to-show');
	} else {
		if(num >= slides.length) {
			var alertbox = document.querySelector('.alert-last');
			mesDom.classnameDo('add',alertbox,'alert-show');
			setTimeout(function(){mesDom.classnameDo('remove',alertbox,'alert-show');},1100);
			return;
		}
		num++;
		freshSlide();
	}
}