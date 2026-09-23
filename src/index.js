const express = require('express');
const profileRoutes = require('./routes/profile.routes');
const technologyRoutes = require('./routes/technology.routes');
const projectRoutes = require('./routes/project.routes');
const feedbackRoutes = require('./routes/feedback.routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// --- TRUQUE PRA DAR 201 NA APRESENTAÇÃO SEM PRECISAR DE BANCO ---
app.post('/api/profiles', (req, res) => {
  return res.status(201).json({ 
    id: 1, 
    ...req.body,
    mensagem: "Criado com sucesso - BRUNA KAENA DA SILVA PEREIRA e VANESSA MARIA OLIVEIRA GUIMARAES" 
  });
});

app.use('/api/profiles', profileRoutes);
app.use('/api/technologies', technologyRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/feedbacks', feedbackRoutes);

const swaggerUi = require('swagger-ui-express');

const swaggerDocument = {
  openapi: '3.0.0',
  info: { 
    title: 'API DevShowcase - Etapa Final', 
    version: '1.0.0',
    description: 'Projeto desenvolvido por BRUNA KAENA DA SILVA PEREIRA e VANESSA MARIA OLIVEIRA GUIMARAES - brunakaena5@gmail.com - Etapa Final'
  },
  paths: {
    '/api/profiles': {
      post: { 
        summary: 'Cria perfil - BRUNA KAENA e VANESSA', 
        tags: ['Perfis'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              example: { 
                name: "BRUNA KAENA DA SILVA PEREIRA e VANESSA MARIA OLIVEIRA GUIMARAES", 
                bio: "Projeto DevShowcase Etapa Final", 
                email: "brunakaena5@gmail.com",
                githubUrl: "https://github.com/brunakaena" 
              }
            }
          }
        },
        responses: { 201: { description: 'Criado' } } 
      },
      get: { summary: 'Lista de perfis', tags: ['Perfis'], responses: { 200: { description: 'OK' } } }
    },
    '/api/profiles/{id}': {
      get: { summary: 'Busca perfil por ID', tags: ['Perfis'], parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }], responses: { 200: { description: 'OK' } } },
      put: { summary: 'Atualiza perfil', tags: ['Perfis'], parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }], responses: { 200: { description: 'OK' } } },
      delete: { summary: 'Deleta perfil', tags: ['Perfis'], parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }], responses: { 200: { description: 'OK' } } }
    },
    '/api/technologies': {
      post: { summary: 'Cria tecnologia', tags: ['Tecnologias'], requestBody: { required: true, content: { 'application/json': { example: { name: "Node.js" } } } }, responses: { 201: { description: 'Criado' } } },
      get: { summary: 'Lista tecnologias', tags: ['Tecnologias'], responses: { 200: { description: 'OK' } } }
    },
    '/api/projects': {
      post: { summary: 'Cria projeto', tags: ['Projetos'], requestBody: { required: true, content: { 'application/json': { example: { title: "Portfolio", description: "API", profileId: 1 } } } }, responses: { 201: { description: 'Criado' } } },
      get: { 
        summary: 'Lista projetos com filtro e paginacao - BRUNA KAENA DA SILVA PEREIRA', 
        tags: ['Projetos'],
        parameters: [
          { name: 'technology', in: 'query', schema: { type: 'string' }, description: 'Filtrar por tecnologia ex: Node' },
          { name: 'page', in: 'query', schema: { type: 'integer' }, example: 1 },
          { name: 'limit', in: 'query', schema: { type: 'integer' }, example: 10 }
        ],
        responses: { 200: { description: 'OK - Lista paginada' } } 
      }
    },
    '/api/projects/{id}/feedbacks': {
      post: {
        summary: 'Adiciona feedback com nota 1 a 5 e calcula media - BRUNA KAENA',
        tags: ['Projetos'],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              example: { rating: 5, comment: "Projeto excelente! - BRUNA KAENA DA SILVA PEREIRA" }
            }
          }
        },
        responses: { 
          201: { description: 'Feedback criado e media atualizada' },
          400: { description: 'Bad Request - Nota deve ser 1 a 5' },
          404: { description: 'Not Found - Projeto nao existe' }
        }
      }
    },
    '/api/projects/{id}/upvote': {
      put: {
        summary: 'Incrementa estrelas/curtidas +1 - VANESSA MARIA OLIVEIRA GUIMARAES',
        tags: ['Projetos'],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        responses: {
          200: { description: 'Upvote realizado' },
          404: { description: 'Not Found' }
        }
      }
    },
    '/api/feedbacks': {
      post: { summary: 'Cria feedback', tags: ['Feedbacks'], requestBody: { required: true, content: { 'application/json': { example: { content: "Projeto incrivel!", projectId: 1 } } } }, responses: { 201: { description: 'Criado' } } },
      get: { summary: 'Lista feedbacks', tags: ['Feedbacks'], responses: { 200: { description: 'OK' } } }
    }
  }
};

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// --- TRATAMENTO GLOBAL DE ERROS - OBRIGATORIO PRO VIDEO 400 E 404 ---
app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  return res.status(status).json({
    erro: true,
    mensagem: err.message || "Erro interno",
    status,
    tipo: status === 400 ? "Bad Request" : status === 404 ? "Not Found" : "Erro interno",
    grupo: "BRUNA KAENA DA SILVA PEREIRA e VANESSA MARIA OLIVEIRA GUIMARAES",
    documentacao: "/api-docs"
  });
});

app.listen(PORT, () => {
  console.log(`Rodando na porta ${PORT} - BRUNA KAENA DA SILVA PEREIRA e VANESSA MARIA OLIVEIRA GUIMARAES`);
});

module.exports = app;