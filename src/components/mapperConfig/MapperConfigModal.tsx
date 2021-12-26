import React, { FC, useCallback, useEffect, useState } from 'react';
import { Modal } from 'antd';
import { MapperItem } from '../../types';

interface MapperConfigModalProps {
    visible: boolean;
    mapperConfigList: MapperItem[];
    onOk: (next: MapperItem[]) => void;
    onCancel: () => void;
}

const MapperConfigModal: FC<MapperConfigModalProps> = ({
    visible,
    mapperConfigList,
    onOk,
    onCancel,
}) => {
    const [localMapperConfigList, setLocalMapperConfigList] = useState<
        MapperItem[]
    >([]);

    useEffect(() => {
        setLocalMapperConfigList(mapperConfigList);
    }, [visible, mapperConfigList]);

    const onModalOk = useCallback(() => {
        console.log('onModalOk');
        onOk(localMapperConfigList);
    }, [onOk, localMapperConfigList]);

    return (
        <Modal visible={visible} onOk={onModalOk} onCancel={onCancel}>
            <div>This is Modal Content...</div>
            <code>
                <pre>{JSON.stringify(localMapperConfigList, null, 2)}</pre>
            </code>
        </Modal>
    );
};

export default MapperConfigModal;
