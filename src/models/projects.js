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

const getProjectsByOrganizationId = async (organizationId) => {
    const query = `
        SELECT
          project_id,
          organization_id,
          title,
          description,
          location,
          project_date
        FROM service_project
        WHERE organization_id = $1
        ORDER BY project_date;
      `;

    const queryParams = [organizationId];
    const result = await db.query(query, queryParams);

    return result.rows;
};

const getUpcomingProjects = async (number_of_projects) => {
    const query = `
        SELECT
            sp.project_id,
            sp.title,
            sp.description,
            sp.project_date AS date,
            sp.location,
            sp.organization_id,
            o.name AS organization_name
        FROM service_project sp
        JOIN organization o
            ON sp.organization_id = o.organization_id
        ORDER BY sp.project_date ASC
        LIMIT $1;
    `;

    const result = await db.query(query, [number_of_projects]);

    return result.rows;
};

const getProjectDetails = async (id) => {
    const query = `
        SELECT
            sp.project_id,
            sp.title,
            sp.description,
            sp.project_date AS date,
            sp.location,
            sp.organization_id,
            o.name AS organization_name
        FROM service_project sp
        JOIN organization o
            ON sp.organization_id = o.organization_id
        WHERE sp.project_id = $1;
    `;

    const result = await db.query(query, [id]);

    return result.rows[0];
};

const getCategoriesByProjectId = async (projectId) => {
    const query = `
        SELECT
            c.category_id,
            c.name
        FROM category c
        JOIN project_category pc
            ON c.category_id = pc.category_id
        WHERE pc.project_id = $1
        ORDER BY c.name;
    `;

    const result = await db.query(query, [projectId]);

    return result.rows;
};


const getProjectsByCategoryId = async (categoryId) => {
    const query = `
        SELECT
            sp.project_id,
            sp.title,
            sp.description,
            sp.project_date AS date,
            sp.location,
            sp.organization_id,
            o.name AS organization_name
        FROM service_project sp
        JOIN project_category pc
            ON sp.project_id = pc.project_id
        JOIN category c
            ON pc.category_id = c.category_id
        JOIN organization o
            ON sp.organization_id = o.organization_id
        WHERE c.category_id = $1
        ORDER BY sp.project_date ASC;
    `;

    const result = await db.query(query, [categoryId]);

    return result.rows;
};

// Export the model functions
export { getProjectsByOrganizationId, getUpcomingProjects, getProjectDetails, getCategoriesByProjectId, getProjectsByCategoryId };

