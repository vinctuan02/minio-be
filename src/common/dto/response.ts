export class ResponseSuccessDto<T> {
    statusCode: number;
    message: string;
    data?: T;

    constructor(statusCode: number, message: string, data?: T) {
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
    }
}

export class DataListSuccessDto<T> {
    item: T[];
    metaData: MetaData;

    constructor(item: T[], metaData: MetaData) {
        this.item = item;
        this.metaData = metaData;
    }
}

export class MetaData {
    currentPage: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;

    constructor(currentPage: number, pageSize: number, totalItems: number) {
        this.currentPage = currentPage;
        this.pageSize = pageSize;
        this.totalItems = totalItems;
        if (
            typeof totalItems === 'number' &&
            typeof pageSize === 'number' &&
            pageSize > 0
        ) {
            this.totalPages = Math.ceil(totalItems / pageSize);
        } else {
            this.totalPages = 0;
        }
    }
}
