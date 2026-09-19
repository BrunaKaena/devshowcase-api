const express = require('express');
const router = express.Router();

const feedbackRepository = require('../repositories/feedback.repository');

router.post('/', async (req, res) => {
  try {
    const { comment, author, projectId } = req.body;

    if (!comment || comment.trim() === '') {
      return res.status(400).json({
        erro: 'O comentário é obrigatório.'
      });
    }

    if (!author || author.trim() === '') {
      return res.status(400).json({
        erro: 'O autor é obrigatório.'
      });
    }

    if (!projectId || !Number.isInteger(Number(projectId))) {
      return res.status(400).json({
        erro: 'O ID do projeto deve ser um número.'
      });
    }

    const feedback = await feedbackRepository.create({
      comment,
      author,
      projectId: Number(projectId)
    });

    return res.status(201).json({
      mensagem: 'Feedback cadastrado com sucesso!',
      feedback
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      erro: 'Erro interno ao cadastrar o feedback.'
    });
  }
});

router.get('/project/:projectId', async (req, res) => {
  try {
    const projectId = Number(req.params.projectId);

    if (!Number.isInteger(projectId)) {
      return res.status(400).json({
        erro: 'O ID do projeto deve ser um número.'
      });
    }

    const feedbacks = await feedbackRepository.findByProjectId(projectId);

    return res.status(200).json(feedbacks);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      erro: 'Erro interno ao buscar os feedbacks.'
    });
  }
});

module.exports = router;