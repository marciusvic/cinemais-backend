FROM node:18

WORKDIR /app

ARG NODE_ENV
ENV NODE_ENV=${NODE_ENV}

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run prisma:generate
RUN npm run build

EXPOSE 3000

CMD ["sh", "-c", "if [ \"$NODE_ENV\" = \"development\" ]; then npm run dev:start; else npx prisma migrate deploy && npm run prisma:seed:prod && node dist/src/main; fi"]
