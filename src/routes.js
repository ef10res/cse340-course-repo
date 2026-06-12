import express from 'express';

import { showHomePage } from './controllers/index.js';
import { showOrganizationsPage } from './controllers/organizations.js';
import { showProjectsPage, showProjectDetailsPage } from './controllers/upcoming_service_projects.js';
import {
    showCategoriesPage, showAssignCategoriesForm, processAssignCategoriesForm,
    categoryValidationRules, showNewCategoryForm, processNewCategoryForm, showEditCategoryForm, processEditCategoryForm
 } from './controllers/categories.js';
import { testErrorPage } from './controllers/errors.js';
import { showOrganizationDetailsPage, showNewOrganizationForm, processNewOrganizationForm, organizationValidation, showEditOrganizationForm, processEditOrganizationForm } from './controllers/organizations.js';
import { showCategoryDetailsPage } from './controllers/categories.js';
import { processNewProjectForm, showNewProjectForm, projectValidation } from './controllers/upcoming_service_projects.js';
const router = express.Router();
import { showEditProjectForm, processEditProjectForm } from './controllers/upcoming_service_projects.js';
import { showUserRegistrationForm, processUserRegistrationForm, showLoginForm, processLoginForm, processLogout, requireLogin, showDashboard } from './controllers/users.js';

router.get('/', showHomePage);
router.get('/organizations', showOrganizationsPage);
router.get('/projects', showProjectsPage);
router.get('/categories', showCategoriesPage);
router.get('/project/:id', showProjectDetailsPage);
// Route for organization details page
router.get('/organization/:id', showOrganizationDetailsPage);
router.get('/category/:id', showCategoryDetailsPage);
// error-handling routes
router.get('/test-error', testErrorPage);
// Route for new organization page
router.get('/new-organization', showNewOrganizationForm);
// Route to handle new organization form submission
router.post('/new-organization', organizationValidation, processNewOrganizationForm);
// Route to display the edit organization form
router.get('/edit-organization/:id', showEditOrganizationForm);
// Route to handle the edit organization form submission
router.post('/edit-organization/:id',organizationValidation, processEditOrganizationForm);
// Route for new project page
router.get('/new-project', showNewProjectForm);
// Route to handle new project form submission
router.post('/new-project', projectValidation, processNewProjectForm);
// Routes to handle the assign categories to project form
router.get('/assign-categories/:projectId', showAssignCategoriesForm);
router.post('/assign-categories/:projectId', processAssignCategoriesForm);
router.get('/edit-project/:id', showEditProjectForm);
router.post('/edit-project/:id', processEditProjectForm);
router.get('/new-category', showNewCategoryForm)
router.post(
    '/new-category',
    categoryValidationRules,
    processNewCategoryForm
);
router.get('/edit-category/:id', showEditCategoryForm);
router.post(
    '/edit-category/:id',
    categoryValidationRules,
    processEditCategoryForm
);
// User registration routes
router.get('/register', showUserRegistrationForm);
router.post('/register', processUserRegistrationForm);
// User login routes
router.get('/login', showLoginForm);
router.post('/login', processLoginForm);
router.get('/logout', processLogout);
// Protected dashboard route
router.get('/dashboard', requireLogin, showDashboard);

export default router;