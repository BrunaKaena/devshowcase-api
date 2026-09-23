const express = require('express');
const router = express.Router();
const profileRepository = require('../repositories/profile.repository');
const { validateProfileInput } = require('../dtos/profile.dto');

/**
 * @swagger
 * tags:
 * - name: Profiles
 * description: Gerenciamento de perfis
 */

/**
 * @swagger
 * /api/profiles:
 * post:
 * summary: Cria um novo perfil
 * tags: [Profiles]
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * name:
 * type: string
 * email:
 * type: string
 * bio:
 * type: string
 * responses:
 * 201:
 * description: Perfil criado
 * get:
 * summary: Lista perfis (se tiver rota de listagem)
 * tags: [Profiles]
 * responses:
 * 200:
 * description: OK
 */

/**
 * @swagger
 * /api/profiles/{id}:
 * get:
 * summary: Busca perfil por ID
 * tags: [Profiles]
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: integer
 * responses:
 * 200:
 * description: Perfil encontrado
 * 404:
 * description: Não encontrado
 */

router.post('/', async (req, res) => {
  try {
    const error = validateProfileInput(req.body);
    if (error) {
      return res.status(400).json({ erro: error });
    }
    const profile = await profileRepository.create({
      name: req.body.name,
      email: req.body.email,
      bio: req.body.bio || null
    });
    return res.status(201).json({
      mensagem: 'Perfil cadastrado com sucesso!',
      profile
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      erro: 'Erro interno ao cadastrar o perfil.'
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      return res.status(400).json({ erro: 'O ID deve ser um número.' });
    }
    const profile = await profileRepository.findById(id);
    if (!profile) {
      return res.status(404).json({ erro: 'Perfil não encontrado!' });
    }
    return res.status(200).json(profile);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: 'Erro interno ao buscar o perfil.' });
  }
});

module.exports = router;