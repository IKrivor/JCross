App.controller('GeneratorCtrl', ['$scope', '$mdSidenav', function($scope){

	var actionLeft1 = true,
		actionRight1 = false;
	//var w = 15, h = 10, cell = 20;

	//заготовка анализа кол-ва подряд идущих клеток
	//в левом блоке
	//function lblock(){
	//	var lh = document.getElementById("lh");
	//	var   count = 0,
	//		max = 0;
	//	for (var i = 0; i < h; i++){
	//		if (count > max)
	//			max = count;
	//		count = 0;
	//		for (var j = 0; j < w; j++){
	//			if (ulitka[i][j] == 1){
	//				count++;
	//				j++;
	//				if (j != 15){
	//					while(ulitka[i][j] == 1){
	//						j++;
	//					}
	//				}
	//			}
	//		}
	//	}
	//	lh.width = cell * max;
	//}
	////в верхнем блоке
	//function tblock(){
	//	var th = document.getElementById("th");
	//	var   count = 0,
	//		max = 0;
	//	for (var j = 0; j < w; j++){
	//		if (count > max)
	//			max = count;
	//		count = 0;
	//		for (var i = 0; i < h; i++){
	//			if (ulitka[i][j] == 1){
	//				count++;
	//				i++;
	//				if (i != 10){
	//					while(ulitka[i][j] == 1){
	//						i++;
	//					}
	//				}
	//			}
	//		}
	//	}
	//	th.height = cell * max;
	//}
}]);

var matrixOfPicture;
var gridOfUser;
var bodyCanvas;
var bodyContext;
var firstHNum = 0;
var secondHNum = 0;
var xPrevCell = 0;
var yPrevCell = 0;

/**
 * Cчитывает матрицу картинки из файла json
 */
function readMatrixOfPict(){
	matrixOfPicture = [];
	gridOfUser = [];

	$.getJSON("document.json", function(json){
		for (var i = 0; i < json.matrix.length; i++){
			matrixOfPicture[i] = [];
			gridOfUser[i] = [];

			for (var j = 0; j < json.matrix[0].length; j++){
				matrixOfPicture[i][j] = json.matrix[i][j];
				gridOfUser[i][j] = 0;
			}

		}
	});
}

/**
 * Рисует горизонтальные линии на игровом поле
 *
 * @param context Контекст канваса, на котором будет рисоваться
 * @param width Ширина каваса
 * @param height Высота канваса
 */
function drawHorizLines(context, width, height){
	var thickLinesCount = 0;

	for (var y = 0.5; y < height; y += 20) {

		if (thickLinesCount != 5){
			context.moveTo(0, y);
			context.lineTo(width, y);
			thickLinesCount++;
		}
		else{
			thickLinesCount = 1;
			context.moveTo(0, y);
			context.lineTo(width, y);
			context.moveTo(0, y + 1);
			context.lineTo(width, y + 1);
		}

	}
}

/**
 * Рисует вертикальные линии на игровом поле
 *
 * @param context Контекст канваса, на котором будет рисоваться
 * @param width Ширина канваса
 * @param height Высота канваса
 */
