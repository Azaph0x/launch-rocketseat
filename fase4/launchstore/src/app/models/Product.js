const Base = require('./Base')
const db = require('../../config/db')

Base.init({ table: 'products'})

module.exports = {
    ...Base,
    async files(id) {
        const results = await db.query(
            `SELECT * FROM files WHERE product_id = $1`,
             [id])
        return results.rows
    },
    async search({ filter, category }) {

        let query = `
          SELECT products.*,
          categories.name AS category_name
          FROM products
          LEFT JOIN categories ON (categories.id = products.category_id)
          WHERE 1 = 1`; // Utilizando o WHERE 1 = 1, para burlar a utilizacao do where = a categoria e tals, assim monstrando sempres os produtos
    
        if (category) {
          query += `
            AND products.category_id = ${category}`;
        } // adicionar a categoria
    
        if (filter) {
          query += `
            AND (products.name ILIKE '%${filter}%'
            OR products.description ILIKE '%${filter}%')`;
        } // forcando com () o name ou description conter umas das char
    
        query += 'AND status != 0'; // remover produtos indisponiveis
    
        const results = await db.query(query);
        return results.rows;
      }
}