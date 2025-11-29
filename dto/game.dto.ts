// src/game/dto/game.dto.ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { BlockGimmickType, ColorType, Difficulty, Direction, ElementType, ObstacleType } from 'proto/game.pb';

// ===================== Entities =====================

export class ObstacleDataDto {
  @ApiProperty({ enum: ObstacleType, example: ObstacleType.WALL })
  @IsEnum(ObstacleType)
  type: ObstacleType;

  @ApiProperty({ enum: Direction, example: Direction.TOP })
  @IsEnum(Direction)
  direction: Direction;

  @ApiProperty({ example: 5 })
  @IsInt()
  x: number;

  @ApiProperty({ example: 3 })
  @IsInt()
  y: number;

  @ApiProperty({ type: 'object', additionalProperties: { type: 'string' }, example: { durability: '100' } })
  meta: Record<string, string>;
}

export class BlockGimmickDataDto {
  @ApiProperty({ enum: BlockGimmickType, example: BlockGimmickType.LAYER })
  @IsEnum(BlockGimmickType)
  type: BlockGimmickType;

  @ApiProperty({ type: () => [BlockDataDto], example: [] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BlockDataDto)
  blocks: BlockDataDto[];

  @ApiProperty({ example: 1 })
  @IsInt()
  count: number;
}

export class BlockDataDto {
  @ApiProperty({ example: 2 })
  @IsInt()
  type: number;

  @ApiProperty({ enum: ColorType, example: ColorType.RED })
  @IsEnum(ColorType)
  color: ColorType;

  @ApiProperty({ example: 4 })
  @IsInt()
  x: number;

  @ApiProperty({ example: 5 })
  @IsInt()
  y: number;

  @ApiPropertyOptional({ type: () => BlockGimmickDataDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => BlockGimmickDataDto)
  gimmick?: BlockGimmickDataDto;
}

export class BlockGroupDataDto {
  @ApiProperty({ type: [Number], example: [0, 1, 2] })
  @IsArray()
  @IsInt({ each: true })
  indexes: number[];
}

export class LevelDataDto {
  @ApiProperty({ example: 10 })
  @IsInt()
  width: number;

  @ApiProperty({ example: 10 })
  @IsInt()
  height: number;

  @ApiProperty({ enum: Difficulty, example: Difficulty.NORMAL })
  @IsEnum(Difficulty)
  difficulty: Difficulty;

  @ApiProperty({ type: [BlockDataDto], example: [] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BlockDataDto)
  blocks: BlockDataDto[];

  @ApiProperty({ type: [ObstacleDataDto], example: [] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ObstacleDataDto)
  obstacles: ObstacleDataDto[];

  @ApiProperty({ type: [BlockGroupDataDto], example: [] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BlockGroupDataDto)
  groups: BlockGroupDataDto[];

  @ApiProperty({ example: 60 })
  @IsInt()
  time_limit: number;
}

export class Matrix2DDto {
  @ApiProperty({ example: 3 })
  @IsInt()
  cols: number;

  @ApiProperty({ example: 3 })
  @IsInt()
  rows: number;

  @ApiProperty({ type: [Number], example: [1, 0, 0, 0, 1, 0, 0, 0, 1] })
  @IsArray()
  @IsNumber({}, { each: true })
  values: number[];
}

// ===================== Requests =====================

export class GetDataLevelRequestDto {
  @ApiProperty({ example: 1 })
  @Type(() => Number)
  @IsInt()
  id: number;
}

export class GetDataLevelResponseDto {
  @ApiProperty({ type: LevelDataDto })
  @ValidateNested()
  @Type(() => LevelDataDto)
  levelData: LevelDataDto;
}

export class GetMatrixRequestDto {
  @ApiProperty({ example: 1 })
  @Type(() => Number)
  @IsInt()
  type: number;
}

export class GetMatrixResponseDto {
  @ApiProperty({ type: [Matrix2DDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Matrix2DDto)
  matrix: Matrix2DDto[];
}

// ===================== CMS DTO =====================

export class BlockTypeDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  type: number;

  // name chỉ để Swagger, không validate proto
  @ApiPropertyOptional({ example: 'Basic Block' })
  @IsOptional()
  name: string;

  @ApiProperty({ type: [Matrix2DDto], example: [{ cols: 2, rows: 3, values: [0, 1, 1, 1, 1, 0] }] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Matrix2DDto)
  cell_matrix: Matrix2DDto[];
}

export class ObstacleDataDefaultDto {
  @ApiProperty({ enum: ObstacleType, example: ObstacleType.WALL })
  @IsEnum(ObstacleType)
  type: ObstacleType;
}

export class SetElementDefaultRequestDto {
  @ApiProperty({ enum: ElementType, example: ElementType.Block })
  @Type(() => Number)
  @IsEnum(ElementType)
  elementType: ElementType;

  @ApiPropertyOptional({ type: BlockTypeDto })
  @ValidateNested()
  @Type(() => BlockTypeDto)
  blocks?: BlockTypeDto;

  @ApiPropertyOptional({ type: ObstacleDataDefaultDto })
  @ValidateNested()
  @Type(() => ObstacleDataDefaultDto)
  obstacles?: ObstacleDataDefaultDto;
}

export class SetElementDefaultResponseDto {
  @ApiProperty({ example: true })
  success: boolean;
}

export class CreateLevelRequestDto {
  @ApiProperty({ type: LevelDataDto })
  @ValidateNested()
  @Type(() => LevelDataDto)
  levelData: LevelDataDto;
}

export class CreateLevelResponseDto {
  @ApiProperty({ example: true })
  success: boolean;
}

// ===================== Get All Elements =====================

export class GetAllElementDefaultRequestDto {
  @ApiProperty({ enum: ElementType, example: ElementType.Block, description: 'Loại element muốn lấy' })
  @Type(() => Number)
  @IsEnum(ElementType)
  elementType: ElementType;
}

export class GetAllElementDefaultResponseDto {
  @ApiPropertyOptional({ type: [BlockTypeDto], description: 'Danh sách Block nếu elementType là Block' })
  @ValidateNested({ each: true })
  @Type(() => BlockTypeDto)
  blocks?: BlockTypeDto[];

  @ApiPropertyOptional({ type: [ObstacleDataDefaultDto], description: 'Danh sách Obstacle nếu elementType là Obstacle' })
  @ValidateNested({ each: true })
  @Type(() => ObstacleDataDefaultDto)
  obstacles?: ObstacleDataDefaultDto[];
}
