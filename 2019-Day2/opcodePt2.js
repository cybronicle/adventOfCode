var puzzleInput = [
    1,0,0,3,
    1,1,2,3,
    1,3,4,3,
    1,5,0,3,
    2,10,1,19,
    2,9,19,23,
    2,13,23,27,
    1,6,27,31,
    2,6,31,35,
    2,13,35,39,
    1,39,10,43,
    2,43,13,47,
    1,9,47,51,
    1,51,13,55,
    1,55,13,59,
    2,59,13,63,
    1,63,6,67,
    2,6,67,71,
    1,5,71,75,
    2,6,75,79,
    1,5,79,83,
    2,83,6,87,
    1,5,87,91,
    1,6,91,95,
    2,95,6,99,
    1,5,99,103,
    1,6,103,107,
    1,107,2,111,
    1,111,5,0,
    99,
    2,14,0,0];

var modifiedPuzzleInput = [
    1,0,0,3,
    1,1,2,3,
    1,3,4,3,
    1,5,0,3,
    2,10,1,19,
    2,9,19,23,
    2,13,23,27,
    1,6,27,31,
    2,6,31,35,
    2,13,35,39,
    1,39,10,43,
    2,43,13,47,
    1,9,47,51,
    1,51,13,55,
    1,55,13,59,
    2,59,13,63,
    1,63,6,67,
    2,6,67,71,
    1,5,71,75,
    2,6,75,79,
    1,5,79,83,
    2,83,6,87,
    1,5,87,91,
    1,6,91,95,
    2,95,6,99,
    1,5,99,103,
    1,6,103,107,
    1,107,2,111,
    1,111,5,0,
    99,
    2,14,0,0];

var noun = 100;
var verb = 0;

function opcode1_Addition(index1, index2){
    var value1 = modifiedPuzzleInput[index1]
    var value2 = modifiedPuzzleInput[index2]
    return value1 + value2
}

function opcode2_Multiplication(index1, index2){  
    var value1 = modifiedPuzzleInput[index1]
    var value2 = modifiedPuzzleInput[index2]
    return value1 * value2
}

function checkWithin99(){
    return modifiedPuzzleInput[0] <= 19690720 && (19690720 - 99) <= modifiedPuzzleInput[0];
}

function testIntCode(){
    var index = 0;
    while(index < modifiedPuzzleInput.length - 3){
        var value;

        switch (modifiedPuzzleInput[index]){
            case 1:
                value = opcode1_Addition(modifiedPuzzleInput[index+1], modifiedPuzzleInput[index+2]);
                break;
            
            case 2:
                value = opcode2_Multiplication(modifiedPuzzleInput[index+1], modifiedPuzzleInput[index+2]);
                break;

            case 99:
                return
        }
        modifiedPuzzleInput[modifiedPuzzleInput[index+3]] = value;
        index = index + 4;
    }
}

function updateNounInModdifiedPuzzleInputForFinalCheck(){
    modifiedPuzzleInput[1] = noun;
}

function updateVerbInModdifiedPuzzleInputForFinalCheck(){
    modifiedPuzzleInput[2] = verb;
}

function findDifferenceInTotalForVerb(){verb = 19690720 - modifiedPuzzleInput[0]}

function resetModdifiedPuzzleInput(){ modifiedPuzzleInput = JSON.parse(JSON.stringify(puzzleInput));}

function checkIfResultOfIntCodeIsEqualToResult(resultValue){
    if(modifiedPuzzleInput[0] == resultValue){
        console.log("The value of the noun is " + noun + " and the verb is " + verb);
        console.log("Final value for the equation is " + evaluateTheEquation())
    }
}

function evaluateTheEquation(){return (100 * noun) + verb}

function finalCheck(){
    findDifferenceInTotalForVerb()
    resetModdifiedPuzzleInput()
    updateNounInModdifiedPuzzleInputForFinalCheck()
    updateVerbInModdifiedPuzzleInputForFinalCheck()
    testIntCode()
    checkIfResultOfIntCodeIsEqualToResult(19690720)
}

var start = Date.now()

while(!checkWithin99()){
    resetModdifiedPuzzleInput()
    // decrementing the noun inputted for the test
    modifiedPuzzleInput[1] = --noun;
    testIntCode()
}

finalCheck()
var end = Date.now();
console.log("execution time", end-start);