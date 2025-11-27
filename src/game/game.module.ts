import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { GAME_PACKAGE_NAME } from 'proto/game.pb';
import { GameController } from './game.controller';
import { GameService } from './game.service';

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
  controllers: [GameController],
  providers: [GameService],
  exports: [GameService]
})
export class GameModule {}
