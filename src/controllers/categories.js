import { getProjectsByCategoryId, getProjectDetails, getCategoriesByProjectId } from '../models/projects.js';
import { getAllCategories, getCategoryById, updateCategoryAssignments, createCategory, updateCategory } from '../models/categories.js';
import { body, validationResult } from 'express-validator';

const showCategoriesPage = async (req, res) => {
    const categories = await getAllCategories();
    const title = 'Our Service Categories'

    res.render('categories', { title, categories });
};

const showCategoryDetailsPage = async (req, res) => {
    const id = req.params.id;

    const category = await getCategoryById(id);
    const projects = await getProjectsByCategoryId(id);

    res.render('category', {
        title: category.name,
        category,
        projects
    });
};

const showAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.projectId;

    const projectDetails = await getProjectDetails(projectId);
    const categories = await getAllCategories();
    const assignedCategories = await getCategoriesByProjectId(projectId);

    const title = 'Assign Categories to Project';

    res.render('assign-categories', { title, projectId, projectDetails, categories, assignedCategories });
};

const processAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.projectId;
    const selectedCategoryIds = req.body.categoryIds || [];

    // Ensure selectedCategoryIds is an array
    const categoryIdsArray = Array.isArray(selectedCategoryIds) ? selectedCategoryIds : [selectedCategoryIds];
    await updateCategoryAssignments(projectId, categoryIdsArray);
    req.flash('success', 'Categories updated successfully.');
    res.redirect(`/project/${projectId}`);
};

const categoryValidationRules = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Category name is required.')
        .isLength({ min: 3, max: 100 })
        .withMessage('Category name must be between 3 and 100 characters.')
];

const showNewCategoryForm = (req, res) => {
    res.render('new-category', {
        title: 'Create New Category',
        errors: [],
        formData: {}
    });
};

const processNewCategoryForm = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).render('new-category', {
            title: 'Create New Category',
            errors: errors.array(),
            formData: req.body
        });
    }

    const { name } = req.body;

    const categoryId = await createCategory(name);

    req.flash('success', 'Category created successfully!');

    res.redirect(`/category/${categoryId}`);
};

const showEditCategoryForm = async (req, res) => {
    const id = req.params.id;

    const category = await getCategoryById(id);

    res.render('edit-category', {
        title: 'Edit Category',
        category,
        errors: []
    });
};

const processEditCategoryForm = async (req, res) => {
    const id = req.params.id;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).render('edit-category', {
            title: 'Edit Category',
            category: {
                category_id: id,
                name: req.body.name
            },
            errors: errors.array()
        });
    }

    const { name } = req.body;

    await updateCategory(id, name);

    req.flash('success', 'Category updated successfully!');

    res.redirect(`/category/${id}`);
};

export {
    showCategoriesPage, showCategoryDetailsPage, showAssignCategoriesForm, processAssignCategoriesForm,
    categoryValidationRules, showNewCategoryForm, processNewCategoryForm, showEditCategoryForm, processEditCategoryForm
 };