//Criar um programa que calcula a media
// das notas entre os aluunos e envia mensagem do calculo da media

const alunos = [
     {
        nome: "Mayk",
        nota: 9.0
    },
    {
        nome: "Diego",
        nota: 5.0
    }, 
    {
        nome: "Marcos",
        nota: 8.0
    }
]

const media = (alunos[0].nota + alunos[1].nota + alunos[2].nota) / 3

if(media >  5){
    console.log(`Parabens, a media foi ${media}`)  
} else {
    console.log(`Infelizmente, a media foi menor que 5`)  
}

console.log(media)