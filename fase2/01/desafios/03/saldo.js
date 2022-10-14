//https://github.com/rocketseat-education/bootcamp-launchbase-desafios-01/blob/master/desafios/01-3-funcoes-e-estruturas-de-repeticao.md

const usuarios = [
    {
      nome: "Salvio",
      receitas: [115.3, 48.7, 98.3, 14.5],
      despesas: [85.3, 13.5, 19.9]
    },
    {
      nome: "Marcio",
      receitas: [24.6, 214.3, 45.3],
      despesas: [185.3, 12.1, 120.0]
    },
    {
      nome: "Lucia",
      receitas: [9.8, 120.3, 340.2, 45.3],
      despesas: [450.2, 29.9]
    }
    ];

    function calculaSaldo(receitas, despesas) {
        saldo = somaNumeros(receitas) - somaNumeros(despesas);
        return saldo;
    }

    function somaNumeros(numeros) {
        soma = 0;
        for(numero of numeros) {
            soma += numero;
        }
        return soma;
    }

    for(usuario of usuarios) {
        saldo = calculaSaldo(usuario.receitas, usuario.despesas)
        const status = saldo > 0 ? "POSITIVO" : "NEGATIVO"

        console.log(`${usuario.nome} possui saldo ${status} de ${saldo}`)
    }