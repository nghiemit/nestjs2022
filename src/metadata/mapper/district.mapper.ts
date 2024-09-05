import { DistrictResponseDto } from '../dto/response/district-response.dto';
import { DistrictEntity } from '../entities';

export class DistrictMapper {
  static toResponseDto(record: DistrictEntity): DistrictResponseDto {
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
