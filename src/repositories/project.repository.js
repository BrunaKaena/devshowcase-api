const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
class ProjectRepository {
  async create(data) {
    const { title, description, repositoryUrl, profileId, technologyIds } = data;
    return prisma.project.create({
      data: {
        title, description, repositoryUrl,
        profileId: parseInt(profileId),
        technologies: { connect: technologyIds.map(id => ({ id: parseInt(id) })) }
      },
      include: { technologies: true, profile: true }
    });
  }
  async findAll() {
    return prisma.project.findMany({ include: { technologies: true, profile: true } });
  }
  async findById(id) {
    return prisma.project.findUnique({ where: { id: parseInt(id) } });
  }
  async upvote(id) {
    return prisma.project.update({
      where: { id: parseInt(id) },
      data: { upvotes: { increment: 1 } }
    });
  }
}
module.exports = new ProjectRepository();