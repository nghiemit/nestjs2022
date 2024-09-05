import { ProvinceResponseDto } from '../dto/response/province-response.dto';
import { ProvinceEntity } from '../entities';

export class ProvinceMapper {
  static toResponseDto(record: ProvinceEntity): ProvinceResponseDto {
    return {
      name: record.name,
      slug: record.slug,
      type: record.type,
      nameWithType: record.nameWithType,
      code: record.code,
    };
  }
}
