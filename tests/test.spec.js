describe("Проверка сетки пользователя", function(){

    it("Сетка пользователя верна", function(){
       extend( checkGrid([[0,0,0],[1,1,1],[0,0,0]], [[0,0,0],[1,1,1],[0,0,0]])).toBe(true);
    });

});