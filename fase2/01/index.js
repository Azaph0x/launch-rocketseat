//Criar um programa que calcula a media
// das notas entre os aluunos e envia mensagem do calculo da media

const aluno01 = "Mayk"
const nota01 = 9.0

const aluno02 = "Diego"
const nota02 = 9.0

const aluno03 = "Marcos"
const nota03 = 9.0

const media = (nota01 + nota02 + nota03) / 3

if(media >  5){
    console.log(`Parabens, a media foi ${media}`)  
} else {
    console.log(`Infelizmente, a media foi menor que 5`)  
}

console.log(media)