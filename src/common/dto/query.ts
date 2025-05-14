import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "../constants/constants";

export class QueryDto {
    page: number = DEFAULT_PAGE;

    pageSize: number = DEFAULT_PAGE_SIZE;

    get skip(): number {
        return (this.page - 1) * this.pageSize;
    }

    get limit(): number {
        return this.page * this.pageSize;
    }
}
