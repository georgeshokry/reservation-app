import React from 'react';
import { DatePicker, Select, Input, Button, Flex, Space, Badge  } from 'antd';
import {statusTypes, ShiftTypes, AreaTypes} from '../utils/renderData'


const { Option } = Select;

const ReservationFilters = ({ filters, setFilters,handleResetFilters  }) => {
  const handleDateChange = (date, dateString) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      date: dateString ? dateString : null,
    }));
  };

  const handleInputChange = (e) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      search: e.target.value,
    }));
  };

  const handleSelectChange = (field) => (value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [field]: value,
    }));
  };

  return (
    <Space style={{ marginBottom: '20px' }}>
        <Space.Compact>
            <Flex gap="small" wrap>
                <Input
                placeholder="Search by name"
                value={filters.search}
                onChange={handleInputChange}
                style={{ width: '200px', marginRight: '10px' }}
                />
                <DatePicker 
                    onChange={handleDateChange}

                    style={{ marginRight: '10px' }}
                />
                <Select
                    placeholder="Select status"
                    value={filters.status}
                    onChange={handleSelectChange('status')}
                    style={{ width: '150px', marginRight: '10px' }}
                >
                    {statusTypes.map((statue, index) => (
                            <Option key={index} value={statue.value}>
                                <Badge color={statue.color} text={statue.text} />
                            </Option>
                     ))}
                </Select>
                <Select
                    placeholder="Select shift"
                    value={filters.shift}
                    onChange={handleSelectChange('shift')}
                    style={{ width: '150px', marginRight: '10px' }}
                >
                    {ShiftTypes.map((shift, index) => (
                        <Option key={index} value={shift.value}>
                            {shift.icon} {shift.text}
                        </Option>
                     ))}
                </Select>
                <Select
                    placeholder="Select area"
                    value={filters.area}
                    onChange={handleSelectChange('area')}
                    style={{ width: '150px' }}
                >
                    {AreaTypes.map((area, index) => (
                        <Option key={index} value={area.value}>
                            {area.icon} {area.text}
                        </Option>
                     ))}
                </Select>
                <Button type="primary" onClick={handleResetFilters}>Clear Filters</Button>
            </Flex>
        </Space.Compact>
    </Space>
  );
};

export default ReservationFilters;
