//Criar um programa que calcula a media
// das notas entre os aluunos e envia mensagem do calculo da media

const TurmaA = [
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
    },
    {
        nome: "Vinicius",
        nota: 10.0
    }
]

const TurmaB = [
    {
       nome: "Robson",
       nota: 9.0
   },
   {
       nome: "Rebeca",
       nota: 5.0
   }, 
   {
       nome: "Diogo",
       nota: 8.0
   },
   {
    nome: "Robert",
    nota: 8.0
}
]

function calcMedia(turma) {
    let soma = 0;
    turma.forEach(i => {
        soma += i.nota;
    });
    
    return soma / turma.length
}

const mediaA = calcMedia(TurmaA)
const mediaB = calcMedia(TurmaB)

function enviaMensagem(media, turma) {
    if(media >  5){
        console.log(`Parabens, a media da ${turma} foi de ${media}`)  
    } else {
        console.log(`Infelizmente, a media da ${turma} foi menor que 5`)  
    }
}

enviaMensagem(mediaA, 'A')
enviaMensagem(mediaB, 'B')