export class Pageable {
  static readonly DEFAULT_PAGE_SIZE = 5;
  static readonly FIRST_PAGE_NUMBER = 0;

  public constructor(
    public pageSize: number = Pageable.DEFAULT_PAGE_SIZE,
    public pageNumber: number = Pageable.FIRST_PAGE_NUMBER
  ) {}
}

export class Page<T> {
  public constructor(
    public pageable: Pageable = new Pageable(),
    public content: Array<T> = [],
    public first: boolean = true,
    public last: boolean = true,
    public totalPages: number = 0,
    public totalElements: number = 0,
    public numberOfElements: number = 0,
    public size: number = 0
  ) {}
}
