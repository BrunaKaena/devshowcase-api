const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function create(data) {
  const project = await prisma.project.findUnique({
    where: {
      id: data.projectId
    }
  });

  if (!project) {
    throw new Error('Projeto não encontrado.');
  }

  const feedback = await prisma.feedback.create({
    data: {
      rating: data.rating,
      comment: data.comment,
      author: data.author,
      projectId: data.projectId
    }
  });

  const feedbacks = await prisma.feedback.findMany({
    where: {
      projectId: data.projectId
    }
  });

  const total = feedbacks.reduce((sum, item) => sum + item.rating, 0);
  const averageRating = total / feedbacks.length;

  await prisma.project.update({
    where: {
      id: data.projectId
    },
    data: {
      averageRating
    }
  });

  return feedback;
}

async function findByProjectId(projectId) {
  return prisma.feedback.findMany({
    where: {
      projectId
    }
  });
}

module.exports = {
  create,
  findByProjectId
};