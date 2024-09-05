import { WardResponseDto } from '../dto/response/ward-response.dto';
import { WardEntity } from '../entities';

export class WardMapper {
  static toResponseDto(record: WardEntity): WardResponseDto {
    return {
      name: record.name,
      type: record.type,
      slug: record.slug,
      nameWithType: record.nameWithType,
      path: record.path,
      pathWithType: record.pathWithType,
      code: record.code,
      parentCode: record.parentCode,
    };
  }
}
