import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { connect, connection } from 'mongoose';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Test database connection
  try {
    await connect(
      process.env.MONGODB_URI || 'mongodb://localhost:27017/task-management',
    );
    console.log('✅ Database connected successfully!');

    connection.on('error', (err: any) => {
      console.error('❌ Database connection error:', err);
    });

    connection.on('disconnected', () => {
      console.log('⚠️ Database disconnected');
    });
  } catch (error) {
    console.error('❌ Failed to connect to database:', error);
  }

  await app.listen(process.env.PORT ?? 3000);
  console.log(
    `🚀 Application is running on: http://localhost:${process.env.PORT ?? 3000}`,
  );
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
