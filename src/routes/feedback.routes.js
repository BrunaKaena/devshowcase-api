const express = require('express');
const router = express.Router();
const feedbackRepository = require('../repositories/feedback.repository');
const { validateFeedbackInput } = require('../dtos/FeedbackDTO');

router.post('/', async (req, res) => {
  const error = validateFeedbackInput(req.body);
  if (error) return res.status(400).json({ error });
  
  try {
    const feedback = await feedbackRepository.create(req.body);
    res.status(201).json({ mensagem: 'Feedback cadastrado com sucesso!', feedback });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/project/:projectId', async (req, res) => {
  const data = { ...req.body, projectId: Number(req.params.projectId) };
  const error = validateFeedbackInput(data);
  if (error) return res.status(400).json({ error });
  
  try {
    const feedback = await feedbackRepository.create(data);
    res.status(201).json({ mensagem: 'Feedback cadastrado com sucesso!', feedback });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/project/:projectId', async (req, res) => {
  try {
    const feedbacks = await feedbackRepository.findByProjectId(Number(req.params.projectId));
    res.json(feedbacks);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;