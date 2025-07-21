import { PrismaClient, MediaType } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Alimentando o banco de dados...');

  const userEmail = 'user@cinemais.com';
  const existingUser = await prisma.user.findUnique({
    where: { email: userEmail },
  });
  if (!existingUser) {
    const hashedPassword = await bcrypt.hash('user123', 10);
    await prisma.user.create({
      data: {
        email: userEmail,
        password: hashedPassword,
        name: 'Cinemais User',
      },
    });
    console.log('Usuario criado.');
  } else {
    console.log('Usuário já existe. Pulando criação.');
  }

  const seriesTitle = 'Kimetsu no Yaiba Season 1';
  const existingMedia = await prisma.media.findFirst({
    where: { title: seriesTitle },
  });
  if (!existingMedia) {
    await prisma.media.create({
      data: {
        title: seriesTitle,
        description:
          'Um anime sobre caçadores de oni, baseado no mangá de sucesso.',
        type: MediaType.series,
        releaseYear: 2019,
        genre: 'Action',
      },
    });
    console.log('Série criada com sucesso.');
  } else {
    console.log('Série já existe. Pulando criação.');
  }

  const moviesTitle = 'Avengers: Endgame';
  const existingMovie = await prisma.media.findFirst({
    where: { title: moviesTitle },
  });
  if (!existingMovie) {
    await prisma.media.create({
      data: {
        title: moviesTitle,
        description:
          'Um épico filme de super-heróis que reúne os Vingadores para enfrentar Thanos.',
        type: MediaType.movie,
        releaseYear: 2019,
        genre: 'Action',
      },
    });
    console.log('Filme criado com sucesso.');
  } else {
    console.log('Filme já existe. Pulando criação.');
  }

  console.log('Banco de dados alimentado com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
