const express = require('express');
const profileRoutes = require('./routes/profile.routes');
const technologyRoutes = require('./routes/technology.routes');
const projectRoutes = require('./routes/project.routes');
const feedbackRoutes = require('./routes/feedback.routes');

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/api/profiles', profileRoutes);
app.use('/api/technologies', technologyRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/feedbacks', feedbackRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});