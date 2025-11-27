import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsString, IsOptional, Min, ValidateNested, ArrayMinSize, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateLevelRequest } from 'proto/game.pb';

export enum ElementType {
  BLOCKER = 0,
  POLYOMINOS = 1,
  EMPTY = 2,
}

export enum ElementSubType {
  BOX_BLOCKER = 0,
  HYDRANT_BLOCKER = 1,
}

export class GameElementDto {
  @ApiProperty({ enum: ElementType, example: ElementType.BLOCKER })
  @IsEnum(ElementType)
  elementType: ElementType;

  @ApiProperty({ enum: ElementSubType, example: ElementSubType.BOX_BLOCKER })
  @IsEnum(ElementSubType)
  elementSubType: ElementSubType;

  @ApiProperty({ example: 2, minimum: 1 })
  @IsInt()
  @Min(1)
  width: number;

  @ApiProperty({ example: 3, minimum: 1 })
  @IsInt()
  @Min(1)
  height: number;

  @ApiProperty({
    example: '{"color": "red"}',
    description: 'string JSON, có thể dùng "{}" nếu không có props'
  })
  @IsString()
  elementProps: string; 
}

export class GameLevelDataDto {
  @ApiProperty({ example: 'Game Jelly Crush' })
  @IsString()
  gameName: string;

  @ApiProperty({ example: 'game_001' })
  @IsString()
  gameId: string;

  @ApiProperty({ example: 'level_001' })
  @IsString()
  levelId: string;

  @ApiProperty({ example: 10 })
  @IsInt()
  cols: number;

  @ApiProperty({ example: 12 })
  @IsInt()
  rows: number;

  @ApiProperty({
    type: [GameElementDto],
    example: [
      {
        elementType: ElementType.BLOCKER,
        elementSubType: ElementSubType.BOX_BLOCKER,
        width: 1,
        height: 2,
        elementProps: `{'color':'blue','grid':'[[1][1]]'}`
      }
    ]
  })
  @ValidateNested({ each: true })
  @Type(() => GameElementDto)
  @ArrayMinSize(0)
  elements: GameElementDto[];
}

export class FindLevelRequestDto {
  @ApiProperty({ example: 'level_001' })
  @IsString()
  levelId: string;
}

export class FindLevelResponseDto {
  @ApiProperty({ type: GameLevelDataDto, required: false })
  @ValidateNested()
  @Type(() => GameLevelDataDto)
  @IsOptional()
  levelData?: GameLevelDataDto;
}

export class CreateLevelRequestDto implements CreateLevelRequest {
  @ApiProperty({ type: GameLevelDataDto })
  @ValidateNested()
  @Type(() => GameLevelDataDto)
  levelData: GameLevelDataDto;
}

export class CreateLevelResponseDto {
  @ApiProperty({ example: true })
  @IsBoolean()
  success: boolean;

  @ApiProperty({ example: 'Level created successfully!' })
  @IsString()
  message: string;

  @ApiProperty({ type: GameLevelDataDto, required: false })
  @ValidateNested()
  @Type(() => GameLevelDataDto)
  @IsOptional()
  levelData?: GameLevelDataDto;
}
