// Service Layer - BRUNA KAENA DA SILVA PEREIRA e VANESSA MARIA OLIVEIRA GUIMARAES
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function getProjects({ technology, page, limit }) {
  const skip = (page - 1) * limit;
  const where = technology ? {
    technologies: { some: { name: { contains: technology, mode: 'insensitive' } } }
  } : {};
  
  const [projects, total] = await Promise.all([
    prisma.project.findMany({ where, skip, take: Number(limit), include: { technologies: true } }),
    prisma.project.count({ where })
  ]);
  return { data: projects, total, page, limit };
}

async function addFeedback(projectId, { rating, comment }) {
  if (!rating || rating < 1 || rating > 5) {
    const e = new Error("Nota deve ser de 1 a 5");
    e.status = 400; throw e;
  }
  const project = await prisma.project.findUnique({ where: { id: Number(projectId) } });
  if (!project) { const e = new Error("Projeto nao encontrado"); e.status = 404; throw e; }

  await prisma.feedback.create({ data: { projectId: Number(projectId), rating, comment } });
  
  const feedbacks = await prisma.feedback.findMany({ where: { projectId: Number(projectId) } });
  const avg = feedbacks.reduce((s, f) => s + f.rating, 0) / feedbacks.length;
  
  const updated = await prisma.project.update({ 
    where: { id: Number(projectId) }, 
    data: { averageRating: avg } 
  });
  return updated;
}

async function upvote(projectId) {
  const project = await prisma.project.findUnique({ where: { id: Number(projectId) } });
  if (!project) { const e = new Error("Projeto nao encontrado"); e.status = 404; throw e; }
  
  return await prisma.project.update({
    where: { id: Number(projectId) },
    data: { stars: { increment: 1 } }
  });
}

module.exports = { getProjects, addFeedback, upvote };