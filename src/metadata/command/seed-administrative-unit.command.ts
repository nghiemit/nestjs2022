import { Command, CommandRunner } from 'nest-commander';
import { DataSource } from 'typeorm';
import * as Excel from 'exceljs';
import { DistrictEntity, ProvinceEntity, WardEntity } from '../entities';
import { string_to_slug } from '../helper/convert-string.helper';

@Command({ name: 'seed_administrative_units' })
export class SeedAdministrativeUnitsCommand extends CommandRunner {
  //#region Constructor

  public constructor(private readonly __datasource: DataSource) {
    super();
  }

  //#endregion

  //#region Methods

  public async run(
    passedParams: string[],
    options?: Record<string, any>,
  ): Promise<void> {
    console.log('Seeding starting...');
    const rPath = `${process.cwd()}`;
    const provincePath = `${rPath}/data-seed/administrative-units/province.xlsx`;
    const districtPath = `${rPath}/data-seed/administrative-units/district.xlsx`;
    const wardPath = `${rPath}/data-seed/administrative-units/ward.xlsx`;
    const workbook = new Excel.Workbook();

    await this.__seedProvinceAsync(workbook, provincePath);
    await this.__seedDistrictAsync(workbook, districtPath);
    await this.__seedWardAsync(workbook, wardPath);
  }

  private __getProvinceNameFromNameWithType(
    provinceNameWithType: string,
  ): string {
    let name = '';
    if (provinceNameWithType.toLowerCase().startsWith('tỉnh')) {
      const startInx = 'tỉnh'.length + 1;
      name = provinceNameWithType.slice(startInx, provinceNameWithType.length);
    }
    if (provinceNameWithType.toLowerCase().startsWith('thành phố')) {
      const startInx = 'thành phố'.length + 1;
      name = provinceNameWithType.slice(startInx, provinceNameWithType.length);
    }
    return name;
  }

  private __getDistrictNameFromNameWithType(
    districtNameWithType: string,
  ): string {
    let name = '';
    if (districtNameWithType.toLowerCase().startsWith('quận')) {
      const startInx = 'quận'.length + 1;
      name = districtNameWithType.slice(startInx, districtNameWithType.length);
    } else if (districtNameWithType.toLowerCase().startsWith('huyện')) {
      const startInx = 'huyện'.length + 1;
      name = districtNameWithType.slice(startInx, districtNameWithType.length);
    } else if (districtNameWithType.toLowerCase().startsWith('thành phố')) {
      const startInx = 'thành phố'.length + 1;
      name = districtNameWithType.slice(startInx, districtNameWithType.length);
    } else if (districtNameWithType.toLowerCase().startsWith('thị xã')) {
      const startInx = 'thị xã'.length + 1;
      name = districtNameWithType.slice(startInx, districtNameWithType.length);
    }
    return name;
  }

  private __getWardNameFromNameWithType(wardNameWithType: string): string {
    let name = '';
    if (wardNameWithType.toLowerCase().startsWith('phường')) {
      const startInx = 'phường'.length + 1;
      name = wardNameWithType.slice(startInx, wardNameWithType.length);
    } else if (wardNameWithType.toLowerCase().startsWith('xã')) {
      const startInx = 'xã'.length + 1;
      name = wardNameWithType.slice(startInx, wardNameWithType.length);
    } else if (wardNameWithType.toLowerCase().startsWith('thị trấn')) {
      const startInx = 'thị trấn'.length + 1;
      name = wardNameWithType.slice(startInx, wardNameWithType.length);
    }
    return name;
  }

