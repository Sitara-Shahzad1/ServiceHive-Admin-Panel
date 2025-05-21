import React from 'react';
import { Button } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

// src/constants/index.js

export const countryTableColumns = [
    {
      title: 'Country',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Capital',
      dataIndex: 'capital',
      key: 'capital',
    },
    {
      title: 'Country Code',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Currency',
      dataIndex: 'currency',
      key: 'currency',
    },
    {
      title: 'Population',
      dataIndex: 'population',
      key: 'population',
    },
  ];
  
  export const orderTableColumns = [
    {
      title: 'Service Provider',
      dataIndex: 'serviceProvider',
      key: 'serviceProvider',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: 'Pending Orders',
      dataIndex: 'pendingOrders',
      key: 'pendingOrders',
    },
    {
      title: 'Accepted Orders',
      dataIndex: 'acceptedOrders',
      key: 'acceptedOrders',
    },
    {
      title: 'Arrived Orders',
      dataIndex: 'arrivedOrders',
      key: 'arrivedOrders',
    },
    {
      title: 'Concluded Orders',
      dataIndex: 'concludedOrders',
      key: 'concludedOrders',
    },
    {
      title: 'Rejected Orders',
      dataIndex: 'rejectedOrders',
      key: 'rejectedOrders',
    },
    {
      title: 'Cancelled Orders',
      dataIndex: 'cancelledOrders',
      key: 'cancelledOrders',
    },
  ];

export const customerTableColumns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: 'Phone Number',
        dataIndex: 'phone',
        key: 'phone',
      },
      {
        title: 'Is Verified',
        dataIndex: 'isVerified',
        key: 'isVerified',
        render: (text) => (text ? 'Yes' : 'No'),
      },
    
  ];

export const serviceTableColumns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: 'Phone',
        dataIndex: 'phone',
        key: 'phone',
      },
      {
        title: 'Cut %',
        dataIndex: 'cutPercentage',
        key: 'cutPercentage',
      },
      {
        title: 'Is Verified',
        dataIndex: 'isVerified',
        key: 'isVerified',
        render: (text) => (text ? 'Yes' : 'No'),
      },
      
];


export const serviceDetailTableColumns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Price (SAR)',
        dataIndex: 'Price (SAR)',
        key: 'Price (SAR)',
      },
      {
        title: 'Discounted Price ',
        dataIndex: 'discounted price',
        key: 'discounted price',
      },
      {
        title: 'Duration ',
        dataIndex: 'duration',
        key: 'duration',
      },
      {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
        
      },
      
];

export const servicecategoriesColumns= [
  {
    title: 'Category Name',
    dataIndex: 'categoryName',
    key: 'categoryName',
  },
       {
          title: 'Image',
          dataIndex: 'image',
          key: 'image',
        },
   
];
    
export const CustomerProfileColumns= [
  
   {
  title: 'ID',
  dataIndex: 'id',
  render: (text, record) => (
    <Button type="link" onClick={() => navigate(`/customer-profile/${record.id}`)}>
      {record.id}
    </Button>
  ),
},

];
    