const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class TechnologyService {
  async create(data) {
    return prisma.technology.create({
      data: { name: data.name }
    });
  }
  async findAll() {
    return prisma.technology.findMany();
  }
}

module.exports = new TechnologyService();