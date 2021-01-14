const Project = require('../models/project.js');

exports.createProject = (req, res, next) => {
    delete req.body._id;
    const project = new Project({
      ...req.body
  });
  project.save()
  .then(() => res.status(201).json({ message: 'Objets enregistré !'}))
  .catch(error => res.status(400).json({ error }));
};

exports.modifyProject = (req, res, next) => {
    Project.updateOne({ _id: req.params.id }, {...req.body, _id: req.params.id })
        .then(() => res.status(200).json({ message: "Objet modifié !"}))
        .catch(error => res.status(404).json({ error }));
};

exports.deleteProject = (req, res, next) => {
    Project.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
        .catch(error => res.status(404).json({ error }));
};

exports.getOneProject = (req, res, next) => {
    Project.findOne({ _id: req.params.id })
        .then(thing => res.status(200).json(thing))
        .catch(error => res.status(404).json({ error }));
};

exports.getAllProjects = (req, res, next) => {
    Project.find()
        .then(things => res.status(200).json(things))
        .catch(error => res.status(400).json({ error}));
};
