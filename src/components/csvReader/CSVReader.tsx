import React, { FC, useCallback } from 'react';
import { Button, Upload } from 'antd';
import { RcFile } from 'antd/es/upload';
import PapaParse from 'papaparse';
import { CSVDataItem } from '../../types';
import { parseCSVData } from './parse';

interface CSVReader {
    onRead: (next: { data: CSVDataItem[]; headers: string[] }) => void;
}

const CSVReader: FC<CSVReader> = ({ onRead }) => {
    const onFileRead = useCallback((info: RcFile) => {
        console.log('info', info);
        return new Promise<string>((res, rej) => {
            PapaParse.parse<string[]>(info, {
                complete(results, file) {
                    console.log('completed', results, file);
                    const transformedData = parseCSVData(results.data);
                    console.log('transform completed', transformedData);
                    onRead(transformedData);
                    res('OK');
                },
                error(error, file) {
                    console.log('error', error, file);
                    rej('Error');
                },
            });
        });
    }, [onRead]);

    return (
        <div>
            <p>此处上传CSV进行读取</p>

            <Upload accept="text/csv" action={onFileRead}>
                <Button>点击上传CSV</Button>
            </Upload>
        </div>
    );
};

export default CSVReader;
