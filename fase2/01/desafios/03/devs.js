//https://github.com/rocketseat-education/bootcamp-launchbase-desafios-01/blob/master/desafios/01-3-funcoes-e-estruturas-de-repeticao.md

const usuarios = [
    { 
        nome: "Carlos", 
        tecnologias: ["HTML", "CSS"] 
    },
    { 
        nome: "Jasmine", 
        tecnologias: ["JavaScript", "CSS"] 
    },
    { 
        nome: "Tuane", 
        tecnologias: ["HTML", "Node.js"]
     }
  ];

  for (usuario of usuarios) {
    console.log(`${usuario.nome} trabalha com ${usuario.tecnologias}`);
  }