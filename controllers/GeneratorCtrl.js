App.controller('GeneratorCtrl', ['$scope', '$mdSidenav', function($scope){

	var actionLeft1 = true,
		actionRight1 = false,
	 	ulitka = [
			[0,0,0,0,0,0,0,1,1,1,1,0,0,0,0],
			[0,0,0,0,0,0,1,1,1,1,1,1,0,0,0],
			[1,0,1,0,0,0,1,1,0,0,1,1,0,0,0],
			[1,0,1,0,0,1,1,0,1,1,0,1,1,0,0],
			[1,0,1,0,0,1,1,0,1,1,0,1,1,0,0],
			[0,1,1,1,0,1,1,0,1,0,0,1,1,0,0],
			[0,1,1,1,0,1,1,0,1,1,1,1,0,0,0],
			[0,1,1,1,0,1,1,1,0,1,1,1,0,0,0],
			[0,0,1,1,1,1,1,1,1,1,1,1,1,0,0],
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
		];
		var w = 15,
		h = 10,
		cell = 20;

	//заготовка анализа кол-ва подряд идущих клеток
	//в левом блоке
	function lblock(){
		var lh = document.getElementById("lh");
		var   count = 0,
			max = 0;
		for (var i = 0; i < h; i++){
			if (count > max)
				max = count;
			count = 0;
			for (var j = 0; j < w; j++){
				if (ulitka[i][j] == 1){
					count++;
					j++;
					if (j != 15){
						while(ulitka[i][j] == 1){
							j++;
						}
					}
				}
			}
		}
		lh.width = cell * max;
	}
	//в верхнем блоке
	function tblock(){
		var th = document.getElementById("th");
		var   count = 0,
			max = 0;
		for (var j = 0; j < w; j++){
			if (count > max)
				max = count;
			count = 0;
			for (var i = 0; i < h; i++){
				if (ulitka[i][j] == 1){
					count++;
					i++;
					if (i != 10){
						while(ulitka[i][j] == 1){
							i++;
						}
					}
				}
			}
		}
		th.height = cell * max;
	}




}]);

function drawleft(){
	var lh = document.getElementById("lh");
	var conte = lh.getContext("2d");
	var ulleft = [
		[0,0,0,0,4],
		[0,0,0,0,6],
		[0,1,1,2,2],
		[1,1,2,2,2],
		[1,1,2,2,2],
		[0,3,2,1,2],
		[0,0,3,2,4],
		[0,0,3,3,3],
		[0,0,0,0,11],
		[0,0,0,0,15]
	];
	var ullx = 10, ully = 5;
	for (var x = 0.5; x < 101; x += 20) {//вертикальные линии
		conte.moveTo(x, 0);
		conte.lineTo(x, 201);
	}
	for (var y = 0.5; y < 201; y += 20) {//горизонтальные линии
		conte.moveTo(0, y);
		conte.lineTo(101, y);
	}
	conte.stroke();
	conte.font = "bold 12px sans-serif";
	conte.textBaseline = "top";
	var a = 5, b = 5;
	for (var i = 0; i < ully; i++) {
		a = 5 + (20*i);
		for (var j = 0; j < ullx; j++) {
			b = 5 + (20*j);
			if (ulleft[j][i] != 0){
				conte.fillText(ulleft[j][i], a, b);
			}
		}
	}
}

function drawtop(){
	var ultop = [
		[0,0,0,0,0,0,0,0,2,2,0,0,0,0,0],
		[3,3,0,0,0,0,0,3,4,2,3,0,3,0,0],
		[1,1,8,5,2,7,9,3,2,4,4,9,2,1,1]
	];
	var ultx = 3, ulty = 15;
	var th = document.getElementById("th");
	var cont = th.getContext("2d");
	for (var x = 0.5; x < 301; x += 20) {//вертикальные линии
		cont.moveTo(x, 0);
		cont.lineTo(x, 61);
	}
	for (var y = 0.5; y < 61; y += 20) {//горизонтальные линии
		cont.moveTo(0, y);
		cont.lineTo(301, y);
	}
	cont.stroke();
	cont.font = "bold 12px sans-serif";
	cont.textBaseline = "top";
	var a = 5, b = 5;
	for (var i = 0; i < ulty; i++) {
		a = 5 + (20*i);
		for (var j = 0; j < ultx; j++) {
			b = 5 + (20*j);
			if (ultop[j][i] != 0){
				cont.fillText(ultop[j][i], a, b);
			}
		}
	}
}
function drawbody(){
	var ulitka = [
		[0,0,0,0,0,0,0,1,1,1,1,0,0,0,0],
		[0,0,0,0,0,0,1,1,1,1,1,1,0,0,0],
		[1,0,1,0,0,0,1,1,0,0,1,1,0,0,0],
		[1,0,1,0,0,1,1,0,1,1,0,1,1,0,0],
		[1,0,1,0,0,1,1,0,1,1,0,1,1,0,0],
		[0,1,1,1,0,1,1,0,1,0,0,1,1,0,0],
		[0,1,1,1,0,1,1,0,1,1,1,1,0,0,0],
		[0,1,1,1,0,1,1,1,0,1,1,1,0,0,0],
		[0,0,1,1,1,1,1,1,1,1,1,1,1,0,0],
		[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
	];
	var ul = document.getElementById("ul");
	var context = ul.getContext("2d");
	for (var x = 0.5; x < 301; x += 20) {//вертикальные линии
		context.moveTo(x, 0);
		context.lineTo(x, 200);
	}
	for (var y = 0.5; y < 201; y += 20) {//горизонтальные линии
		context.moveTo(0, y);
		context.lineTo(301, y);
	}
	context.stroke();
	function halmaOnClick(e) {
		var x1;
		var y1;
		x1 = (e.pageX - ul.offsetLeft) / 20 | 0;
		y1 = (e.pageY - ul.offsetTop) / 20 | 0;
		context.fillRect(x1*20, y1*20, 20, 20);
	}
	ul.addEventListener("click", halmaOnClick, false);
}