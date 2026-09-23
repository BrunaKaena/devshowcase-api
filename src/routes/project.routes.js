const express = require('express');
const controller = require('../controllers/project.controller');
const router = express.Router();

router.get('/', controller.list);
router.post('/', controller.create);
router.post('/:id/feedbacks', controller.feedback);
router.put('/:id/upvote', controller.upvote);

module.exports = router;