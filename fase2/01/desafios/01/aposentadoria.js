//https://github.com/rocketseat-education/bootcamp-launchbase-desafios-01/blob/master/desafios/01-1-primeiros-passos-com-js.md

const nome = "Silvana";
const sexo = "F";
const idade = 48;
const contribuicao = 23;

const m = contribuicao >= 35 && (contribuicao + idade) >= 95 && sexo == "M"
const f = contribuicao >= 30 && (contribuicao + idade) >= 85 && sexo == "F"

if(f || m) {
    console.log(`${nome}, você pode se aposentar!`)
} else {
    console.log(`${nome}, você ainda não pode se aposentar!`)
}