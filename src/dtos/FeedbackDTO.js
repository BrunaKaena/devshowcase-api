class FeedbackDTO {
  static validate(data) {
    if (data.rating === undefined || data.rating === null) throw new Error('Rating é obrigatório');
    if (Number(data.rating) < 1 || Number(data.rating) > 5) throw new Error('A avaliação (rating) deve ser entre 1 e 5');
    if (!data.comment) throw new Error('Comentário é obrigatório');
    if (!data.author) throw new Error('Autor é obrigatório');
  }
}
module.exports = FeedbackDTO;