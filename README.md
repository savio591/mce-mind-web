<a href="https://mindconsulting.com.br/education/">![image](https://user-images.githubusercontent.com/3879613/132265934-b3197a0e-0603-4fdc-b1d5-c55c03a0aa1f.png)
</a>

![jest](https://github.com/savio591/mce-mind-web/actions/workflows/jest.yml/badge.svg?branch=dev)
![codequality](https://github.com/savio591/mce-mind-web/actions/workflows/codeInspector.yml/badge.svg?branch=dev)
[![wakatime](https://wakatime.com/badge/github/savio591/mce-mind-web.svg)](https://wakatime.com/badge/github/savio591/mce-mind-web)

[![typescript](https://badgen.net/badge/icon/typescript?icon=typescript&label)](https://www.typescriptlang.org/)
[![codestyle-airbnb](https://badgen.net/badge/code%20style/airbnb/f2a?icon=github)](https://github.com/airbnb/javascript)

![Next JS](https://img.shields.io/badge/Next-black?logo=next.js&logoColor=white)
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?logo=vercel&logoColor=white)
[![Storybook](https://cdn.jsdelivr.net/gh/storybookjs/brand@main/badge/badge-storybook.svg)](https://www.chromatic.com/library?appId=60f032ec31643a003b29def3)
![SASS](https://img.shields.io/badge/SASS-hotpink.svg?logo=SASS&logoColor=white)
[![mce](https://badgen.net/badge/icon/mind%20coding%20experience/red?icon=https://savilexperiments.com.br/assets/mce-icon-12px.svg&label)](https://conteudos.provi.com.br/mind-coding-experience/)


> ⚠️ **Projeto ainda em construção! Você pode clicar [aqui](https://github.com/savio591/mce-mind-web/tree/dev) e ir para a branch de desenvolvimento** ⚠️

# MCE - Case 2 - Plataforma de agendamento para personal trainers

Segundo case do programa [Mind Coding Experience(MCE)](https://conteudos.provi.com.br/mind-coding-experience/), que está sendo feito pela [Mind Consulting] em parceria com a fintech [Provi], com o intuito de evoluir as habilidades técnicas participando de projetos e recebendo acompanhamento de profissionais do mercado.

## Tecnologias utilizadas:

### Front-end web:

- Server-Side-Rendering com Next.js/React.js,
- Static Site Generation com Next.js/React.js,
- React-icons(Font Awesome e Feather Icons),
- StorybookJS(Design de componentes e props),
- Cloudinary CMS(Gerenciamento e armazenamento de mídia),
- FaunaDB(banco de dados serveless),
- Next-auth(hooks de autenticação),
- Axios(api),
- SCSS(SASS),
- Typescript.

## A proposta-desafio do _Product Owner_:

> P.S: Estatísticas do que foi feito, cumprido ou alterado durante o desenvolvimento do projeto está disponível em [stats.md]

Será desenvolvido um sistema para agendamentos de horários para personal trainers. A plataforma deve ser composta por um aplicativo e versão web, ambas com especificidades próprias e conter um CRM para controle CRUD dos clientes da plataforma. Os personal trainers podem criar sua conta e disponibilizar seus horários disponíveis, enquanto os alunos podem marcar os agendamentos pelo app.

## Funcionalidades:

### CRUD Usuários:

O crud de usuários se baseia em ser possível realizar o cadastro e edição de dados referentes aos usuários.

Os dados necessários para realizar o cadastro dos usuários são:

* Nome
* Senha
* Email
* Foto
* Telefone
* Nível de acesso

### CRUD Personais:

Os dados necessários para realizar o cadastro dos usuários são:
* Nome
* Senha
* Email
* Foto
* Nível de acesso

### Sistema agendamento:

O sistema de agendamento torna possível que o usuários agendem horários e que os personais verifiquem os horários que foram agendados.

**Para usuários:** O usuários após terem efetuado o login poderão agendar os horários, para isso deverão selecionar o dá e o horário disponível, e enfim confirmar o agendamento. Também haverá uma listagem com todos os horários que ele tem agendado.

**Para os personais:** Os personais poderão verificar os horários que foram agendados, através do dashboard administrativo.

**Status:** Reservado e Agendado É necessário deixar indicado que foi agendado o horário em especifico Os horários de trabalhos dos personais se iniciam as 8 h e finalizam as 20:00h, com uma pausa para o almoço de 1 hora ao 12:00h

### Desenvolvimento dashboard:

O dashboard administrativo poderá ser acessado pelo personais e pelas academias. Esse permitirá a visualização e controle das informações relacionadas aos agendamentos

### Sistema de perfil:

Os usuários poderão editar seus respectivos perfis, através do aplicativo, conseguindo alterar, seu nome, email, senha e foto

### Níveis de acesso:

Os viveis de acesso farão a diferenciação entre os personais e alunos. Sendo que: Os alunos: Conseguirão agendar horários com os personais disponibilizadas no sistema, através do aplicativo Os personais: Poderão verificar Através do dasboard administraitvo e app, os horarários que forces agendados

### Dashboard:

O dashboard permitirá apenas o controle dos agendamentos pelo login dos personais Deve ser constituido de duas abas
* Agendamentos
* Perfil

### APP:

O aplicativo permitirá os agendamentos dos usuários, e a visualização dos agendamentos por parte dos personais.

Todos os usuários cadastrados pelo APP terão nível de acesso de alunos

### Sistema de notificação:

O sistema de notificação será necessário para toda vez que um aluno agendar oro horário, o personal que teve o horário agendado recebe uma notificação, alertando que o horário foi agendado e informações referente ao aluno que agendou.

* Agendamentos
* Perfil

## Links do projeto:

* Protótipo: [Figma](https://www.figma.com/file/9HhQUDxESVIvBC0tJJszt8/Case-MCE?node-id=0%3A1?)

* Front-end web: [Página](https://mce-mind.vercel.app) - [Repositório](https://github.com/savio591/mce-mind-web)

## Requisitos para o desenvolvimento:
* **Node:** v12+

## Como rodar o projeto na máquina local:

* Primeiro, adicione as seguintes variáveis(para ser executada na máquina local):
```.env
// mce-onboarding-web/.env.local/

IS_LOCALHOST=true

NEXT_PUBLIC_VERCEL_URL=localhost:3000
NEXT_PUBLIC_BACKEND_URL= (LINK DO SERVIDOR BACKEND)

FAUNA_ADMIN_KEY= (CHAVE DO ADMIN DO BANCO DE DADOS)
FAUNADB_KEY= (CHAVE SECRETA DO NEXT PARA O FAUNA)
FAUNADB_CLIENT_KEY= (CHAVE DO USUÁRIO FINAL PARA O FAUNA)

GITHUB_CLIENT_ID= (OPCIONAL = ID PARA OAUTH DO GITHUB)
GITHUB_CLIENT_SECRET= (OPCIONAL = ID MESTRE PARA OAUTH DO GITHUB)

EMAIL_SERVER= (smtp://email@email.com:asenha@smtp.email.com:587) (O SEU SERVIDOR DE EMAIL)
EMAIL_FROM=(REMETENTE DO EMAIL)

BACKEND_ADMIN_TOKEN= (TOKEN DE ACESSO ADMIN DO BANCO DE DADOS DO EXPRESS)
```

* Instale as dependências utilizando ``yarn`` ou ``npm`` na pasta do repositório,
* Para iniciar no modo "desenvolvimento", inicie com ``yarn dev`` ou `npm run dev`. O Next/Webpack servirá o ambiente Next na rede local na porta ``3000``,
* Para iniciar uma `production`, build da aplicação Next.js com node, basta ``yarn build``, após a build for criada, execute ``yarn start`` para iniciar, depois disso, é só copiar o link da aplicação que aparecerá no terminal e pronto!


**Agradecimentos à PROVI por todo o suporte e motivação e a Mind Consulting pelo programa, a oportunidade dada e especialmente às mentorias! <3**

[stats.md]: ./stats.md
[Provi]: https://provi.com.br
[Mind Consulting]: https://mindconsulting.com.br
