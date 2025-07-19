### Repositório voltado para desafio

## Cinemais Backend - Infobase It

- Descrição do desafio no arquivo `Teste Backend Jr.pdf`

## Como rodar o projeto

1. Clone o repositório
2. Entre na pasta `cinemais-backend`
3. Configura o arquivo `.env` com as variáveis de ambiente

```env
{
DATABASE_URL=postgres://postgres:password123@localhost:5432/cinemais
JWT_SECRET='infobase'
JWT_EXPIRES_IN=1d
PORT=3000
}
```

4. Execute o comando `docker-compose up --build`

