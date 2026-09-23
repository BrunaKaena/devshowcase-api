const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
  create: (data) => prisma.project.create({
    data: {
      title: data.title,
      description: data.description || null,
      repositoryUrl: data.repositoryUrl,
      profileId: Number(data.profileId),
      technologies: data.technologyIds && data.technologyIds.length > 0 
        ? { connect: data.technologyIds.map(id => ({ id: Number(id) })) } 
        : undefined
    },
    include: { technologies: true }
  }),

  findById: (id) => prisma.project.findUnique({ 
    where: { id: Number(id) }, 
    include: { technologies: true, feedbacks: true, profile: true } 
  }),

  findAll: async ({ page, limit, technology }) => {
    const where = technology ? { technologies: { some: { name: { contains: technology } } } } : {};
    const [projects, total] = await Promise.all([
      prisma.project.findMany({ where, skip: (page-1)*limit, take: limit, include: { technologies: true, profile: true } }),
      prisma.project.count({ where })
    ]);
    return { data: projects, total, page, limit };
  },

  upvote: (id) => prisma.project.update({ where: { id: Number(id) }, data: { upvotes: { increment: 1 } } })
};