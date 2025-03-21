import React, { useRef } from 'react';
import { Input, Button, Space,Tooltip} from 'antd';
import { SearchOutlined, UndoOutlined } from '@ant-design/icons';

const SearchComponent = ({ dataIndex, selectedKeys, setSelectedKeys, confirm, clearFilters }) => {
  const searchInput = useRef(null);

  const handleSearch = () => {
    confirm();
    setSelectedKeys(searchInput.current.input.value ? [searchInput.current.input.value] : []);
  };

  const handleReset = () => {
    clearFilters();
    confirm();
    setSelectedKeys([]);
  };

  return (
    <div style={{ padding: 8 }}>
      <Space style={{ display: 'flex', alignItems: 'center' }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={handleSearch}
          style={{ flex: 1, marginRight: 8 }}
        />
        <Tooltip placement="bottom" arrow={false} title={"Αναζήτηση"}><Button
          type="primary"
          onClick={handleSearch}
          icon={<SearchOutlined />}
          size="small"
        />
        </Tooltip>
        <Tooltip placement="bottom" arrow={false} title={"Αναίρεση"}>
        <Button
          onClick={handleReset}
          size="small"
          danger
          icon={<UndoOutlined />}
        />
        </Tooltip>
      </Space>
    </div>
  );
};

export default SearchComponent;