const express = require('express');
const router = express.Router();

const projectRepository = require('../repositories/project.repository');
const { validateProjectInput } = require('../dtos/project.dto');

router.post('/', async (req, res) => {
  try {
    const error = validateProjectInput(req.body);
    if (error) {
      return res.status(400).json({ erro: error });
    }

    const project = await projectRepository.create({
      title: req.body.title,
      description: req.body.description,
      repositoryUrl: req.body.repositoryUrl,
      profileId: req.body.profileId,
      technologyIds: req.body.technologyIds
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

router.get('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      return res.status(400).json({ erro: 'O ID deve ser um número.' });
    }
    const project = await projectRepository.findById(id);
    if (!project) {
      return res.status(404).json({ erro: 'Projeto não encontrado!' });
    }
    return res.status(200).json(project);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: 'Erro interno ao buscar o projeto.' });
  }
});

router.get('/', async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const technology = req.query.technology || null;
    const result = await projectRepository.findAll({ page, limit, technology });
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: 'Erro interno ao buscar os projetos.' });
  }
});

module.exports = router;