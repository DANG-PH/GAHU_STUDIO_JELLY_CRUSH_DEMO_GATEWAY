import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { GAME_PACKAGE_NAME } from 'proto/game.pb';
import { CMSController } from './cms.controller';
import { CMSService } from './cms.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: GAME_PACKAGE_NAME,
        transport: Transport.GRPC,
        options: {
          package: GAME_PACKAGE_NAME,
          protoPath: join(process.cwd(), 'proto/game.proto'),
          url: 'localhost:50051',
          loader: {
                keepCase: true,
                objects: true,
                arrays: true,
          },
        },
      },
    ]),
  ],
  controllers: [CMSController],
  providers: [CMSService],
  exports: [CMSService]
})
export class CMSModule {}
