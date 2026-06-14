import { addVolunteerToProject, removeVolunteerFromProject } from "../models/volunteers.js";

const volunteerForProject = async (req, res) => {
    try {
        const userId = req.session.user?.user_id;
        const projectId = req.params.id;

        // Ensure user is logged in
        if (!userId) {
            req.flash('error', 'You must be logged in to volunteer.');
            return req.session.save(() => {
                res.redirect('/login');
            });
        }

        // Add the volunteer to the project
        await addVolunteerToProject(userId, projectId);

        // Success flash message
        req.flash('success', 'You are now volunteering for this project!');

        // Save session before redirect to prevent race conditions
        req.session.save(() => {
            res.redirect(`/project/${projectId}`);
        });

    } catch (error) {
        console.error('Error volunteering for project:', error);
        req.flash('error', 'Unable to process your request at this time.');

        req.session.save(() => {
            res.redirect('back'); // Redirect back to the previous page
        });
    }
};

const removeVolunteerFromProjectController = async (req, res) => {
    const userId = req.session.user.user_id;
    const projectId = req.params.id;

    await removeVolunteerFromProject(userId, projectId);

    req.flash('success', 'You have been removed as a volunteer for this project.');

    res.redirect(req.get('Referer') || '/dashboard');
};

export {
    volunteerForProject,
    removeVolunteerFromProjectController
};