checkGrid = function( matrixOfPicture, gridOfUser ){
    for(var i = 0; i < matrixOfPicture.rowsNum; i++){
        for(var j = 0; j < matrixOfPicture.columsNum; j++){
            if (matrixOfPicture.matrix[i][j] != gridOfUser.matrix[i][i]) return false;
        }
    }
    return true;
}
