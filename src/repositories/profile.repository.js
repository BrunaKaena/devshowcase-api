const prisma = require('../database');

async function create(data) {
  return prisma.profile.create({
    data
  });
}

async function findById(id) {
  return prisma.profile.findUnique({
    where: { id }
  });
}

module.exports = {
  create,
  findById
};