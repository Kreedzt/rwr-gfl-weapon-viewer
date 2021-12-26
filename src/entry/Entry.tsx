import React, { FC, useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import 'antd/dist/antd.css';
import QueryFilter from '../components/queryFilter/QueryFilter';
import FolderPath from '../components/folderPath/FolderPath';
import { globalState } from '../state/global';
import MapperConfig from '../components/mapperConfig/MapperConfig';
import { MapperItem, FilterItem, CSVDataItem } from '../types';
import CSVReader from '../components/csvReader/CSVReader';
import DataView from '../components/dataView/DataView';
import { TablePaginationConfig } from 'antd/es/table';

const Entry: FC = () => {
    const onFilter = useCallback((f: FilterItem[]) => {
        console.log('onFilter', f);
    }, []);

    const onFolderPathSave = useCallback((next: string) => {
        globalState.updateFolderPath(next);
    }, []);

    const onMapperConfigSave = useCallback((next: MapperItem[]) => {
        globalState.updateMapperList(next);
    }, []);

    const onCSVRead = useCallback(
        (next: { data: CSVDataItem[]; headers: string[] }) => {
            globalState.updateCSVParseRes(next);
        },
        [],
    );

    const onTableChange = useCallback((pageInfo: TablePaginationConfig) => {
        globalState.updateViewData(pageInfo);
    }, []);

    return (
        <div>
            <MapperConfig
                mapperConfigList={globalState.mapperList}
                onSave={onMapperConfigSave}
            />
            <FolderPath
                folderName={globalState.folderPath}
                onSave={onFolderPathSave}
            />
            <CSVReader onRead={onCSVRead} />
            <QueryFilter
                filterList={globalState.filterList}
                onFilter={onFilter}
            />

            <DataView
                data={globalState.visibleData}
                folderPath={globalState.folderPath}
                headers={globalState.headers}
                total={globalState.total}
                mapperDict={globalState.mapperDict}
                rowsPerPage={globalState.rowsPerPage}
                onChange={onTableChange}
            />
        </div>
    );
};

export default observer(Entry);
