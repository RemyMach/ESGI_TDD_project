const express = require('express');
const router = new express.Router();

const projectCtrl = require('../controllers/project.js');

router.post('/', projectCtrl.createProject);

router.put('/:id', projectCtrl.modifyProject);

router.delete('/:id', projectCtrl.deleteProject);

router.get('/:id', projectCtrl.getOneProject);

router.get('/', projectCtrl.getAllProjects);


module.exports = router;