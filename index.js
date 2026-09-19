const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// --- BANCO DE DADOS EM MEMÓRIA (Arrays) ---
let profiles = [];
let technologies = [];
let projects = [];
let feedbacks = [];

// --- 1. ROTAS DE PERFIS (Profile) ---

// Cadastrar Perfil (POST /api/profiles)
app.post('/api/profiles', (req, res) => {
    const { name, email, bio } = req.body;
    
    // Validação básica
    if (!name || !email) {
        return res.status(400).json({ erro: "Nome e email são obrigatórios!" });
    }

    const newProfile = {
        id: profiles.length + 1,
        name,
        email,
        bio: bio || ""
    };

    profiles.push(newProfile);
    return res.status(201).json({ mensagem: "Perfil cadastrado com sucesso!", profile: newProfile });
});

// Buscar Perfil por ID (GET /api/profiles/{id})
app.get('/api/profiles/:id', (req, res) => {
    const profileId = parseInt(req.params.id);
    const profile = profiles.find(p => p.id === profileId);

    if (!profile) {
        return res.status(404).json({ erro: "Perfil não encontrado!" });
    }

    return res.json(profile);
});


// --- 2. ROTAS DE TECNOLOGIAS (Technology) ---

// Cadastrar Tecnologia (POST /api/technologies)
app.post('/api/technologies', (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ erro: "O nome da tecnologia é obrigatório!" });
    }

    const newTech = {
        id: technologies.length + 1,
        name
    };

    technologies.push(newTech);
    return res.status(201).json({ mensagem: "Tecnologia cadastrada com sucesso!", technology: newTech });
});

// Listar todas as tecnologias (GET /api/technologies)
app.get('/api/technologies', (req, res) => {
    return res.json(technologies);
});


// --- 3. ROTAS DE PROJETOS (Project) ---

// Cadastrar Projeto (POST /api/projects)
app.post('/api/projects', (req, res) => {
    const { title, description, repositoryUrl, profileId, technologyIds } = req.body;

    // Validações
    if (!title || !repositoryUrl || !profileId) {
        return res.status(400).json({ erro: "Título, URL do repositório e ID do perfil são obrigatórios!" });
    }

    // Verificar se o perfil existe
    const profileExists = profiles.find(p => p.id === profileId);
    if (!profileExists) {
        return res.status(404).json({ erro: "Perfil associado não encontrado!" });
    }

    const newProject = {
        id: projects.length + 1,
        title,
        description: description || "",
        repositoryUrl,
        profileId,
        technologyIds: technologyIds || [] // Relacionamento N:N com tecnologias
    };

    projects.push(newProject);
    return res.status(201).json({ mensagem: "Projeto cadastrado com sucesso!", project: newProject });
});

// Listar projetos (GET /api/projects)
app.get('/api/projects', (req, res) => {
    return res.json(projects);
});


// --- 4. ROTA DE FEEDBACK (Opcional extra para complementar o 1:N de Feedback) ---
app.post('/api/projects/:id/feedbacks', (req, res) => {
    const projectId = parseInt(req.params.id);
    const { comment, author } = req.body;

    const project = projects.find(p => p.id === projectId);
    if (!project) {
        return res.status(404).json({ erro: "Projeto não encontrado!" });
    }

    const newFeedback = {
        id: feedbacks.length + 1,
        projectId,
        comment,
        author: author || "Anônimo"
    };

    feedbacks.push(newFeedback);
    return res.status(201).json({ mensagem: "Feedback adicionado!", feedback: newFeedback });
});


// --- INICIALIZAÇÃO DO SERVIDOR ---
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});