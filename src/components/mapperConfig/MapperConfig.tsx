import React, { FC, useCallback, useMemo, useState } from 'react';
import { MapperItem } from '../../types';
import { Button } from 'antd';
import MapperConfigModal from './MapperConfigModal';

interface MapperConfigProps {
    mapperConfigList?: MapperItem[];
    onSave: (next: MapperItem[]) => void;
}

const MapperConfig: FC<MapperConfigProps> = ({ mapperConfigList, onSave }) => {
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    const onModalOk = useCallback((next: MapperItem[]) => {
        setModalVisible(false);
        onSave(next);
    }, []);

    const inModalConfigList = useMemo(() => {
        return mapperConfigList ?? [];
    }, [mapperConfigList]);

    return (
        <div>
            <p>此处设置映射规则</p>
            点击(
            <Button onClick={() => setModalVisible(true)}>设置</Button>
            )按钮设置映射规则
            <MapperConfigModal
                visible={modalVisible}
                mapperConfigList={inModalConfigList}
                onOk={onModalOk}
                onCancel={() => setModalVisible(false)}
            />
        </div>
    );
};

export default MapperConfig;
