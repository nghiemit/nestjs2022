import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WardEntity } from '../entities';
import { Repository } from 'typeorm';
import { WardResponseDto } from '../dto/response/ward-response.dto';
import { WardNotFoundException } from '../exceptions/ward-not-found.exception';
import { WardMapper } from '../mapper/ward.mapper';

@Injectable()
export class GetWardActionHandler {
  //#region constructor
  constructor(
    @InjectRepository(WardEntity)
    private readonly __wardRepo: Repository<WardEntity>,
  ) {}
  //#endregion

  //#region public method
  public async executeAsync(payload: {
    wardCode: string;
  }): Promise<WardResponseDto> {
    const getWard = await this.__wardRepo.findOneBy({ code: payload.wardCode });
    if (!getWard) {
      throw new WardNotFoundException();
    }
    return WardMapper.toResponseDto(getWard);
  }
  //#endregion
}
