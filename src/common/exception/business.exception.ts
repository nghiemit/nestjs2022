export abstract class BusinessException {
  //#region Constructor

  protected constructor(
    public readonly code: string | number,
    public readonly message?: string,
    public readonly status: number = 666,
  ) {}

  //#endregion
}
