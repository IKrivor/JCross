App.controller('GeneratorCtrl', ['$scope', '$mdSidenav', function($scope){

	var actionLeft1 = true,
		actionRight1 = false;
}]);

var matrixOfPicture = [];
var gridOfUser = [];
var bodyCanvas;
var bodyContext;
var firstHNum = 3;
var secondHNum = 3;
var xPrevCell = 0;
var yPrevCell = 0;
var leftBlock = [];
var leftBlClick = [];
var topBlClick = [];
var topBlock = [];
var leftCanvas;
var topCanvas;
var leftContext;
var topContext;

/**
 * Cчитывает матрицу картинки улитки из файла json
 */
function readMatrixOfPict(){
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
 * Cчитывает матрицу картинки белки из файла json
 */
function readMatrixOfPict2(){
	$.getJSON("belka.json", function(json){
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
 * Cчитывает матрицу картинки панды из файла json
 */
function readMatrixOfPict3(){
	$.getJSON("panda.json", function(json){
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
 * @param width Ширина канваса
 * @param height Высота канваса
 */
function drawHorizLines(context, width, height){
	var thickLinesCount = 0;

	context.lineWidth = 1;
	context.strokeStyle = "black";

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

	context.lineWidth = 1;
	context.strokeStyle = "black";

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
	leftCanvas = document.getElementById("leftOfGrid");

	var countOfCells = 0;
	var	max = 0;
	var timer = setInterval(function(){

		for (var i = 0; i < matrixOfPicture.length; i++){

			if (countOfCells > max) max = countOfCells;

			countOfCells = 0;

			for (var j = 0; j < matrixOfPicture[0].length; j++){

				if (matrixOfPicture[i][j] == 1){
					countOfCells++;
					j++;

					if (j != matrixOfPicture[0].length){

						while(matrixOfPicture[i][j] == 1){
							if (j != matrixOfPicture[0].length) j++;
							else break;
						}

					}

				}
			}
		}

		leftCanvas.width = max * 20 + 1;
		leftCanvas.height = matrixOfPicture.length * 20 + 1;
		leftCanvas.style.background = "#FFF3D7";
		countOfCells = 0;

		for (var i = 0; i < matrixOfPicture.length; i++) {
			leftBlock[i] = [];
			leftBlClick[i] = [];

			for (var j = 0; j < max; j++) {
				leftBlock[i][j] = 0;
				leftBlClick[i][j] = 0;
			}

		}

		var k = max - 1;

		for (var i = 0; i < matrixOfPicture.length; i++) {
			k = max - 1;

			for (var j = matrixOfPicture[0].length - 1; j >= 0; j--) {

				if (matrixOfPicture[i][j] == 1){
					countOfCells++;
					j--;

					if (j != -1){

						while(matrixOfPicture[i][j] == 1){
							countOfCells++;
							j--;
						}

					}

					j++;
					leftBlock[i][k] = countOfCells;
					k--;
					countOfCells = 0;
				}
			}
		}

		leftContext = leftCanvas.getContext("2d");

		drawHorizLines(leftContext, leftCanvas.width, leftCanvas.height);
		drawVertLines(leftContext, leftCanvas.width, leftCanvas.height);
		leftContext.stroke();
		leftContext.font = "bold 12px sans-serif";
		leftContext.textBaseline = "top";

		var a = 5, b = 5;

		for (var i = 0; i < max; i++) {
			a = 5 + (20*i);

			for (var j = 0; j < matrixOfPicture.length; j++) {
				b = 5 + (20*j);

				if (leftBlock[j][i] != 0){
					leftContext.fillText(leftBlock[j][i], a, b);
				}

			}

		}

		clearInterval(timer);
	},2);
	leftCanvas.addEventListener("click", leftDigitOnClick, false);
}

/**
 * Рисует верхний блок с цифрами
 */
function drawTop(){
	topCanvas = document.getElementById("topOfGrid");
	var countOfCells = 0;
	var	max = 0;

	topContext = topCanvas.getContext("2d");

	var timer = setInterval(function(){
		for (var i = 0; i < matrixOfPicture[0].length; i++){
			//console.log("i" + i);
			if (countOfCells > max) max = countOfCells;

			countOfCells = 0;

			for (var j = 0; j < matrixOfPicture.length; j++){

				if (matrixOfPicture[j][i] == 1){
					countOfCells++;
					j++;

					if (j != matrixOfPicture.length){

						while(matrixOfPicture[j][i] == 1){
							if (j != matrixOfPicture.length - 1) {
								j++;
							} else break;
						}

					}

				}
			}
		}
		countOfCells = 0;

		topCanvas.width = matrixOfPicture[0].length * 20 + 1;
		topCanvas.height = max * 20 + 1;

		for (var i = 0; i < max; i++) {
			topBlock[i] = [];
			topBlClick[i] = [];

			for (var j = 0; j < matrixOfPicture[0].length; j++) {
				topBlock[i][j] = 0;
				topBlClick[i][j] = 0;
			}

		}

		var k = max - 1;

		for (var i = 0; i < matrixOfPicture[0].length; i++) {
			k = max - 1;

			for (var j = matrixOfPicture.length - 1; j >= 0; j--) {

				if (matrixOfPicture[j][i] == 1){
					countOfCells++;
					j--;

					if (j != -1){

						while(matrixOfPicture[j][i] == 1){
							if (j != 0) {
								countOfCells++;
								j--;
							}else {
								countOfCells++;
								break;
							}

						}

					}

					if (j != 0) j++;
					topBlock[k][i] = countOfCells;
					k--;
					countOfCells = 0;
				}
			}
		}

		drawVertLines(topContext, topCanvas.width, topCanvas.height);
		drawHorizLines(topContext, topCanvas.width, topCanvas.height);
		topContext.stroke();
		topContext.font = "bold 12px sans-serif";
		topContext.textBaseline = "top";

		var a = 5, b = 5;

		for (var i = 0; i < matrixOfPicture[0].length; i++) {
			a = 5 + (20*i);

			for (var j = 0; j < max; j++) {
				b = 5 + (20*j);

				if (topBlock[j][i] != 0){
					topContext.fillText(topBlock[j][i], a, b);
				}

			}

		}

		clearInterval(timer);
	}, 2);
	topCanvas.addEventListener("click", topDigitOnClick, false);
}

/**
 * Рисует основное поле
 */
function drawBody(){

	var timer = setInterval(function(){
		bodyCanvas = document.getElementById("bodyOfGrid");
		bodyCanvas.width = matrixOfPicture[0].length * 20 + 1;
		bodyCanvas.height = matrixOfPicture.length * 20 + 1;
		bodyContext = bodyCanvas.getContext("2d");
		drawVertLines(bodyContext, bodyCanvas.width, bodyCanvas.height);
		drawHorizLines(bodyContext, bodyCanvas.width, bodyCanvas.height);
		bodyContext.stroke();
		bodyCanvas.addEventListener("click", cellOnClick, false);
		bodyCanvas.addEventListener("mousemove", cellMouseMove, false);
		clearInterval(timer);
	},2)
}

/**
 *Закрашивает или стирает клетку по клику мыши
 */
function cellOnClick(e) {
	var x = (e.pageX - bodyCanvas.offsetLeft) / 20 | 0;
	var y = (e.pageY - bodyCanvas.offsetTop) / 20 | 0;

	var timer = setInterval(function(){
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

		var resultOfCompare = compareMatrix(matrixOfPicture, gridOfUser);

		if (resultOfCompare == true) victoryShow();

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

	if (resultOfCompare == true) victoryShow();
	else {
		messageSend("Решено неверно!");
	}
}

/**
 * Показывает неправильно закрашенную клетку
 */
function firstHelp(){
	if (firstHNum != 0){
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

		if (randomIndex == -1) {
			messageSend("Все клетки верны!");
		}
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
			firstHNum--;
			document.getElementById('help1but').style.textAlign = 'center';
			document.getElementById('help1but').style.color = 'white';
			document.getElementById('help1but').style.fontWeight = 'bold';
			document.getElementById('help1but').style.fontSize = '20pt';
			document.getElementById('help1but').innerHTML = firstHNum.toString();

			if (firstHNum == 0) {
					document.getElementById('help1but').style.background = '#808080';
					document.getElementById('help1but').style.cursor = 'pointer';
			}

		}
	}
}

/**
 * Показывает клетку, которая должна быть закрашена
 */
function secondHelp(){
	if (secondHNum != 0){
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

		if (randomIndex == -1) {
			messageSend("Все правильные клетки закрашены!");
		}
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
			secondHNum--;

			if (secondHNum == 0) {
				document.getElementById('help2but').style.background = '#808080';
				document.getElementById('help2but').style.cursor = 'pointer';
				document.getElementById('help2but').style.color = 'white';
				document.getElementById('help2but').style.borderColor = '#808080';
				document.getElementById('help2but').innerHTML = secondHNum.toString();
			} else {
				document.getElementById('help2but').style.textAlign = 'center';
				document.getElementById('help2but').style.color = '#FF6347';
				document.getElementById('help2but').style.fontWeight = 'bold';
				document.getElementById('help2but').style.fontSize = '20pt';
				document.getElementById('help2but').innerHTML = secondHNum.toString();
			}

		}
	}
}

/**
 * Зачеркивает цифры на левом поле
 */
function leftDigitOnClick(e){
	var x = (e.pageX - leftCanvas.offsetLeft) / 20 | 0;
	var y = (e.pageY - leftCanvas.offsetTop) / 20 | 0;

	if (leftBlock[y][x] != 0) {
		if (leftBlClick[y][x] == 0) {
			leftContext.beginPath();
			leftContext.lineWidth = 2;
			leftContext.strokeStyle = "#FF6347";
			leftContext.moveTo(x * 20 + 1, y * 20 + 1);
			leftContext.lineTo(x * 20 + 20, y * 20 + 20);
			leftContext.stroke();
			leftContext.moveTo(x * 20 + 20, y * 20 + 1);
			leftContext.lineTo(x * 20 + 1, y * 20 + 20);
			leftContext.stroke();
			leftContext.beginPath();
			drawHorizLines(leftContext, leftCanvas.width, leftCanvas.height);
			drawVertLines(leftContext, leftCanvas.width, leftCanvas.height);
			leftContext.stroke();
			leftBlClick[y][x] = 1;
		} else {
			leftContext.fillStyle = "#fff3d7";
			leftContext.fillRect(x * 20, y * 20, 20, 20);
			leftContext.stroke();
			leftContext.fillStyle = "black";
			leftContext.fillText(leftBlock[y][x], x * 20 + 5, y * 20 + 5);
			drawHorizLines(leftContext, leftCanvas.width, leftCanvas.height);
			drawVertLines(leftContext, leftCanvas.width, leftCanvas.height);
			leftContext.stroke();
			leftBlClick[y][x] = 0;
		}
	}

}

/**
 * Зачеркивает цифры на верхнем поле
 */
function topDigitOnClick(e){
	var x = (e.pageX - topCanvas.offsetLeft) / 20 | 0;
	var y = (e.pageY - topCanvas.offsetTop) / 20 | 0;

	if (topBlock[y][x] != 0) {
		if (topBlClick[y][x] == 0) {
			topContext.beginPath();
			topContext.lineWidth = 2;
			topContext.strokeStyle = "#FF6347";
			topContext.moveTo(x * 20 + 1, y * 20 + 1);
			topContext.lineTo(x * 20 + 20, y * 20 + 20);
			topContext.stroke();
			topContext.moveTo(x * 20 + 20, y * 20 + 1);
			topContext.lineTo(x * 20 + 1, y * 20 + 20);
			topContext.stroke();
			topContext.beginPath();
			drawHorizLines(topContext, topCanvas.width, topCanvas.height);
			drawVertLines(topContext, topCanvas.width, topCanvas.height);
			topContext.stroke();
			topBlClick[y][x] = 1;
		} else {
			topContext.fillStyle = "#fff3d7";
			topContext.fillRect(x * 20, y * 20, 20, 20);
			topContext.stroke();
			topContext.fillStyle = "black";
			topContext.fillText(topBlock[y][x], x * 20 + 5, y * 20 + 5);
			drawHorizLines(topContext, topCanvas.width, topCanvas.height);
			drawVertLines(topContext, topCanvas.width, topCanvas.height);
			topContext.stroke();
			topBlClick[y][x] = 0;
		}
	}
}

/**
 * Ваводит сообщение в див над кроссвордом
 * @param message Текст сообщения
 */
function messageSend (message){
	var pulseCount = 0;
	var timer = setInterval(function(){
		if (pulseCount == 0) {
			document.getElementById('message1').style.fontSize = '17pt';
			document.getElementById('message1').style.textTransform = 'uppercase';
			document.getElementById('message1').style.color = '#FF6347';
			document.getElementById('message1').innerHTML = message;
			pulseCount++;
		}else if (pulseCount != 4) {
			pulseCount++;
		}else {
			document.getElementById('message1').innerHTML = "";
			clearInterval(timer);
		}
	}, 500);
}

/**
 * Выводит сообщение о победе в див над кроссвордом
 */
function victoryShow(){
	var timer = setInterval(function(){
		document.getElementById('message1').style.fontSize = '40pt';
		document.getElementById('message1').style.textTransform = 'uppercase';
		document.getElementById('message1').style.color = '#FF6347';
		document.getElementById('message1').innerHTML = "Поздравляем!!!";
		clearInterval(timer);
	}, 500);
}