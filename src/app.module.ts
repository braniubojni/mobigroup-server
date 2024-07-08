import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { APStaff } from './ap-staff/ap-staff.model';
import { ApStaffModule } from './ap-staff/ap-staff.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRootAsync({
      useFactory: async () => {
        const {
          MARIA_DB_HOST: host,
          MARIA_DB_PORT: port,
          MARIA_DB_USER: username,
          MARIA_DB_PASSWORD: password,
          MARIA_DB_NAME: database,
        } = process.env;
        return {
          dialect: 'mariadb',
          host,
          port: +port,
          username,
          password,
          database,
          models: [APStaff],
          autoLoadModels: false, // MAKE FALSE IN PRODUCTION
          logging: Logger.error,
          define: {
            freezeTableName: true,
          },
          pool: {
            max: 10, // Maximum number of connections in pool
            min: 0, // Minimum number of connections in pool
            acquire: 30000, // Maximum time (ms) that pool will try to get connection before throwing error
            idle: 10000, // Maximum time (ms) that a connection can be idle before being released
          },
        };
      },
    }),
    AuthModule,
    ApStaffModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
