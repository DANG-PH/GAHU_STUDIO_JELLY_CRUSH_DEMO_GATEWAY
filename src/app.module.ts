import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GameModule } from './game/game.module';
import { CMSModule } from './cms/cms.module';

@Module({
  imports: [
    GameModule,
    CMSModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}