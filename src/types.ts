export type CSVDataItem = Record<string, string>;

export enum FilterQueryType {
    INCLUDES = 'includes',
}

export interface FilterItem {
    key: string;
    value: string;
    queryType: FilterQueryType;
}

export interface MapperItem {
    key: string;
    value: string;
}
