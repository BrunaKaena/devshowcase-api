const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class FeedbackService {
  async createWithAverage({ projectId, rating, comment, author }) {
    if (!rating || rating < 1 || rating > 5) throw new Error('Nota deve ser de 1 a 5');
    if (!comment) throw new Error('Comentário obrigatório');
    const project = await prisma.project.findUnique({ where: { id: projectId } });
    if (!project) throw new Error('Projeto não encontrado');
    const feedback = await prisma.feedback.create({ data: { rating, comment, author, projectId } });
    const allFeedbacks = await prisma.feedback.findMany({ where: { projectId } });
    const sum = allFeedbacks.reduce((acc, f) => acc + f.rating, 0);
    const avg = sum / allFeedbacks.length;
    await prisma.project.update({ where: { id: projectId }, data: { averageRating: avg } });
    return feedback;
  }
}
module.exports = new FeedbackService();