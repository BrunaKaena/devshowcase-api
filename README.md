# DevShowcase API

API REST desenvolvida para a plataforma DevShowcase, como parte da atividade prática da disciplina de desenvolvimento backend.

## Integrantes da Dupla

- Bruna Kaena da Silva Pereira
- Vanessa Maria Oliveira Guimarães

## Tecnologias Utilizadas

- Node.js
- Express
- Prisma ORM
- SQLite
- JavaScript

## Entidades

A API possui as seguintes entidades:

- Profile (Perfil do Desenvolvedor)
- Project (Projeto)
- Technology (Tecnologia)
- Feedback (Opinião)

## Relacionamentos

- Um Profile pode possuir vários Projects.
- Um Project pertence a um Profile.
- Um Project pode possuir várias Technologies.
- Uma Technology pode estar associada a vários Projects.
- Um Project pode possuir vários Feedbacks.
- Um Feedback pertence a um Project.

## Endpoints

### Profiles

`POST /api/profiles`

Cadastra um novo perfil.

`GET /api/profiles/:id`

Busca um perfil pelo ID.

### Projects

`POST /api/projects`

Cadastra um novo projeto.

`GET /api/projects`

Lista os projetos cadastrados.

### Technologies

`POST /api/technologies`

Cadastra uma nova tecnologia.

`GET /api/technologies`

Lista as tecnologias cadastradas.

### Feedbacks

`POST /api/feedbacks`

Cadastra um feedback para um projeto.

`GET /api/feedbacks/project/:projectId`

Lista os feedbacks de um projeto.

## Banco de Dados

O projeto utiliza SQLite como banco de dados e Prisma como ORM.

O banco de dados é armazenado localmente durante o desenvolvimento.

## Como Executar

Instale as dependências:

```bash
npm install