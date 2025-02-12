# Fullstack Friend Challenge

Bem-vindo(a)! Este README tem como objetivo guiar você na configuração e execução do projeto, composto por um **Backend** e um **Frontend**.

---

## Pré-requisitos

- **Node.js** (versão 14 ou superior)
- **Yarn** (versão 1.x ou superior)
- **Docker** e **Docker Compose** instalados

---

## Executando o Backend

1. **Instale as dependências**:

   cd backend
   yarn install

2. **Suba os containers com Docker**:

   Certifique-se de estar dentro da pasta principal do seu projeto (ou onde estiver o arquivo `docker-compose.yaml`) antes de rodar o comando abaixo:

   docker-compose up -d

3. **Inicie a aplicação**:

   Com o Docker em execução e as dependências instaladas, rode:

   yarn start

   > Esse comando iniciará o servidor do Backend. Se estiver tudo certo, você deverá ver a mensagem de que o servidor está rodando normalmente.

---

## Executando o Frontend

1. **Instale as dependências**:

   cd frontend
   yarn install

2. **Inicie a aplicação**:

   yarn start

   > Este comando iniciará a aplicação em modo de desenvolvimento. Certifique-se de que o Backend já esteja rodando com o Docker ativo para que as requisições possam ser feitas corretamente.

3. **Acesse a aplicação**:

   Após iniciar o Frontend, abra seu navegador e acesse o endereço:

   http://localhost:3000

   Se tudo estiver configurado corretamente, você verá a aplicação funcionando.

---

## Dúvidas ou Problemas

Caso surjam dúvidas ou problemas durante a configuração ou execução do projeto, sinta-se à vontade para abrir uma **Issue**.
