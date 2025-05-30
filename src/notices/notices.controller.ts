import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateNoticeDto } from './dto/create-notice.dto';
import { NoticesService } from './notices.service';
import { UpdateNoticeDto } from './dto/update-notice.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Notice, Notice as NoticeEntity } from './entity/notice.entity';

@ApiTags('notices')
@Controller('notices')
export class NoticesController {
  constructor(private readonly noticesService: NoticesService) {}

  @Post()
  @ApiOperation({ summary: 'Create notice' })
  @ApiResponse({ status: 402, description: 'The created record', type: Notice })
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createNoticeDto: CreateNoticeDto,
  ): Promise<NoticeEntity> {
    return await this.noticesService.create(createNoticeDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'The found records',
    type: Notice,
  })
  async findAll(): Promise<NoticeEntity[]> {
    return await this.noticesService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: Notice,
  })
  async findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ): Promise<NoticeEntity> {
    return await this.noticesService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update notice' })
  @ApiResponse({
    status: 200,
    description: 'The updated record',
    type: Notice,
  })
  update(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
    @Body() updateNoticeDto: UpdateNoticeDto,
  ) {
    return this.noticesService.update(id, updateNoticeDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete Notice' })
  @ApiResponse({
    status: 204,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return this.noticesService.remove(id);
  }
}
