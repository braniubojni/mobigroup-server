import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ValidationPipe } from './common/pipes/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  const PORT = process.env.PORT ?? 5005;
  /** Global middlwares */
  app.useGlobalPipes(new ValidationPipe());

  /** Global middlwares */
  await app.listen(PORT, () => Logger.debug(`Server at ${PORT}`));
}
bootstrap();
