import React, { FC } from 'react';
import {FilterItem} from "../../types";

interface QueryFilterProps {
    filterList?: FilterItem[];
    onFilter: (f: FilterItem[]) => void;
}

const QueryFilter: FC<QueryFilterProps> = ({ filterList, onFilter }) => {
    return <div>QueryFilter...</div>;
};

export default QueryFilter;
