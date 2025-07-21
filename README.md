### Repositório voltado para desafio

## Cinemais Backend - Infobase It

- Descrição do desafio no arquivo `Teste Backend Jr.pdf`

## Como rodar o projeto

1. Clone o repositório
2. Entre na pasta `cinemais-backend`
3. Configura o arquivo `.env` com as variáveis de ambiente

```env
{
DATABASE_URL=postgres://postgres:password123@db:5432/cinemais
JWT_SECRET='infobase'
JWT_EXPIRES_IN=1d
PORT=3000

POSTGRES_USER=postgres
POSTGRES_PASSWORD=password123
POSTGRES_DB=cinemais
}
```

4. Execute o comando `docker-compose up --build`

## Como rodar os testes
- Certifique-se de que o banco de dados está rodando e que as tabelas estão criadas.
- Execute o comando `npm run test:e2e` para rodar os testes de integração
- Ele tem o seguinte fluxo: 
    - Loga com o usuário criado na seed (e define o userId)
    - Lista as mídias (e define a primeira mídia como a ser utilizada nos testes)
    - Adiciona a mídia aos favoritos do usuário (utilizando o userId e mediaId)
    - Pega todos os favoritos do usuário e verifica se o último favorito adicionado é o mesmo que foi adicionado anteriormente.
    - Remove o favorito do usuário (utilizando o userId e mediaId)
- Para esses testes, o usuário e a mídia são criados na seed do banco de dados, então não é necessário criar manualmente.
- Verifique o arquivo `test/jest.setup.ts` para ver as configurações iniciais do ambiente de testes, como estou usando docker-compose o banco é criando e setado como `db` então preciso reescrever a variável de ambiente `DATABASE_URL` para o banco de dados que está rodando no docker(localmente).

## Tecnologias utilizadas

- TypeScript
- Node.js
- Nest.js
- Prisma
- Docker
- Postgres

## Uso do NestJs
- Escolhi usar o Nest por ser um framework que facilita a construção de APIs organizadas, além de já ter uma estrutura robusta para lidar com autenticação e validação de dados, além disso é o framework backend que mais tenho expertise.

## Organização do código
- O código está organizado em módulos, seguindo a estrutura do Nest.js, o que facilita a manutenção e a escalabilidade.
- Cada módulo tem seu próprio controller, service, DTOs e Repository.
- O controller lida com as requisições HTTP, o service contém a regra de negócio e o repository interage com o banco de dados através do Prisma.

## Documentação
- A documentação da API está disponível no Swagger, acessível em `http://localhost:3000/api`.
- Para gerar um json acesse `http://localhost:3000/api-json`, após isso você pode importar o arquivo no Insomnia ou Postman.

## Observações
- Implementei autenticação JWT para proteger as rotas, mas não foi pedido as rotas protegidas, pois no esquema das rotas é possível acessar as rotas de favoritos e usuários sem autenticação.
- Caso queira testar a autenticação você pode adicionar a tag `@UseGuards(JwtAuthGuard)` nos controllers que deseja proteger.
