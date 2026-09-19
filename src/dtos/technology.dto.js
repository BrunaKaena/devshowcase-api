function validateTechnologyInput(data) {
  const { name } = data;

  if (!name || name.trim() === '') {
    return 'O nome da tecnologia é obrigatório.';
  }

  return null;
}

module.exports = {
  validateTechnologyInput
};