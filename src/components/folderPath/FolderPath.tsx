import { Button, Input, message } from 'antd';
import React, { FC, useCallback, useEffect, useState } from 'react';

interface FolderPathProps {
    folderName?: string;
    onSave: (next: string) => void;
}

const FolderPath: FC<FolderPathProps> = ({ folderName, onSave }) => {
    const [inputValue, setInputValue] = useState<string>();

    useEffect(() => {
        setInputValue(folderName);
    }, [folderName]);

    const onSaveClick = useCallback(() => {
        if (!inputValue) {
            message.warn('请输入合法的路径');
            return;
        }
        onSave(inputValue);
    }, [inputValue]);

    return (
        <div>
            <p>此处设置文件目录路径（使得图片载入正确）</p>

            <Input.Group compact>
                <Input
                    style={{
                        width: 'calc(100% - 200px)'
                    }}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <Button type="primary" onClick={onSaveClick}>
                    保存
                </Button>
            </Input.Group>
        </div>
    );
};

export default FolderPath;
