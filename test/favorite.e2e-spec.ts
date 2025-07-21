import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';

describe('Favorite End-to-End Tests', () => {
  let app: INestApplication;
  let mediaId: string;
  let userId: string;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should access the /auth/login endpoint', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'user@cinemais.com',
        password: 'user123',
      })
      .expect(201);
    userId = response.body.user?.id;
    expect(userId).toBeDefined();
  });

  it('should access the /media endpoint and store a media ID', async () => {
    const response = await request(app.getHttpServer())
      .get('/media')
      .expect(200);
    mediaId = response.body[0]?.id;
    expect(mediaId).toBeDefined();
  });

  it('should access the /user/:userId/favorites endpoint using the user ID and media ID', () => {
    return request(app.getHttpServer())
      .post(`/user/${userId}/favorites`)
      .send({ mediaId })
      .expect(201);
  });

  it('should access the /user/:userId/favorites endpoint to list favorites', async () => {
    const response = await request(app.getHttpServer())
      .get(`/user/${userId}/favorites`)
      .expect(200);

    expect(response.body).toBeInstanceOf(Array);

    const lastFavorite = response.body[response.body.length - 1];
    expect(lastFavorite.mediaId).toBe(mediaId);
  });

  it('should access the /user/:userId/favorites/:mediaId endpoint to remove a media from favorites', () => {
    return request(app.getHttpServer())
      .delete(`/user/${userId}/favorites/${mediaId}`)
      .expect(200);
  });
});
