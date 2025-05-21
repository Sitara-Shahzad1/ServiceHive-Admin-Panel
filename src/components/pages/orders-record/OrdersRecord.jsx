import React from 'react';
import { Table } from 'antd';
import './OrdersRecord.scss';
import { orderTableColumns } from '../../../constants/index';

const OrdersRecord = () => {
 

  const data = [
    {
      key: '1',
      serviceProvider: 'John Doe',
      phoneNumber: '123-456-7890',
      pendingOrders: 5,
      acceptedOrders: 10,
      arrivedOrders: 3,
      concludedOrders: 8,
      rejectedOrders: 2,
      cancelledOrders: 1,
    },
    {
      key: '2',
      serviceProvider: 'Jane Smith',
      phoneNumber: '987-654-3210',
      pendingOrders: 2,
      acceptedOrders: 7,
      arrivedOrders: 4,
      concludedOrders: 6,
      rejectedOrders: 1,
      cancelledOrders: 0,
    },
  ];

  return (
    <div className="orders-record">
      <h4>Orders Record</h4>
      <Table
        columns={orderTableColumns}
        dataSource={data}
        size="small" // Makes the table smaller
        className="small-table" // Custom class for additional styling
      />
    </div>
  );
};

export default OrdersRecord;