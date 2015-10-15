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

