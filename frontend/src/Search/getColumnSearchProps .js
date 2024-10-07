import React, { useRef } from 'react';
import { Input, Button, Space } from 'antd';
import { SearchOutlined, UndoOutlined } from '@ant-design/icons';
import SearchComponent from './SearchComponent'; // Make sure to adjust the import path

const getColumnSearchProps = (dataIndex, searchText, setSearchText) => {
  return {
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <SearchComponent
        dataIndex={dataIndex}
        selectedKeys={selectedKeys}
        setSelectedKeys={setSelectedKeys}
        confirm={confirm}
        clearFilters={clearFilters}
      />
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
    ),
    onFilter: (value, record) => {
        console.log(value)
        console.log(record)



      return record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '';
    },
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => {
          // Optional: handle dropdown visibility change
        }, 100);
      }
    },
    render: (text) => (
      searchText ? (
        <span style={{ backgroundColor: '#ffc069', padding: 0 }}>{text}</span>
      ) : text
    ),
  };
};

export default getColumnSearchProps;