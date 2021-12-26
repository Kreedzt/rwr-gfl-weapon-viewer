import { CSVDataItem } from '../../types';
import {UUID_KEY} from "../../constants";

export const parseCSVData = (
    csvData: string[][],
): {
    data: CSVDataItem[];
    headers: string[];
} => {
    let headers: string[] = [];
    const resJSON: CSVDataItem[] = [];

    csvData.forEach((rawData, index) => {
        // 0 ==> header
        // other => content
        if (index === 0) {
            headers = rawData;
        } else {
            // avoid repeat, add 'uuid' key
            const resData: CSVDataItem = {
                [UUID_KEY]: `${new Date().getMilliseconds()}-${index}`,
            };
            rawData.forEach((rawValue, index) => {
                const rightValue = rawValue;
                const leftKey = headers[index];

                resData[leftKey] = rightValue;
            });
            resJSON.push(resData);
        }
    });

    return {
        data: resJSON,
        headers,
    };
};
