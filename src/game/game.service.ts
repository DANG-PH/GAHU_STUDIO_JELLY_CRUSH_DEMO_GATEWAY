import { Injectable, NotFoundException, Inject, OnModuleInit } from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import {
  GAME_PACKAGE_NAME,
  GAME_SERVICE_NAME,
  CMS_SERVICE_NAME,
  GameServiceClient,
  CMSServiceClient,
  GetDataLevelRequest,
  GetMatrixRequest,
} from 'proto/game.pb';
import { LevelDataDto, Matrix2DDto } from 'dto/game.dto';
import { grpcCall } from 'src/parse_exception/grpc.exception';

@Injectable()
export class GameService implements OnModuleInit {
  private gameGrpcService: GameServiceClient;
  private cmsGrpcService: CMSServiceClient;

  constructor(@Inject(GAME_PACKAGE_NAME) private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.gameGrpcService = this.client.getService<GameServiceClient>(GAME_SERVICE_NAME);
    this.cmsGrpcService = this.client.getService<CMSServiceClient>(CMS_SERVICE_NAME);
  }

  async getDataLevel(id: number): Promise<LevelDataDto> {
    const response = await grpcCall(this.gameGrpcService.getDataLevel({ id } as GetDataLevelRequest));
    if (!response.levelData) throw new NotFoundException('Level not found');
    return response.levelData as LevelDataDto;
  }

  async getMatrix(type: number): Promise<Matrix2DDto[]> {
    const response = await grpcCall(this.gameGrpcService.getMatrix({ type } as GetMatrixRequest));
    return response.matrix as Matrix2DDto[];
  }
}
