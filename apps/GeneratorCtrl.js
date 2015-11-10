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

var matrixOfPicture;
var gridOfUser;
var bodyCanvas;
var bodyContext;

function readMatrixOfPict(){//считывает матрицу картинки из файла json
	matrixOfPicture = new Array();
	gridOfUser = new Array();
	$.getJSON("document.json", function(json){
		//alert(json.matrix[0].length);
		for (var i = 0; i < json.matrix.length; i++){
			matrixOfPicture[i] = new Array();
			gridOfUser[i] = new Array();
			for (var j = 0; j < json.matrix[0].length; j++){
				matrixOfPicture[i][j] = json.matrix[i][j];
				gridOfUser[i][j] = 0;
			}
		}
		console.log(gridOfUser);
	});
}

function drawHorizLines(context, widht, height){//горизонтальные линии
	var thickLinesCount = 0;
	for (var y = 0.5; y < height; y += 20) {
		if (thickLinesCount != 5){
			context.moveTo(0, y);
			context.lineTo(widht, y);
			thickLinesCount++;
		}
		else{
			thickLinesCount = 1;
			context.moveTo(0, y);
			context.lineTo(widht, y);
			context.moveTo(0, y + 1);
			context.lineTo(widht, y + 1);
		}
	}
}
function drawVertLines(context, widht, height){//вертикальные линии
	var thickLinesCount = 0;
	for (var x = 0.5; x < widht; x += 20) {
		if (thickLinesCount != 5){
			context.moveTo(x, 0);
			context.lineTo(x, height);
			thickLinesCount++;
		}
		else {
			thickLinesCount = 1;
			context.moveTo(x, 0);
			context.lineTo(x, height);
			context.moveTo(x + 1, 0);
			context.lineTo(x + 1, height);
		}
	}
}

function drawLeft(){//рисует левый блок
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
	var leftCanvas = document.getElementById("leftOfGrid");
	leftCanvas.width = 101;
	leftCanvas.height = 201;
	var leftContex = leftCanvas.getContext("2d");
	drawHorizLines(leftContex, leftCanvas.width, leftCanvas.height);
	drawVertLines(leftContex, leftCanvas.width, leftCanvas.height);
	leftContex.stroke();
	leftContex.font = "bold 12px sans-serif";
	leftContex.textBaseline = "top";
	var a = 5, b = 5;
	for (var i = 0; i < ully; i++) {
		a = 5 + (20*i);
		for (var j = 0; j < ullx; j++) {
			b = 5 + (20*j);
			if (ulleft[j][i] != 0){
				leftContex.fillText(ulleft[j][i], a, b);
			}
		}
	}
}

function drawTop(){//рисует верхний блок
	var ultop = [
		[0,0,0,0,0,0,0,0,2,2,0,0,0,0,0],
		[3,3,0,0,0,0,0,3,4,2,3,0,3,0,0],
		[1,1,8,5,2,7,9,3,2,4,4,9,2,1,1]
	];
	var ultx = 3, ulty = 15;
	var topCanvas = document.getElementById("topOfGrid");
	topCanvas.width = 301;
	topCanvas.height = 61;
	var topContext = topCanvas.getContext("2d");
	drawVertLines(topContext, topCanvas.width, topCanvas.height);
	drawHorizLines(topContext, topCanvas.width, topCanvas.height);
	topContext.stroke();
	topContext.font = "bold 12px sans-serif";
	topContext.textBaseline = "top";
	var a = 7, b = 5;
	for (var i = 0; i < ulty; i++) {
		a = 5 + (20*i);
		for (var j = 0; j < ultx; j++) {
			b = 5 + (20*j);
			if (ultop[j][i] != 0){
				topContext.fillText(ultop[j][i], a, b);
			}
		}
	}
}

function drawBody(){//рисует основное поле
	bodyCanvas = document.getElementById("bodyOfGrid");
	bodyCanvas.width = 301;
	bodyCanvas.height = 201;
	bodyContext = bodyCanvas.getContext("2d");
	drawVertLines(bodyContext, bodyCanvas.width, bodyCanvas.height);
	drawHorizLines(bodyContext, bodyCanvas.width, bodyCanvas.height);
	bodyContext.stroke();
	drawGridCells();
}

function drawGridCells(){
	var x = 0;
	var y = 0;
	function cellOnClick(e) {
		x = (e.pageX - bodyCanvas.offsetLeft) / 20 | 0;
		y = (e.pageY - bodyCanvas.offsetTop) / 20 | 0;
		if (gridOfUser[y][x] == 0){
			bodyContext.fillStyle = "black";
			bodyContext.fillRect(x * 20, y * 20, 20, 20);
			gridOfUser[y][x] = 1;
		}
		else{
			bodyContext.fillStyle = "black";
			bodyContext.fillRect(x * 20, y * 20, 20, 20);
			bodyContext.fillStyle = "white";
			bodyContext.fillRect(x * 20 + 1, y * 20 + 1, 19, 19);
			drawHorizLines(bodyContext, bodyCanvas.width, bodyCanvas.height);
			drawVertLines(bodyContext, bodyCanvas.width, bodyCanvas.height);
			bodyContext.stroke();
			gridOfUser[y][x] = 0;
		}

	}
	bodyCanvas.addEventListener("click", cellOnClick, false);
}

function compareMatrix( matrix, grid ){
	for(var i = 0; i < matrix.length; i++){
		for(var j = 0; j < matrix[0].length; j++){
			if (matrix[i][j] != grid[i][j]) return false;
		}
	}
	return true;
}

function checkGrid(){
	var resultOfCompare = compareMatrix(matrixOfPicture, gridOfUser);
	if (resultOfCompare == true) alert("Правильно!");
	else alert("Неправильно!");
}