function drawVertLines(context, width, height){
	var thickLinesCount = 0;

	for (var x = 0.5; x < width; x += 20) {

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

/**
 * Рисует левый блок с цифрами
 */
function drawLeft(){
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
	leftContex = leftCanvas.getContext("2d");
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

/**
 * Рисует верхний блок с цифрами
 */
function drawTop(){
	var ultop = [
		[0,0,0,0,0,0,0,0,2,2,0,0,0,0,0],
		[3,3,0,0,0,0,0,3,4,2,3,0,3,0,0],
		[1,1,8,5,2,7,9,3,2,4,4,9,2,1,1]
	];
	var ultx = 3, ulty = 15;
	var topCanvas = document.getElementById("topOfGrid");
	var topContext = topCanvas.getContext("2d");

	topCanvas.width = 301;
	topCanvas.height = 61;
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

/**
 * Рисует основное поле
 */
function drawBody(){
	bodyCanvas = document.getElementById("bodyOfGrid");
	bodyCanvas.width = 301;
	bodyCanvas.height = 201;
	bodyContext = bodyCanvas.getContext("2d");
	drawVertLines(bodyContext, bodyCanvas.width, bodyCanvas.height);
	drawHorizLines(bodyContext, bodyCanvas.width, bodyCanvas.height);
	bodyContext.stroke();
	bodyCanvas.addEventListener("click", cellOnClick, false);
	bodyCanvas.addEventListener("mousemove", cellMouseMove, false);
}

/**
 *Закрашивает или стирает клетку по клику мыши
 */
function cellOnClick(e) {
	var x = 0;
	var y = 0;

	var timer = setInterval(function(){
		x = (e.pageX - bodyCanvas.offsetLeft) / 20 | 0;
		y = (e.pageY - bodyCanvas.offsetTop) / 20 | 0;

		if (gridOfUser[y][x] == 0){
			bodyContext.fillStyle = "black";
			gridOfUser[y][x] = 1;
		}
		else{
			bodyContext.fillStyle = "white";
			gridOfUser[y][x] = 0;
		}

		bodyContext.fillRect(x * 20 + 1, y * 20 + 1, 19, 19);
		drawHorizLines(bodyContext, bodyCanvas.width, bodyCanvas.height);
		drawVertLines(bodyContext, bodyCanvas.width, bodyCanvas.height);
		bodyContext.stroke();
		clearInterval(timer);
	}, 100);
}

/**
 * Выделяет клетку, на которую наведен курсор
 */
function cellMouseMove(e) {
	var x = 0;
	var y = 0;

	if (gridOfUser[yPrevCell][xPrevCell] == 0) {
		bodyContext.fillStyle = "white";
		bodyContext.fillRect(xPrevCell * 20 + 1, yPrevCell * 20 + 1, 19, 19);
		bodyContext.stroke();
	} else {
		bodyContext.fillStyle = "black";
		bodyContext.fillRect(xPrevCell * 20 + 1, yPrevCell * 20 + 1, 19, 19);
		bodyContext.stroke();
	}

	x = (e.pageX - bodyCanvas.offsetLeft) / 20 | 0;
	y = (e.pageY - bodyCanvas.offsetTop) / 20 | 0;

	if (gridOfUser[y][x] == 0) {
		bodyContext.fillStyle = "black";
		bodyContext.fillRect(x * 20 + 1, y * 20 + 1, 20, 20);
		bodyContext.fillStyle = "white";
		bodyContext.fillRect(x * 20 + 2, y * 20 + 2, 17, 17);
		bodyContext.stroke();

		xPrevCell = x;
		yPrevCell = y;
	} else {
		bodyContext.fillStyle = "white";
		bodyContext.fillRect(x * 20 + 1, y * 20 + 1, 20, 20);
		bodyContext.fillStyle = "black";
		bodyContext.fillRect(x * 20 + 3, y * 20 + 3, 15, 15);
		bodyContext.stroke();

		xPrevCell = x;
		yPrevCell = y;
	}
}

/**
 * Сравнивает матрицу картинки с сеткой пользователя
 *
 * @param matrix Матрица картинки
 * @param grid Текущая сетка пользователя
 * @returns {boolean} true - если равны, false - если нет
 */
function compareMatrix( matrix, grid ){
	for(var i = 0; i < matrix.length; i++){

		for(var j = 0; j < matrix[0].length; j++){
			if (matrix[i][j] != grid[i][j]) return false;
		}

	}
	return true;
}

/**
 * Проверяет правильность полученной картинки
 */
function checkGrid(){
	var resultOfCompare = compareMatrix(matrixOfPicture, gridOfUser);

	if (resultOfCompare == true) alert("Right!");
	else alert("Wrong!");
}

/**
 * Показывает неправильно закрашенную клетку
 */
function firstHelp(){
	if (firstHNum != 3){
		var incorrectCells = [], k = 0;

		/**
		 * Определяет неправильно закрашенные клетки
		 *
		 * @param matrix Матрица картинки
		 * @param grid Текущая сетка пользователя
		 * @returns {number} Индекс случайной неправильной клетки или -1, если таких нет
		 */
		function incorCellPick(matrix, grid){
			for(var i = 0; i < matrix.length; i++){

				for(var j = 0; j < matrix[0].length; j++){

					if (matrix[i][j] == 0 && grid[i][j] == 1){
						incorrectCells[k] = [];
						incorrectCells[k][0] = i;
						incorrectCells[k][1] = j;
						k++;
					}

				}

			}

			if (incorrectCells.length == 0) return -1;
			else return Math.floor(Math.random() * (incorrectCells.length));

		}
		var randomIndex = incorCellPick(matrixOfPicture, gridOfUser);

		if (randomIndex == -1) alert("All cells are correct!");
		else {
			var pulseCount = 0, colorCh = 1;
			var timer = setInterval(function(){
				if (pulseCount == 3) clearInterval(timer);

				if (colorCh == 1) {
					bodyContext.fillStyle = "#FF6347";
					colorCh = 2;
					pulseCount++;
				}
				else {
					bodyContext.fillStyle = "white";
					colorCh = 1;
				}

				bodyContext.fillRect(incorrectCells[randomIndex][1] * 20, incorrectCells[randomIndex][0] * 20, 20, 20);
				drawHorizLines(bodyContext, bodyCanvas.width, bodyCanvas.height);
				drawVertLines(bodyContext, bodyCanvas.width, bodyCanvas.height);
				bodyContext.stroke();
			}, 500);

			gridOfUser[incorrectCells[randomIndex][0]][incorrectCells[randomIndex][1]] = 0;
			firstHNum++;
		}
	}
	else alert("There are no first helps!");
}

/**
 * Показывает клетку, котоорая должна быть закрашена
 */
function secondHelp(){
	if (secondHNum != 3){
		var correctCells = [], k = 0;

		/**
		 * Определяет клетки, которые должны быть закрашены
		 *
		 * @param matrix Матрица картинки
		 * @param grid Текущая сетка пользователя
		 * @returns {number} Индекс случайной клетки, которая должна быть закрашена или -1, если таких нет
		 */
		function corCellPick(matrix, grid){
			for(var i = 0; i < matrix.length; i++){

				for(var j = 0; j < matrix[0].length; j++){

					if (matrix[i][j] == 1 && grid[i][j] == 0){
						correctCells[k] = [];
						correctCells[k][0] = i;
						correctCells[k][1] = j;
						k++;
					}

				}

			}

			if (correctCells.length == 0) return -1;
			else return Math.floor(Math.random() * (correctCells.length));

		}
		var randomIndex = corCellPick(matrixOfPicture, gridOfUser);

		if (randomIndex == -1) alert("All the correct cells are painted!");
		else {
			var pulseCount = 0, colorCh = 1;
			var timer = setInterval(function(){
				if (pulseCount == 3) {
					bodyContext.fillStyle = "black";
					bodyContext.fillRect(correctCells[randomIndex][1] * 20, correctCells[randomIndex][0] * 20, 20, 20);
					drawHorizLines(bodyContext, bodyCanvas.width, bodyCanvas.height);
					drawVertLines(bodyContext, bodyCanvas.width, bodyCanvas.height);
					bodyContext.stroke();
					clearInterval(timer);
				} else {

					if (colorCh == 1) {
						bodyContext.fillStyle = "#72EE68";
						colorCh = 2;
						pulseCount++;
					}
					else {
						bodyContext.fillStyle = "white";
						colorCh = 1;
					}

					bodyContext.fillRect(correctCells[randomIndex][1] * 20, correctCells[randomIndex][0] * 20, 20, 20);
					drawHorizLines(bodyContext, bodyCanvas.width, bodyCanvas.height);
					drawVertLines(bodyContext, bodyCanvas.width, bodyCanvas.height);
					bodyContext.stroke();
				}
			}, 500);

			gridOfUser[correctCells[randomIndex][0]][correctCells[randomIndex][1]] = 1;
			secondHNum++;
		}
	}
	else alert("There are no second helps!");
}

