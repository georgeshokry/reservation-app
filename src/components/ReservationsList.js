import React, { useState } from 'react';
import { Table, Badge } from 'antd';
import {  compareAsc, format } from 'date-fns';
import {statusTypes, ShiftTypes, AreaTypes, dataFiltration} from '../utils/renderData'

const timeStampFormat = 'hh:mm a'

const ReservationList = ({ reservations, filters, dateFormate }) => {
  const [sortedInfo, setSortedInfo] = useState({});
  // render badge based on status type
  const getStatusBadge = (status) => {
    const statusType = statusTypes.find(option => option.value.toLowerCase() === status.toLowerCase());
    return statusType ? <Badge color={statusType.color} text={statusType.text} /> : status;
  };
  // render icon based on shift type
  const getShiftBadge = (shift) => {
    const shiftType = ShiftTypes.find(option => option.value.toLowerCase() === shift.toLowerCase());
    return shiftType ? (
      <span>
        {shiftType.icon}  {shiftType.text}
      </span>
    ) : shift;
  }
  // render icon based on area type
  const getAreaBadge = (area) => {
    const areaType = AreaTypes.find(option => option.value.toLowerCase() === area.toLowerCase());
    return areaType ? (
      <span>
        {areaType.icon}  {areaType.text}
      </span>
    ) : area;
  }
  const handleTableChange = (pagination, filters, sorter) => {
    setSortedInfo(sorter);
  };

  const filteredData = reservations.filter((item) => {
    return dataFiltration(item, filters, dateFormate)
  });

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.id - b.id,
      sortOrder: sortedInfo.columnKey === 'id' && sortedInfo.order,
    },
    {
      title: 'Name',
      dataIndex: 'customer',
      key: 'name',
      render: (customer) => `${customer.firstName} ${customer.lastName}`,
      sorter: (a, b) => a.customer.firstName.localeCompare(b.customer.firstName),
      sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
    },
    {
      title: 'Date',
      dataIndex: 'businessDate',
      key: 'date',
      render: (businessDate) => format(new Date(businessDate), 'dd-MMM-yyyy'),
      sorter: (a, b) => compareAsc(new Date(a.businessDate), new Date(b.businessDate)),
      sortOrder: sortedInfo.columnKey === 'date' && sortedInfo.order,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => getStatusBadge(status),
    },
    {
      title: 'Shift',
      dataIndex: 'shift',
      key: 'shift',
      render: (shift) => getShiftBadge(shift),
    },
    {
      title: 'Area',
      dataIndex: 'area',
      key: 'area',
      render: (area) => getAreaBadge(area),
    },
    {
      title: 'Start',
      dataIndex: 'start',
      key: 'start',
      render: (date) => format( new Date(date), timeStampFormat),
    },
    {
      title: 'End',
      dataIndex: 'end',
      key: 'end',
      render: (date) => format( new Date(date), timeStampFormat),
    },
    {
      title: 'Guest Notes',
      dataIndex: 'guestNotes',
      key: 'guestNotes',
    },
  ];

  return (
    <Table
        columns={columns}
        dataSource={filteredData}
        onChange={handleTableChange}
        rowKey="id"
        pagination={{ pageSize: 5 }}
        scroll={{ x: true }} 
        bordered
    />
  );
};

export default ReservationList;