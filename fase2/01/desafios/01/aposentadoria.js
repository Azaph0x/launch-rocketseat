const nome = "Silvana";
const sexo = "F";
const idade = 48;
const contribuicao = 23;

/**
Baseado nos valores acima utilize as fórmulas a seguir para calcular se a pessoa está apta ou não para se aposentar e no fim imprima uma mensagem em tela.

O tempo de contribuição mínimo para homens é de 35 anos e, para mulheres, 30 anos;
Utilizando a regra 85-95, a soma da idade com o tempo de contribuição do homem precisa ser de no mínimo 95 anos, enquanto a mulher precisa ter no mínimo 85 anos na soma;
Com base nas regras acima imprima na tela as mensagens:

SE a pessoa estiver aposentada: Silvana, você pode se aposentar!;
SE a pessoa NÃO estiver aposentada: Silvana, você ainda não pode se aposentar!;

 */

const m = contribuicao >= 35 && (contribuicao + idade) >= 95 && sexo == "M"
const f = contribuicao >= 30 && (contribuicao + idade) >= 85 && sexo == "F"

if(f || m) {
    console.log(`${nome}, você pode se aposentar!`)
} else {
    console.log(`${nome}, você ainda não pode se aposentar!`)
}