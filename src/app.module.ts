import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';

/**
 * mysql 8 strong password auth won't supported
 * mysql: ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';
 * mysql: flush privileges;
 */

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'test',
      //entities: [],
      synchronize: true,
      autoLoadEntities: true,
    }),
    AuthModule, 
    UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}