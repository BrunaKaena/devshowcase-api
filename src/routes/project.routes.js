const express = require('express');
const router = express.Router();

const projectRepository = require('../repositories/project.repository');
const technologyRepository = require('../repositories/technology.repository');
const { validateProjectInput } = require('../dtos/project.dto');

router.post('/', async (req, res) => {
  try {
    const error = validateProjectInput(req.body);

    if (error) {
      return res.status(400).json({ erro: error });
    }

    const technologyIds = Array.isArray(req.body.technologyIds)
      ? req.body.technologyIds.map(Number)
      : [];

    for (const id of technologyIds) {
      const technology = await technologyRepository.findById(id);

      if (!technology) {
        return res.status(404).json({
          erro: `Tecnologia com ID ${id} não encontrada.`
        });
      }
    }

    const project = await projectRepository.create({
      title: req.body.title,
      description: req.body.description,
      repositoryUrl: req.body.repositoryUrl,
      profileId: Number(req.body.profileId),
      technologyIds
    });

    return res.status(201).json({
      mensagem: 'Projeto cadastrado com sucesso!',
      project
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      erro: 'Erro interno ao cadastrar o projeto.'
    });
  }
});

router.get('/', async (req, res) => {
  try {
    const projects = await projectRepository.findAll();

    return res.status(200).json(projects);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      erro: 'Erro interno ao buscar os projetos.'
    });
  }
});

module.exports = router;