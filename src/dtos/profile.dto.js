function validateProfileInput(data) {
  const { name, email, bio } = data;

  if (!name || name.trim() === '') {
    return 'O nome é obrigatório.';
  }

  if (!email || email.trim() === '') {
    return 'O email é obrigatório.';
  }

  if (!email.includes('@')) {
    return 'O email deve ser válido.';
  }

  return null;
}

module.exports = {
  validateProfileInput
};