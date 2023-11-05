
# Sistema de Reservas de Restaurante

Este é um sistema de reservas de restaurante construído com Node.js, Express e MySQL. Ele permite aos usuários criar reservas, visualizar mesas disponíveis e gerenciar contas de usuário.

## Observação

Se você não encontrar o código na branch "master", verifique a branch "main".

## Recursos

- **Usuários**:
  - Registrar um novo usuário
  - Autenticar um usuário
  - Obter todos os usuários
  - Obter um usuário por ID
  - Pesquisar usuários por nome de usuário

- **Mesas**:
  - Obter todas as mesas disponíveis

- **Reservas**:
  - Criar, atualizar e excluir reservas
  - Obter todas as reservas
  - Obter uma reserva por ID

## Pré-requisitos

Para executar este sistema em sua máquina, você precisará ter as seguintes ferramentas e tecnologias instaladas:

- [Node.js](https://nodejs.org/)
- [MySQL](https://www.mysql.com/)
- [Postman](https://www.postman.com/) (opcional, para testar a API)

## Configuração

Siga as etapas abaixo para configurar o sistema em sua máquina:

1. Clone o repositório:

   ```bash
   git clone https://github.com/luisroyo/Projeto-Web-DSW.git
   cd Projeto-Web-DSW
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Configure o banco de dados:

   - Crie um banco de dados MySQL.
   - Importe o esquema SQL do banco de dados a partir deste [script](https://github.com/luisroyo/Projeto-Web-DSW/tree/18b557dc42877a257140680e9a32d72156d6ca38/mysql).
   - Configure a conexão com o banco de dados no arquivo `config/dbConnection.js`.

4. Inicie o servidor:

   ```bash
   npm start
   ```

5. O servidor estará em execução em [http://localhost:3000](http://localhost:3000). Você pode acessar os endpoints da API por meio das rotas definidas no diretório `routes`.

## API Endpoints

A API possui os seguintes endpoints:

### Usuários

1. **Registrar um novo usuário** (POST):
   - `http://localhost:3000/usuarios`
   - Corpo (em JSON):
     ```json
     {
       "username": "novousuario",
       "senha": "senha123",
       "name": "Nome do Usuário",
       "phone": "123-456-7890",
       "email": "usuario@example.com"
     }
     ```

2. **Autenticar um usuário** (POST):
   - `http://localhost:3000/usuarios/login`
   - Corpo (em JSON):
     ```json
     {
       "username": "novousuario",
       "senha": "senha123"
     }
     ```

3. **Obter todos os usuários** (GET):
   - `http://localhost:3000/usuarios`

4. **Obter um usuário por ID** (GET):
   - `http://localhost:3000/usuarios/1` (substitua "1" pelo ID do usuário desejado)

5. **Pesquisar usuários por nome de usuário** (GET):
   - `http://localhost:3000/usuarios/search/nomeusuario` (substitua "nomeusuario" pelo nome de usuário a ser pesquisado)

### Mesas

6. **Obter todas as mesas disponíveis** (GET):
   - `http://localhost:3000/mesas`

### Reservas

7. **Criar uma nova reserva** (POST):
   - `http://localhost:3000/reservas`
   - Corpo (em JSON):
     ```json
     {
       "userId": 1,  // ID do usuário que está fazendo a reserva
       "mesaId": 2,  // ID da mesa a ser reservada
       "reservaDate": "2023-12-01",
       "reservaTime": "18:30",
       "number_of_guests": 4,
       "status": "pendente"
     }
     ```

8. **Obter todas as reservas** (GET):
   - `http://localhost:3000/reservas`

9. **Obter uma reserva por ID** (GET):
   - `http://localhost:3000/reservas/1` (substitua "1" pelo ID da reserva desejada)

10. **Atualizar uma reserva existente** (PATCH):
    - `http://localhost:3000/reservas/1` (substitua "1" pelo ID da reserva a ser atualizada)
    - Corpo (em JSON):
      ```json
      {
        "number_of_guests": 6,
        "status": "confirmada"
      }
      ```

11. **Excluir uma reserva** (DELETE):
    - `http://localhost:3000/reservas/1` (substitua "1" pelo ID da reserva a ser excluída)

Certifique-se de ajustar os valores e IDs de acordo com os dados reais em seu banco de dados e as configurações de sua aplicação. Esses são apenas exemplos genéricos de solicitações no Postman.

## Testando a API com o Postman

Você pode usar o Postman, uma ferramenta popular para testar APIs, para interagir com as endpoints do sistema de reservas do restaurante. Siga as etapas abaixo para começar:

1. Baixe e instale o [Postman](https://www.postman

.com/downloads/).

2. Abra o Postman e importe a coleção de solicitações de teste disponível em `postman_collection.json` na raiz do projeto.

3. Abra a coleção importada e você verá solicitações predefinidas para testar as principais funcionalidades da API, como criar uma reserva, visualizar mesas disponíveis, autenticar-se como usuário e muito mais.

4. Certifique-se de que o servidor da aplicação esteja em execução em [http://localhost:3000] ou o URL apropriado.

5. Execute as solicitações do Postman para interagir com a API e verificar as respostas.

Isso facilitará o teste e a familiarização dos colaboradores e usuários com a sua API usando o Postman ou outra ferramenta similar.

## Licença

Este projeto está licenciado sob a Licença MIT. Sinta-se à vontade para usá-lo e modificá-lo de acordo com suas necessidades.
