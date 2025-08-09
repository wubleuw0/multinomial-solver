function solveMultinomial(a, n){
    let exponents = solveExponents(a, n)
    let result = {
        coefficients: solveCoefficients(exponents, n),
        exponents: exponents,
        a: a,
        n: n
    }
    return result
}

function solveExponents(a, n){
    let exponents = new Array(a).fill(null).map(() => [0])
    exponents[0][0] = n
    let i = 1
    while((exponents[a - 1][exponents[a - 1].length - 1]) != n){
        for(j = 0; j <= a - 1; j++){
            if((j != 0) && (exponents[j - 1][i] - exponents[j - 1][i - 1] == -1)){
                exponents[j].push(n)
                for(let k = 0; k <= j - 1; k++){
                    exponents[j][i] -= exponents[k][i]
                }
            }
            else{
                let highValue0 = n
                for(let k = 0; (k <= j) && (k < a - 1); k++){
                    highValue0 -= exponents[k][i - 1]
                }
                if(exponents[a - 1][i - 1] == highValue0){
                    exponents[j].push(exponents[j][i - 1] - Math.sign(exponents[j][i - 1]))
                    let highValue1 = n
                    for(let k = 0; (k < j); k++){
                        highValue1 -= exponents[k][i]
                    }
                    if((exponents[j][i] > highValue1) && (j != 0)){
                    exponents[j][i] = 0
                    }
                }
                else{
                    exponents[j].push(exponents[j][i - 1])
                }
            }
        }
        i++
        if(i > 2000){console.error("Code ran over 2000 times, that sucks."); break}
    }
    return exponents
}

function solveCoefficients(e, n){
    let coefficients = []
    for(let k = 0; k <= e[0].length - 1; k++){
        let currentExponents = new Array(e.length)
        for(i = 0; i <= e.length - 1; i++){
            currentExponents[i] = factorial(e[i][k])
        }
        coefficients.push(factorial(n) / prod(currentExponents))
    }
    return coefficients
}

function factorial(n){
  if (n < 0) {
    return "Factorial is not defined for negative numbers."
  }
  if (n === 0 || n === 1) {
    return 1
  }
  let result = 1
  for (let i = 1; i <= n; i++) {
    result *= i
  }
  return result
}

function total(l){
    return l.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
}

function prod(l){
    let result = 1
    for(let i = 0; i <= l.length - 1; i++){
        result *= l[i]
    }
    return result
}

document.getElementById('solveButton').onclick = function(){
    let result = solveMultinomial(Number(document.getElementById('input0').value), Number(document.getElementById('input1').value))
    const CHAR = "abcdefghijklmnopqrstuvwxyz"
    document.getElementById('inputDisplay').innerText = "$$("
    for(let i = 0; i <= result.a - 1; i++){
        document.getElementById('inputDisplay').innerText += CHAR.charAt(i) 
        + ((i == result.a - 1) ? "" : "+")
    }
    document.getElementById('inputDisplay').innerText += ")^{" + String(result.n) + "}$$"
    let displayFullText = ""
    let dispalyVars = ""
    function varsAndExponents(i){
        let idkwhattonamethisimtiredandits4am = ""
        for(let j = 0; j <= result.a - 1; j++){
            if(result.exponents[j][i] != 0){
                idkwhattonamethisimtiredandits4am += CHAR.charAt(j) 
                + ((result.exponents[j][i] > 1) ? ("^{" + String(result.exponents[j][i]) + "}") : (""))
            }
        }
        return idkwhattonamethisimtiredandits4am
    }
    for(let i = 0; (i <= result.coefficients.length - 1) && (i <= 15); i++){
        displayFullText += ((result.coefficients[i] == 1) ? "" : String(result.coefficients[i])) + (varsAndExponents(i)) 
        + (((i == result.coefficients.length - 1) || (i == 15)) ? "" : "+")
        if(i == 15){displayFullText += "..."}
    }
    document.getElementById('resultDisplay').innerText = "$$" + displayFullText + "$$"
    MathJax.typesetPromise([document.getElementById('inputDisplay')])
    MathJax.typesetPromise([document.getElementById('resultDisplay')])
    console.log(result)
}

function rand(){
    document.getElementById("body").style.setProperty('--rand', Math.random() * 75 + 128 - (75 / 2))
}

setInterval(rand, 5000)

let h1Angle = 0;

function updateAngle(){
    document.getElementById("h1").style.transform = ` rotateX(${360 * Math.cos(h1Angle / (360 / Math.PI))}deg)`
    if(h1Angle < 360 - 1){
        h1Angle += 1
    }
    else{
        h1Angle = 0
    }
}

setInterval(updateAngle, 1)

/****************************
--------wubleu_w.2K25--------
           (⊙ˍ⊙)
****************************/