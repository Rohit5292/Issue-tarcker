const Project = require('../models/project');
const Issue = require('../models/issue')
const mongoose = require('mongoose')

module.exports.homePage = async (req, res, next) => {
  try {
    const projects = await Project.find({});
    return res.render('home', { projects: projects });
  } catch (error) {
    console.log(error + "error while fetching projects");
  }
};


module.exports.createProject = async (req, res, next) => {
  try {
    await Project.create({
      name: req.body.name,
      description: req.body.description,
      author: req.body.author
    });

    res.redirect('/'); // Optional: Send a response to the client
  } catch (error) {
    console.log('Error in creating project:', error);
    return res.status(500).send('Internal Server Error'); // Optional: Send an error response to the client
  }
};

module.exports.allProjects = (req,res,next)=>
{
    return res.render('createproject');
}
module.exports.createIssue = async (req, res) => {
  try {
    const projectId = req.params.projectId;
    const { title, description, labels, author } = req.body;

    // Create new issue in the database for the specified project
    const issue = await Issue.create({
      projectId,
      title,
      description,
      labels,
      author
    });

    console.log(projectId);

    // Redirect the user back to the Project Detail Page
    res.redirect(`/${projectId}/projectDetails`);
  } catch (error) {
    console.log('Error in creating issue:', error);
    res.redirect(`/project/${projectId}/projectDetails`);
  }
};


module.exports.renderCreateIssuePage = async (req, res) => {
  try {
    console.log(req.params.projectId);
    const projectId = req.params.projectId;

    // Validate if `projectId` is a valid ObjectId
    if (!mongoose.isValidObjectId(projectId)) {
      throw new Error('Invalid projectId');
    }

    // Retrieve the project details from the database
    const project = await Project.findById(projectId);

    if (!project) {
      throw new Error('Project not found');
    }

    // Render the Create Issue page with the project details
    res.render('createissue', { project: project });
  } catch (error) {
    console.log('Error in rendering Create Issue page:', error);
    return res.status(500).send('Internal Server Error');
  }
};
// Assuming you have the necessary imports and database setup
module.exports.projectDetails = async (req, res) => {
  try {
    console.log(req.params.projectId);
    const projectId = req.params.projectId;

    // Validate if `projectId` is a valid ObjectId
    if (!mongoose.isValidObjectId(projectId)) {
      throw new Error('Invalid projectId');
    }

    // Retrieve the project details from the database
    const project = await Project.findById(projectId);

    if (!project) {
      throw new Error('Project not found');
    }

    // Retrieve the issues related to the project from the database
    const issues = await Issue.find({ projectId: projectId });
    console.log(issues);
    // const issues = await Issue.find({ projectId: projectId });
    // console.log(issues);

    // Render the Project Details page with the project details and issues
    return res.render('projectDetails', { issue: issues, projects: project });
  } catch (error) {
    console.log('Error in rendering Project Details page:', error);
    return res.status(500).send('Internal Server Error');
  }
};
















