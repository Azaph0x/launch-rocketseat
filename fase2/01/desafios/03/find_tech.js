// https://github.com/rocketseat-education/bootcamp-launchbase-desafios-01/blob/master/desafios/01-3-funcoes-e-estruturas-de-repeticao.md

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

function checaSeUsuarioUsaCSS(usuario) {
    for(tech of usuario.tecnologias) {
        if(tech == "CSS") {
            return true;
        }
    }

}

for (let i = 0; i < usuarios.length; i++) {
  const usuarioTrabalhaComCSS = checaSeUsuarioUsaCSS(usuarios[i]);

  if (usuarioTrabalhaComCSS) {
    console.log(`O usuário ${usuarios[i].nome} trabalha com CSS`);
  }
}
