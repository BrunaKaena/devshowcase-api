const prisma = require('../database');

async function create(data) {
  return prisma.feedback.create({
    data: {
      comment: data.comment,
      author: data.author,
      project: {
        connect: {
          id: data.projectId
        }
      }
    }
  });
}

async function findByProjectId(projectId) {
  return prisma.feedback.findMany({
    where: {
      projectId
    },
    orderBy: {
      id: 'asc'
    }
  });
}

module.exports = {
  create,
  findByProjectId
};