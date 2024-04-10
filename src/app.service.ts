import { Injectable } from '@nestjs/common';
import { CreateEntryDTO } from './dto/create-entry.dto';
import { PrismaService } from './prisma.service';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}
  async getEntries(page: number, pageSize: number) {
    const skip = (page - 1) * pageSize;
    const take = pageSize;
    const totalCount = await this.prisma.entry.count();
    const totalPages = Math.ceil(totalCount / pageSize);
    const currentPage = page;
    const limit = pageSize;
    const entries = await this.prisma.entry.findMany({
      skip,
      take,
    });
    const hasNextPage = currentPage < totalPages;
    return {
      entries,
      totalCount,
      totalPages,
      currentPage,
      limit,
      hasNextPage,
    };
  }

  createEntry(entry: CreateEntryDTO) {
    return this.prisma.entry.create({
      data: entry,
    });
  }
}
