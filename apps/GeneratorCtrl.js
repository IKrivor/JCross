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
var topBlock = [];
var leftCanvas;
var leftContext;
var topContext;


/**
 * C�������� ������� �������� ������ �� ����� json
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
 * C�������� ������� �������� ����� �� ����� json
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
 * ������ �������������� ����� �� ������� ����
 *
 * @param context �������� �������, �� ������� ����� ����������
 * @param width ������ �������
 * @param height ������ �������
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
 * ������ ������������ ����� �� ������� ����
 *
 * @param context �������� �������, �� ������� ����� ����������
 * @param width ������ �������
 * @param height ������ �������
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
 * ������ ����� ���� � �������
 */
function drawLeft(){
	leftCanvas = document.getElementById("leftOfGrid");
	var countOfCells = 0;
	var	max = 0;
	var timer = setInterval(function(){

		for (var i = 0; i < matrixOfPicture.length; i++){
		//console.log("i" + i);
			if (countOfCells > max) max = countOfCells;

			countOfCells = 0;

			for (var j = 0; j < matrixOfPicture[0].length; j++){

				if (matrixOfPicture[i][j] == 1){
					//console.log("j" + j);
					countOfCells++;
					j++;

					if (j != matrixOfPicture[0].length){

						while(matrixOfPicture[i][j] == 1){
							if (j != matrixOfPicture[0].length) j++;
							//console.log("j!" + j);
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

			for (var j = 0; j < max; j++)
				leftBlock[i][j] = 0;
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
}

/**
 * ������ ������� ���� � �������
 */
function drawTop(){
	var topCanvas = document.getElementById("topOfGrid");
	topContext = topCanvas.getContext("2d");
	var countOfCells = 0;
	var	max = 0;

	var timer = setInterval(function(){
		for (var i = 0; i < matrixOfPicture[0].length; i++){
			//console.log("i" + i);
			if (countOfCells > max) max = countOfCells;

			countOfCells = 0;

			for (var j = 0; j < matrixOfPicture.length; j++){

				if (matrixOfPicture[j][i] == 1){
					//console.log("i" + i);
					//console.log("j!" + j);
					countOfCells++;
					j++;

					if (j != matrixOfPicture.length){

						while(matrixOfPicture[j][i] == 1){
							if (j != matrixOfPicture.length - 1) {
								//console.log("j" + j);
								j++;
							} else break;

							//console.log("j!" + j);
						}

					}

				}
			}
		}
		console.log(max);
		console.log(matrixOfPicture[0].length);
		countOfCells = 0;

		topCanvas.width = matrixOfPicture[0].length * 20 + 1;
		topCanvas.height = max * 20 + 1;

		//topCanvas.width = 301;
		//topCanvas.height = 61;

		for (var i = 0; i < max; i++) {
			topBlock[i] = [];

			for (var j = 0; j < matrixOfPicture[0].length; j++)
				topBlock[i][j] = 0;
		}

		//console.log(topBlock);

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
		console.log(topBlock);

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


}

/**
 * ������ �������� ����
 */
function drawBody(){
	document.addEventListener( "DOMContentLoaded", function() {
		document.getElementById('help1').innerHTML = firstHNum.toString();
		document.getElementById('help2').innerHTML = secondHNum.toString();
	}, false );
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
 *����������� ��� ������� ������ �� ����� ����
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

		var resultOfCompare = compareMatrix(matrixOfPicture, gridOfUser);

		if (resultOfCompare == true) alert("Right!");

		clearInterval(timer);
	}, 100);
}



/**
 * �������� ������, �� ������� ������� ������
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

	//leftContext.strokeStyle = "#FFF3D7";
	//leftContext.strokeRect(2, yPrevCell * 20 + 2, leftBlock[0].length * 20 - 3, 17);
	//drawHorizLines(leftContext, leftCanvas.width, leftCanvas.height);
	//drawVertLines(leftContext, leftCanvas.width, leftCanvas.height);

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

	//leftContext.strokeStyle = "#FF6347";
	//leftContext.strokeRect(2, y * 20 + 2, leftBlock[0].length * 20 - 3, 17);
	//var timer = setInterval(function(){
	//	drawHorizLines(leftContext, leftCanvas.width, leftCanvas.height);
	//	clearInterval(timer);
	//}, 2);

}

/**
 * ���������� ������� �������� � ������ ������������
 *
 * @param matrix ������� ��������
 * @param grid ������� ����� ������������
 * @returns {boolean} true - ���� �����, false - ���� ���
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
 * ��������� ������������ ���������� ��������
 */
function checkGrid(){
	var resultOfCompare = compareMatrix(matrixOfPicture, gridOfUser);

	if (resultOfCompare == true) alert("���������!");
	else alert("�����������!");
}

/**
 * ���������� ����������� ����������� ������
 */
function firstHelp(){
	if (firstHNum != 0){
		var incorrectCells = [], k = 0;

		/**
		 * ���������� ����������� ����������� ������
		 *
		 * @param matrix ������� ��������
		 * @param grid ������� ����� ������������
		 * @returns {number} ������ ��������� ������������ ������ ��� -1, ���� ����� ���
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
			firstHNum--;
				document.getElementById('help1').innerHTML = firstHNum.toString();
			if (firstHNum == 0) {
					document.getElementById('help1but').style.background = '#808080';
					document.getElementById('help1but').style.cursor = 'pointer';
			}
		}
	}
}

/**
 * ���������� ������, ������� ������ ���� ���������
 */
function secondHelp(){
	if (secondHNum != 0){
		var correctCells = [], k = 0;

		/**
		 * ���������� ������, ������� ������ ���� ���������
		 *
		 * @param matrix ������� ��������
		 * @param grid ������� ����� ������������
		 * @returns {number} ������ ��������� ������, ������� ������ ���� ��������� ��� -1, ���� ����� ���
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
			secondHNum--;
			document.getElementById('help2').innerHTML = secondHNum.toString();
			if (secondHNum == 0) {
				document.getElementById('help2but').style.background = '#808080';
				document.getElementById('help2but').style.cursor = 'pointer';
			}
		}
	}
}

