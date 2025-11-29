import { Injectable, Inject, OnModuleInit, NotFoundException } from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import {
  CMS_SERVICE_NAME,
  GAME_PACKAGE_NAME,
  CMSServiceClient,
  SetElementDefaultRequest,
  CreateLevelRequest,
  SetElementDefaultResponse,
  CreateLevelResponse,
  GetAllElementDefaultRequest,
  GetAllElementDefaultResponse
} from 'proto/game.pb';
import { SetElementDefaultRequestDto, CreateLevelRequestDto } from 'dto/game.dto';
import { grpcCall } from 'src/parse_exception/grpc.exception';

@Injectable()
export class CMSService implements OnModuleInit {
  private cmsGrpcService: CMSServiceClient;

  constructor(@Inject(GAME_PACKAGE_NAME) private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.cmsGrpcService = this.client.getService<CMSServiceClient>(CMS_SERVICE_NAME);
  }

  async setElementDefault(dto: SetElementDefaultRequestDto): Promise<SetElementDefaultResponse> {
    const request: SetElementDefaultRequest = {
      elementType: dto.elementType.toString() === '0' ? 0 : 1,
      blocks: dto.blocks,
      obstacles: dto.obstacles,
    };
    const response = await grpcCall(this.cmsGrpcService.setElementDefault(request));
    return response;
  }

  async createLevel(dto: CreateLevelRequestDto): Promise<CreateLevelResponse> {
    if (!dto.levelData) throw new NotFoundException('LevelData is required');
    const request: CreateLevelRequest = { levelData: dto.levelData };
    const response = await grpcCall(this.cmsGrpcService.createLevel(request));
    return response;
  }

  async getAllElementDefault(dto: GetAllElementDefaultRequest): Promise<GetAllElementDefaultResponse> {
    const response = await grpcCall(this.cmsGrpcService.getAllElementDefault(dto));
    return response;
    }
}
