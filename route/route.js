const express = require('express');
const { createProject, homePage,allProjects, projectDetail,createIssue,renderCreateIssuePage, projectDetails } = require('../controllers/project');
const route = express();



route.get('/',homePage);
route.get('/create-project',allProjects)
route.post('/create',createProject)
route.get('/:projectId/projectDetails',projectDetails)
route.get('/:projectId/issue', renderCreateIssuePage);




// POST route to handle the form submission for creating an issue
route.post('/:projectId/create-issue', createIssue);








module.exports = route;