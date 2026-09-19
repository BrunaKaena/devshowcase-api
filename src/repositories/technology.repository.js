const prisma = require('../database');

async function create(data) {
  return prisma.technology.create({
    data
  });
}

async function findAll() {
  return prisma.technology.findMany({
    orderBy: {
      id: 'asc'
    }
  });
}

async function findById(id) {
  return prisma.technology.findUnique({
    where: { id }
  });
}

module.exports = {
  create,
  findAll,
  findById
};