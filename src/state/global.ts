import { action, computed, makeObservable, observable } from 'mobx';
import { FilterItem, CSVDataItem, MapperItem } from '../types';
import { TablePaginationConfig } from 'antd/es/table';

type InferGlobalStateValueType<T extends keyof GlobalState> = GlobalState[T];

class GlobalState {
    loading = false;
    csvData: CSVDataItem[] = [];
    folderPath: string = '';
    filterList: FilterItem[] = [];
    mapperList: MapperItem[] = [];

    get mapperDict(): Record<string, string> {
        return this.mapperList.reduce((acc, item) => {
            acc[item.key] = item.value;
            return acc;
        }, {} as Record<string, string>);
    }

    headers: string[] = [];
    visibleData: CSVDataItem[] = [];
    rowIndex: number = 1;
    rowsPerPage: number = 20;
    total: number = 0;

    constructor() {
        makeObservable(this, {
            loading: observable,
            csvData: observable,
            folderPath: observable,
            filterList: observable,

            mapperList: observable,
            mapperDict: computed,

            headers: observable,
            visibleData: observable,
            rowIndex: observable,
            rowsPerPage: observable,
            total: observable,

            refreshVisibleData: action,

            updateCSVParseRes: action,
            updateFolderPath: action,
            updateFilterList: action,
            updateMapperList: action,
            updateViewData: action,
        });
    }

    refreshVisibleData() {
        this.total = this.csvData.length;

        const start: number = (this.rowIndex - 1) * this.rowsPerPage;
        const end: number = start + this.rowsPerPage;
        console.log('start-end-csvlength', start, end, this.csvData.length);
        this.visibleData = this.csvData.slice(start, end);
    }

    updateCSVParseRes(next: {
        data: InferGlobalStateValueType<'csvData'>;
        headers: InferGlobalStateValueType<'headers'>;
    }) {
        this.headers = next.headers;
        this.csvData = next.data;

        this.refreshVisibleData();
    }

    updateFolderPath(next: InferGlobalStateValueType<'folderPath'>) {
        this.folderPath = next;
    }

    updateFilterList(next: InferGlobalStateValueType<'filterList'>) {
        this.filterList = next;
    }

    updateMapperList(next: InferGlobalStateValueType<'mapperList'>) {
        this.mapperList = next;
    }

    updateViewData(pageInfo: TablePaginationConfig) {
        this.rowsPerPage = pageInfo.pageSize ?? this.rowsPerPage;
        this.rowIndex = pageInfo.current ?? this.rowIndex;
        this.refreshVisibleData();
    }
}

export const globalState = new GlobalState();
