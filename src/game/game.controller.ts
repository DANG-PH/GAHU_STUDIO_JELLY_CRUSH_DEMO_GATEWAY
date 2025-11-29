import { Controller, Get, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { GameService } from './game.service';
import { GetDataLevelRequestDto, GetDataLevelResponseDto, GetMatrixRequestDto, GetMatrixResponseDto } from 'dto/game.dto';

@Controller('game')
@ApiTags('Api Game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Get('level')
  @ApiOperation({ summary: 'Lấy thông tin level theo id' })
  @ApiQuery({ name: 'id', type: Number, example: 1 })
  async getLevel(@Query() query: GetDataLevelRequestDto): Promise<GetDataLevelResponseDto> {
    const levelData = await this.gameService.getDataLevel(query.id);
    return { levelData };
  }

  @Get('matrix')
  @ApiOperation({ summary: 'Lấy ma trận của block theo type' })
  @ApiQuery({ name: 'type', type: Number, example: 1 })
  async getMatrix(@Query() query: GetMatrixRequestDto): Promise<GetMatrixResponseDto> {
    const matrix = await this.gameService.getMatrix(query.type);
    return { matrix };
  }
}
