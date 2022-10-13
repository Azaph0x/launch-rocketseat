//https://github.com/rocketseat-education/bootcamp-launchbase-desafios-01/blob/master/desafios/01-2-lidando-com-objetos-e-vetores.md

techs = [
    { 
        nome: 'C++', 
        especialidade: 'Desktop' 
    },
    { 
        nome: 'Python', 
        especialidade: 'Data Science' 
    },
    { 
        nome: 'JavaScript', 
        especialidade: 'Web/Mobile' 
    }
]

console.log(`O usuário Carlos tem 32 anos e usa a tecnologia ${techs[0].nome} com especialidade em ${techs[0].especialidade}`)

//extra
for(tech of techs) {
    console.log(`O usuário Carlos tem 32 anos e usa a tecnologia ${tech.nome} com especialidade em ${tech.especialidade}`)
}