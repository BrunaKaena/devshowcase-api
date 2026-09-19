const express = require('express');

const profileRoutes = require('./src/routes/profile.routes');
const technologyRoutes = require('./src/routes/technology.routes');
const projectRoutes = require('./src/routes/project.routes');
const feedbackRoutes = require('./src/routes/feedback.routes');

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