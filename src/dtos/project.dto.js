function validateProjectInput(data) {
  const { title, repositoryUrl, profileId } = data;

  if (!title || title.trim() === '') {
    return 'O título do projeto é obrigatório.';
  }

  if (!repositoryUrl || repositoryUrl.trim() === '') {
    return 'A URL do repositório é obrigatória.';
  }

  try {
    new URL(repositoryUrl);
  } catch {
    return 'A URL do repositório deve ser válida.';
  }

  if (!profileId) {
    return 'O ID do perfil é obrigatório.';
  }

  if (!Number.isInteger(Number(profileId))) {
    return 'O ID do perfil deve ser um número.';
  }

  return null;
}

module.exports = {
  validateProjectInput
};