  private async __seedProvinceAsync(
    workbook: Excel.Workbook,
    provincePath: string,
  ) {
    const provinceRepo = await this.__datasource.getRepository(ProvinceEntity);
    try {
      // *** Province: Tỉnh, Thành phố
      const workbookProvince = await workbook.xlsx.readFile(provincePath);
      const worksheetProvince = workbookProvince.getWorksheet(1);
      const provinceRecords = [];
      const totalProvinceRow = worksheetProvince.rowCount;
      for (let i = 1; i <= totalProvinceRow; i++) {
        const row = worksheetProvince.getRow(i);
        const provinceCode = row.getCell(1).value as string;
        const level = row.getCell(4).value as string;
        const provinceName = row.getCell(2).value as string;
        if (!!provinceCode && provinceCode !== 'Mã') {
          const getProvinceByCode = await provinceRepo.findOneBy({
            code: provinceCode,
          });
          if (!getProvinceByCode) {
            let type = '';
            const name = this.__getProvinceNameFromNameWithType(provinceName),
              slug = string_to_slug(name);
            if (level.toLowerCase() === 'tỉnh') {
              type = string_to_slug(level);
            } else {
              type = 'thanh-pho';
            }
            const newProvince = provinceRepo.create({
              code: provinceCode,
              name: name,
              slug: slug,
              type: type,
              nameWithType: provinceName,
            });
            provinceRecords.push(newProvince);
          }
        }
      }
      await provinceRepo.save(provinceRecords);
      console.log(
        `--- Inserted ${provinceRecords.length} province to database...`,
      );

      // ***/
    } catch (error) {
      console.log(
        `An error has been occured while seeding province, please check ---------->`,
      );
      console.error(error);
    }
  }

  private async __seedDistrictAsync(
    workbook: Excel.Workbook,
    districtPath: string,
  ) {
    const districtRepo = await this.__datasource.getRepository(DistrictEntity);
    try {
      // *** District: Quận, Huyện, Thành phố, Thị xã
      const workbookDistrict = await workbook.xlsx.readFile(districtPath);
      const worksheetDistrict = workbookDistrict.getWorksheet(1);
      const districtRecords = [];
      const totalDistrictRow = worksheetDistrict.rowCount;
      for (let i = 1; i <= totalDistrictRow; i++) {
        const row = worksheetDistrict.getRow(i);
        const districtCode = row.getCell(1).value as string;
        const level = row.getCell(4).value as string;
        const districtName = row.getCell(2).value as string;
        const provinceName = row.getCell(6).value as string;
        const provinceCode = row.getCell(5).value as string;
        if (!!districtCode && districtCode !== 'Mã') {
          const getDistrictByCode = await districtRepo.findOneBy({
            code: districtCode,
          });
          if (!getDistrictByCode) {
            let type = '';
            const name = this.__getDistrictNameFromNameWithType(districtName),
              slug = string_to_slug(name),
              pName = this.__getProvinceNameFromNameWithType(provinceName);
            if (!!level) {
              type = string_to_slug(level);
            } else {
              if (districtName.toLowerCase().includes('quận')) {
                type = string_to_slug('quận');
              } else if (districtName.toLowerCase().includes('huyện')) {
                type = string_to_slug('huyện');
              } else if (districtName.toLowerCase().includes('thành phố')) {
                type = string_to_slug('thành phố');
              } else if (districtName.toLowerCase().includes('thị xã')) {
                type = string_to_slug('thị xã');
              }
            }
            const newDistrict = districtRepo.create({
              name: name,
              type: type,
              slug: slug,
              nameWithType: districtName,
              path: `${name}, ${pName}`,
              pathWithType: `${districtName}, ${provinceName}`,
              code: districtCode,
              parentCode: provinceCode,
            });
            districtRecords.push(newDistrict);
          }
        }
      }
      await districtRepo.save(districtRecords);
      console.log(
        `--- Inserted ${districtRecords.length} district to database...`,
      );

      // ***/
    } catch (error) {
      console.log(
        `An error has been occured while seeding district, please check ---------->`,
      );
      console.error(error);
    }
  }

