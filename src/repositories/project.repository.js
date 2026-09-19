const prisma = require('../database');

async function create(data) {
  return prisma.project.create({
    data: {
      title: data.title,
      description: data.description || null,
      repositoryUrl: data.repositoryUrl,
      profile: {
        connect: {
          id: data.profileId
        }
      },
      technologies: {
        connect: data.technologyIds.map((id) => ({
          id
        }))
      }
    },
    include: {
      profile: true,
      technologies: true
    }
  });
}

async function findAll() {
  return prisma.project.findMany({
    include: {
      profile: true,
      technologies: true,
      feedbacks: true
    },
    orderBy: {
      id: 'asc'
    }
  });
}

module.exports = {
  create,
  findAll
};