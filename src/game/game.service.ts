import { Injectable, Inject, Logger } from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';
import { FindLevelRequest, FindLevelResponse, CreateLevelRequest, CreateLevelResponse, GameLevelServiceClient, GAME_LEVEL_SERVICE_NAME, GAME_PACKAGE_NAME } from 'proto/game.pb';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class GameService {
  private gameGrpcService: GameLevelServiceClient;

  constructor(
    @Inject(GAME_PACKAGE_NAME) private readonly client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.gameGrpcService = this.client.getService<GameLevelServiceClient>(GAME_LEVEL_SERVICE_NAME);
  }

  async handleFindLevel(req: FindLevelRequest): Promise<FindLevelResponse> {
    return firstValueFrom(this.gameGrpcService.findLevel(req));
  }

  async handleCreateLevel(req: CreateLevelRequest): Promise<CreateLevelResponse> {
    return firstValueFrom(this.gameGrpcService.createLevel(req));
  }
}
