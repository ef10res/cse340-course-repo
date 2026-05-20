import db from './db.js'

    // Get all projects with organization name
export async function getAllProjects() {
    try {
        const query = `
            SELECT 
                sp.project_id,
                sp.title,
                sp.description,
                sp.location,
                sp.project_date,
                o.organization_id,
                o.name AS organization_name
            FROM service_project sp
            JOIN organization o
                ON sp.organization_id = o.organization_id
            ORDER BY sp.project_date;
        `;

        const result = await db.query(query);
        return result.rows;

    } catch (error) {
        console.error("Error fetching projects:", error.message);
        throw error;
    }
}

