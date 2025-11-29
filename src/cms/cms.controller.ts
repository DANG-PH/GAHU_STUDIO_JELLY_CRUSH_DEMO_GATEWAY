import { Controller, Post, Body, Get, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { CMSService } from './cms.service';
import {
  GetAllElementDefaultRequestDto,
  GetAllElementDefaultResponseDto,
  SetElementDefaultRequestDto,
  SetElementDefaultResponseDto,
  CreateLevelRequestDto,
  CreateLevelResponseDto,
} from 'dto/game.dto';
import { ElementType } from 'proto/game.pb';

@Controller('cms')
@ApiTags('CMS')
export class CMSController {
  constructor(private readonly cmsService: CMSService) {}

  @Get('elements')
  @ApiOperation({ summary: 'Lấy danh sách default block hoặc obstacle' })
  @ApiQuery({ name: 'elementType', type: String, example: '0', description: 'Block hoặc Obstacle' })
  async getAllElementDefault(@Query() query: GetAllElementDefaultRequestDto): Promise<GetAllElementDefaultResponseDto> {
    const grpcElementType = query.elementType.toString() === '0' ? ElementType.Block : ElementType.Obstacle;
    const grpcRes = await this.cmsService.getAllElementDefault({ elementType: grpcElementType });

    return {
        blocks: grpcRes.blocks?.items ?? [],
        obstacles: grpcRes.obstacles?.items ?? [],
    };
  }

  @Post('set-element')
  @ApiOperation({ summary: 'Thêm element default' })
  async setElementDefault(@Body() body: SetElementDefaultRequestDto): Promise<SetElementDefaultResponseDto> {
    return this.cmsService.setElementDefault(body);
  }

  @Post('create-level')
  @ApiOperation({ summary: 'Tạo level mới' })
  async createLevel(@Body() body: CreateLevelRequestDto): Promise<CreateLevelResponseDto> {
    return this.cmsService.createLevel(body);
  }
}
