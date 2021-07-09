function testFunction1(){
    return `Functions Return Data
    Try testFunction2(InsertNumberHere)`
}
function testFunction2(StartingNumber){
    var MultiplicationFactor = Math.floor(Math.random() * 100)
    var ReturningNumber = StartingNumber * MultiplicationFactor
    return `Functions Can Also Compute
    ${StartingNumber} * ${MultiplicationFactor} = ${ReturningNumber}`
}