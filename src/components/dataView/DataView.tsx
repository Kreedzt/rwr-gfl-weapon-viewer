import React, { FC, useCallback, useMemo } from 'react';
import { CSVDataItem } from '../../types';
import { Table } from 'antd';
import { ColumnType, TablePaginationConfig } from 'antd/es/table';
import { SorterResult } from 'antd/es/table/interface';
import {UUID_KEY} from "../../constants";

interface DataViewProps {
    data: CSVDataItem[];
    mapperDict: Record<string, string>;
    headers: string[];
    total: number;
    rowsPerPage: number;
    folderPath: string;
    onChange: (pageInfo: TablePaginationConfig) => void;
}

type DataViewDataType = Record<string, string>;
type DataViewColumnItem = ColumnType<DataViewDataType>;
type DataViewColumns = DataViewColumnItem[];

const DataView: FC<DataViewProps> = ({
    data,
    mapperDict,
    headers,
    folderPath,
    rowsPerPage,
    total,

    onChange,
}) => {
    const columns = useMemo<DataViewColumns>(() => {
        return headers.map((h) => {
            const baseOptions: DataViewColumnItem = {
                dataIndex: h,
                title: mapperDict[h] ?? h,
            };
            if (h === 'hud_icon') {
                return {
                    ...baseOptions,
                    render: (value) => {
                        const path = `${folderPath}${value}`;
                        return <img src={path} alt={value} />;
                    },
                };
            }
            return baseOptions;
        });
    }, [mapperDict, headers, folderPath]);

    const onTableChange = useCallback(
        (
            pageInfo: TablePaginationConfig,
            _filterInfo,
            sorterInfo:
                | SorterResult<DataViewDataType>
                | SorterResult<DataViewDataType>[],
        ) => {
            console.log('onTableChange', pageInfo, _filterInfo, sorterInfo);
            onChange(pageInfo);
        },
        [onChange],
    );

    return (
        <div>
            <Table
                rowKey={UUID_KEY}
                dataSource={data}
                columns={columns}
                onChange={onTableChange}
                pagination={{
                    total,
                    pageSize: rowsPerPage,
                }}
            />
        </div>
    );
};

export default DataView;