  private async __seedWardAsync(workbook: Excel.Workbook, wardPath: string) {
    const limit = 1000;
    const wardRepo = await this.__datasource.getRepository(WardEntity);
    try {
      // *** Ward: Phường, Xã, Thị trấn

      const workbookWard = await workbook.xlsx.readFile(wardPath);
      const worksheetWard = workbookWard.getWorksheet(1);
      const wardRecords = [];
      const totalWardRow = worksheetWard.rowCount;
      if (totalWardRow < limit) {
        for (let i = 1; i <= totalWardRow; i++) {
          const row = worksheetWard.getRow(i);
          const wardCode = row.getCell(1).value as string;
          const wardName = row.getCell(2).value as string;
          const level = row.getCell(4).value as string;
          const districtCode = row.getCell(5).value as string;
          const districtName = row.getCell(6).value as string;
          const provinceName = row.getCell(8).value as string;
          if (!!wardCode && wardCode !== 'Mã') {
            const getWardByCode = await wardRepo.findOneBy({ code: wardCode });
            if (!getWardByCode) {
              let type = '';
              const name = this.__getWardNameFromNameWithType(wardName),
                slug = string_to_slug(name),
                dName = this.__getDistrictNameFromNameWithType(districtName),
                pName = this.__getProvinceNameFromNameWithType(provinceName);
              if (!!level) {
                type = string_to_slug(level);
              } else {
                if (wardName.toLowerCase().includes('phường')) {
                  type = string_to_slug('phường');
                } else if (wardName.toLowerCase().includes('xã')) {
                  type = string_to_slug('xã');
                } else if (wardName.toLowerCase().includes('thị trấn')) {
                  type = string_to_slug('thị trấn');
                }
              }
              const newWard = wardRepo.create({
                name: name,
                type: type,
                slug: slug,
                nameWithType: wardName,
                path: `${name}, ${dName}, ${pName}`,
                pathWithType: `${wardName}, ${districtName}, ${provinceName}`,
                code: wardCode,
                parentCode: districtCode,
              });
              wardRecords.push(newWard);
            }
          }
        }
        await wardRepo.save(wardRecords);
        console.log(`--- Inserted ${wardRecords.length} ward to database...`);
      } else {
        let timeRead = 1;
        const recordAmountPerRead = limit;
        let curRow = 1;
        do {
          curRow = (timeRead - 1) * recordAmountPerRead + 1;
          const readToRow = timeRead * recordAmountPerRead;
          const wardRecords = [];
          for (let i = curRow; i < readToRow; i++) {
            const row = worksheetWard.getRow(i);
            const wardCode = row.getCell(1).value as string;
            const wardName = row.getCell(2).value as string;
            const level = row.getCell(4).value as string;
            const districtCode = row.getCell(5).value as string;
            const districtName = row.getCell(6).value as string;
            const provinceName = row.getCell(8).value as string;
            if (!!wardCode && wardCode !== 'Mã') {
              const getWardByCode = await wardRepo.findOneBy({
                code: wardCode,
              });
              if (!getWardByCode) {
                let type = '';
                const name = this.__getWardNameFromNameWithType(wardName),
                  slug = string_to_slug(name),
                  dName = this.__getDistrictNameFromNameWithType(districtName),
                  pName = this.__getProvinceNameFromNameWithType(provinceName);
                if (!!level) {
                  type = string_to_slug(level);
                } else {
                  if (wardName.includes('Phường')) {
                    type = string_to_slug('Phường');
                  } else if (wardName.includes('Xã')) {
                    type = string_to_slug('Xã');
                  } else if (wardName.includes('Thị trấn')) {
                    type = string_to_slug('Thị trấn');
                  }
                }
                const newWard = wardRepo.create({
                  name: name,
                  type: type,
                  slug: slug,
                  nameWithType: wardName,
                  path: `${name}, ${dName}, ${pName}`,
                  pathWithType: `${wardName}, ${districtName}, ${provinceName}`,
                  code: wardCode,
                  parentCode: districtCode,
                });
                wardRecords.push(newWard);
              }
            }
          }
          await wardRepo.save(wardRecords);
          console.log(`--- Inserted ${wardRecords.length} ward to database...`);
          timeRead++;
        } while (curRow < totalWardRow);
      }
      // ***/
    } catch (error) {
      console.log(
        `An error has been occured while seeding district, please check ---------->`,
      );
      console.error(error);
    }
  }

  //#endregion
}
