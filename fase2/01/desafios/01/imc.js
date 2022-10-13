//https://github.com/rocketseat-education/bootcamp-launchbase-desafios-01/blob/master/desafios/01-1-primeiros-passos-com-js.md

const nome = "Carlos";
const peso = 84;
const altura = 1.88;

imc = peso / (altura * altura)

if(imc >= 30) {
    console.log(`${nome} você está acima do peso`)
} else {
    console.log(`${nome} você não está acima do peso`) 
}