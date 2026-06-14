import db from './db.js';

const addVolunteerToProject = async (userId, projectId) => {
    const query = `
        INSERT INTO volunteer (user_id, project_id)
        VALUES($1, $2)
        ON CONFLICT(user_id, project_id) DO NOTHING
        RETURNING user_id, project_id;
    `;

    const result = await db.query(query, [userId, projectId]);

    return result.rows[0] || null;
};

const removeVolunteerFromProject = async (userId, projectId) => {
    const query = `
        DELETE FROM volunteer
        WHERE user_id = $1
            AND project_id = $2
        RETURNING user_id, project_id;
    `;

    const result = await db.query(query, [userId, projectId]);

    return result.rows[0] || null;
};

const getVolunteerProjectsByUserId = async (userId) => {
    const query = `
        SELECT
            sp.project_id,
            sp.title,
            sp.description,
            sp.location,
            sp.project_date AS date,
            o.organization_id,
            o.name AS organization_name
        FROM volunteer v
        JOIN service_project sp
            ON v.project_id = sp.project_id
        JOIN organization o
            ON sp.organization_id = o.organization_id
        WHERE v.user_id = $1
        ORDER BY sp.project_date ASC;
    `;

    const result = await db.query(query, [userId]);

    return result.rows;
};

const isUserVolunteeringForProject = async (userId, projectId) => {
    const query = `
        SELECT user_id, project_id
        FROM volunteer
        WHERE user_id = $1
            AND project_id = $2;
    `;

    const result = await db.query(query, [userId, projectId]);

    return result.rows.length > 0;
};

export {
    addVolunteerToProject,
    removeVolunteerFromProject,
    getVolunteerProjectsByUserId,
    isUserVolunteeringForProject
}