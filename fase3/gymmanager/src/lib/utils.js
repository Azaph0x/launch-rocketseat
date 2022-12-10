module.exports = {
    age(timestamp) {
        const today = new Date();
        const birthDate = new Date  (timestamp);
        //20 | 2022 - 2002
        let age = today.getFullYear() - birthDate.getFullYear()
        // 8 | 11 - 03 (mes atual, mes de nascimento)
        let month = today.getMonth() - birthDate.getMonth()
    
        //usei o getDate por conta do getDay era ruim para realizar o calculo
        if(month < 0 || month == 0 && today.getDate() < birthDate.getDate()) {
            age = age - 1
             // se n passou ele ira remover um ano, pois a pessoa ainda n fez aniversario
        }
    
        return age
    },
    date(timestamp) {
        const date = new Date(timestamp)

        const year = date.getUTCFullYear()
        const month = `0${date.getUTCMonth() + 1}`.slice(-2)
        const day = `0${date.getUTCDate()}`.slice(-2)

        return {
            month,
            year,
            day,
            iso: `${year}-${month}-${day}`,
            birthDay: `${day}/${month}`,
            format: `${day}/${month}/${year}`
        } // returno estilo ISO
    }
}
