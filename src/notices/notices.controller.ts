import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateNoticeDto } from './dto/create-notice.dto';
import { NoticesService } from './notices.service';
import { UpdateNoticeDto } from './dto/update-notice.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Notice } from './entity/notice.entity';

@ApiTags('notices')
@Controller('notices')
export class NoticesController {
  constructor(private readonly noticesService: NoticesService) {}

  @Post()
  @ApiOperation({ summary: 'Create notice' })
  @ApiResponse({ status: 402, description: 'The created record', type: Notice })
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createNoticeDto: CreateNoticeDto): Notice {
    return this.noticesService.create(createNoticeDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'The found records',
    type: Notice,
  })
  findAll(): Notice[] {
    return this.noticesService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: Notice,
  })
  findOne(@Param('id') id: string): Notice {
    return this.noticesService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update notice' })
  @ApiResponse({
    status: 200,
    description: 'The updated record',
    type: Notice,
  })
  update(@Param('id') id: string, @Body() updateNoticeDto: UpdateNoticeDto) {
    return this.noticesService.update(id, updateNoticeDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete Notice' })
  @ApiResponse({
    status: 204,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.noticesService.remove(id);
  }
}
