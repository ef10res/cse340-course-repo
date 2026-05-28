import express from 'express';

import { showHomePage } from './controllers/index.js';
import { showOrganizationsPage } from './controllers/organizations.js';
import { showProjectsPage, showProjectDetailsPage } from './controllers/upcoming_service_projects.js';
import { showCategoriesPage } from './controllers/categories.js';
import { testErrorPage } from './controllers/errors.js';
import { showOrganizationDetailsPage } from './controllers/organizations.js';
import { showCategoryDetailsPage } from './controllers/categories.js';
const router = express.Router();

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

export default router;