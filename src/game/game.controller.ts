import { Controller, Post, Body, UseGuards, Param, Get, Patch, Put, Delete, Query, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiQuery, ApiParam } from '@nestjs/swagger';
import { FindLevelRequestDto, FindLevelResponseDto, CreateLevelRequestDto, CreateLevelResponseDto } from 'dto/game.dto';
import { GameService } from './game.service';

@Controller('game')
@ApiTags('Api Game') 
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Get('find-level')
  @ApiOperation({ summary: 'Lấy data của level trong game theo level id' })
  async findLevel(@Query() query: FindLevelRequestDto) {
    return this.gameService.handleFindLevel(query);
  }

  @Post('create-level')
  @ApiOperation({ summary: 'Tạo thêm level data' })
  @ApiBody({ type:  CreateLevelRequestDto })
  async createLevel(@Body() body: CreateLevelRequestDto) {
    return this.gameService.handleCreateLevel(body);
  }
}