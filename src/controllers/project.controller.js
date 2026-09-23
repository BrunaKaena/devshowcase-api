// Controller final - BRUNA KAENA DA SILVA PEREIRA e VANESSA MARIA OLIVEIRA GUIMARAES
let projects = [
  { 
    id: 1, 
    title: "Portfolio DevShowcase", 
    description: "Projeto Etapa Final - BRUNA KAENA DA SILVA PEREIRA", 
    profileId: 1, 
    technologies: ["Node.js", "Express"], 
    stars: 0, 
    ratingAverage: 0,
    feedbacks: [] 
  }
];

exports.list = (req, res) => {
  let result = [...projects];
  const { technology, page = 1, limit = 10 } = req.query;

  // FILTRO POR TECNOLOGIA
  if (technology) {
    result = result.filter(p => 
      p.technologies.some(t => t.toLowerCase().includes(technology.toLowerCase()))
    );
  }

  // PAGINACAO
  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);
  const start = (pageNum - 1) * limitNum;
  const paginated = result.slice(start, start + limitNum);

  return res.json({
    total: result.length,
    page: pageNum,
    limit: limitNum,
    data: paginated,
    grupo: "BRUNA KAENA DA SILVA PEREIRA e VANESSA MARIA OLIVEIRA GUIMARAES"
  });
};

exports.feedback = (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const project = projects.find(p => p.id === id);

    if (!project) {
      const err = new Error("Projeto nao encontrado - BRUNA KAENA DA SILVA PEREIRA");
      err.status = 404;
      throw err;
    }

    const { rating, comment } = req.body;

    // VALIDACAO NOTA 1 A 5 - VAI GERAR O 400 PRO VIDEO
    if (!rating || rating < 1 || rating > 5) {
      const err = new Error("Nota deve ser entre 1 e 5 - BRUNA KAENA DA SILVA PEREIRA");
      err.status = 400;
      throw err;
    }

    const newFeedback = { rating, comment, createdAt: new Date() };
    project.feedbacks.push(newFeedback);

    // CALCULA MEDIA AUTOMATICA
    const sum = project.feedbacks.reduce((acc, f) => acc + f.rating, 0);
    project.ratingAverage = parseFloat((sum / project.feedbacks.length).toFixed(2));

    return res.status(201).json({
      mensagem: "Feedback criado com sucesso - BRUNA KAENA DA SILVA PEREIRA e VANESSA MARIA OLIVEIRA GUIMARAES",
      project
    });

  } catch (err) {
    next(err);
  }
};

exports.upvote = (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const project = projects.find(p => p.id === id);

    if (!project) {
      const err = new Error("Projeto nao encontrado");
      err.status = 404;
      throw err;
    }

    project.stars += 1;

    return res.json({
      mensagem: "Upvote +1 realizado - VANESSA MARIA OLIVEIRA GUIMARAES",
      stars: project.stars,
      project
    });
  } catch (err) {
    next(err);
  }
};

// Mantem os antigos se tiver
exports.create = (req, res) => {
  const newProj = { id: projects.length + 1, stars: 0, ratingAverage: 0, feedbacks: [], ...req.body };
  projects.push(newProj);
  return res.status(201).json(newProj);
};