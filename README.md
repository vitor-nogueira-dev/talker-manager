## Talker Manager 🎤
---
<details>
<summary><span style="font-size: 1.5rem;"> 👨🏼‍💻 Proposta</span></summary>

  - Criar uma aplicação de cadastro de palestrantes em que será possível cadastrar, visualizar, pesquisar, editar e excluir informações. Para isso, foi desenvolvida uma API seguindo o padrão CRUD (Create, Read, Update e Delete) para manipulação dos dados dos palestrantes. Utilizamos o módulo fs do Node.js para realizar a leitura e escrita dos dados em um arquivo. Com isso, os endpoints criados fornecem as funcionalidades necessárias para gerenciar as informações dos palestrantes de forma dinâmica e eficiente.
</details>

---
<details>
<summary><span style="font-size: 1.5rem;"> 📝 Funcionalidades</span></summary>

  - `Listar palestrantes:`
  Endpoint GET /talker que retorna uma lista de todos os palestrantes cadastrados no sistema. Se não houver palestrantes cadastrados, retorna um array vazio.

  - `Buscar palestrante por ID:`
  Endpoint GET /talker/:id que retorna um palestrante específico, com base no ID passado na URL. Se o ID não for encontrado, retorna o status 404 com uma mensagem indicando que o palestrante não foi encontrado.

  - `Login:`
  Endpoint POST /login que recebe um e-mail e uma senha, e retorna um token aleatório de 16 caracteres.

  - `Validar login:`
  O endpoint /login deve validar se os campos recebidos na requisição são válidos. Caso não sejam válidos, retorna o status 400 com a respectiva mensagem de erro.

  - `Adicionar palestrante:`
  Endpoint POST /talker que permite adicionar um novo palestrante.

  - `Editar palestrante:`
  Endpoint PUT /talker/:id que permite editar as informações de um palestrante já cadastrado, com base no ID passado na URL.

  - `Excluir palestrante:`
  Endpoint DELETE /talker/:id que permite excluir um palestrante já cadastrado, com base no ID passado na URL.

  - `Buscar palestrante por termo:`
  Endpoint GET /talker/search?q=searchTerm que retorna uma lista de palestrantes que contenham o termo passado na URL.

  - `Buscar palestrante por nota:`
  Endpoint GET /talker/search?rate=rateNumber que retorna uma lista de palestrantes com a nota passada na URL.

  - `Buscar palestrante por data:`
  Endpoint GET /talker/search?date=watchedDate que retorna uma lista de palestrantes com a data de palestra passada na URL.

  - `Avaliar palestrante:`
  Endpoint PATCH /talker/rate/:id que permite avaliar um palestrante já cadastrado, com base no ID passado na URL.

  - `Listar palestrantes do banco de dados:`
  Endpoint GET /talker/db que retorna uma lista de todos os palestrantes cadastrados no banco de dados. Se não houver palestrantes cadastrados, retorna um array vazio.
</details>

----
<details>
<summary><span style="font-size: 1.5rem;"> 💡 Tecnologias Utilizadas</span></summary>
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white"> </br>
  <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge"> </br>
  <img src="https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white"> </br>
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" /> 
</details>

----

<details>
<summary><span style="font-size: 1.5rem;">💻 Pré-requisitos</span></summary>
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white"> </br>
  <img src="https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white">
</details>

---

#### Como executar o projeto:
1. Clone este repositório
````
git clone git@github.com:vitor-nogueira-dev/talker-manager.git
````
1. Na pasta raiz do projeto, execute o seguinte comando para subir o container:
```
docker-compose up -d
``` 
1. Entre no terminal `bash` do container:
````
docker exec -it talker_manager bash
````
1. Execute o comando para rodar o servidor com o `nodemon` 
````
npm run dev
````
1. Se preferir rodar sem o `nodemon`
````
npm start
````
1. Abra o software e/ou extensão e faça os testes conforme as rotas implementadas no diretório `routes`
---
### Configuração do banco de dados
1. O banco de dados `TalkerDB` é criado e populado quando o container é criado no passo `2`
   
### Contribuições
> 💡Contribuições são bem-vindas! Se você tiver alguma sugestão ou encontrar um bug, por favor, abra uma issue ou envie um pull request.


<img width=100% src="./images/banner.gif"/>

