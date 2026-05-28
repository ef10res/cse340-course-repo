import db from './db.js'

const getAllCategories = async () => {
    const query = `
        SELECT category_id, name
      FROM public.category;
    `;

    const result = await db.query(query);

    return result.rows;
}

const getCategoryById = async (id) => {
  const query = `
        SELECT
            category_id,
            name
        FROM category
        WHERE category_id = $1;
    `;

  const result = await db.query(query, [id]);

  return result.rows[0];
};

export { getAllCategories, getCategoryById };