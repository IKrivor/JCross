describe("Проверка сетки пользователя", function(){

    it("Сетка пользователя верна", function(){
       extend( checkGrid( {rowsNum: 3, columsNum: 3, matrix: [[1,1,1],[0,0,0],[1,1,1]]}, {rowsNum: 3, columsNum: 3, matrix: [[1,1,1],[0,0,0],[1,1,1]]} )).toBe(true);
    });

});
