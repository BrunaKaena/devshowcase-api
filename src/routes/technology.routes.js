const express = require('express');
const router = express.Router();

const technologyRepository = require('../repositories/technology.repository');
const { validateTechnologyInput } = require('../dtos/technology.dto');

router.post('/', async (req, res) => {
  try {
    const error = validateTechnologyInput(req.body);

    if (error) {
      return res.status(400).json({ erro: error });
    }

    const technology = await technologyRepository.create({
      name: req.body.name
    });

    return res.status(201).json({
      mensagem: 'Tecnologia cadastrada com sucesso!',
      technology
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      erro: 'Erro interno ao cadastrar a tecnologia.'
    });
  }
});

router.get('/', async (req, res) => {
  try {
    const technologies = await technologyRepository.findAll();

    return res.status(200).json(technologies);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      erro: 'Erro interno ao buscar as tecnologias.'
    });
  }
});

module.exports = router;