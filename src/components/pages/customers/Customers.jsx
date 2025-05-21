import React , { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Switch } from 'antd';
import './Customers.scss';
import { customerTableColumns } from '../../../constants/index';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import axiosInstance from '../../../utils/axiosInstance'; // 
// import { createCustomer } from '../../API/NewCustomer/NewCustomer';
import { createCustomer } from '/src/components/API/NewCustomer/NewCustomer.jsx';
import { useNavigate } from 'react-router-dom';

const Customers = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [data, setData] = useState([]);
  const [editingRecord, setEditingRecord] = useState(null);
  const [form] = Form.useForm();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axiosInstance.get('/admin/get-all-users?role=CUSTOMER&page=1&limit=5');
        const formattedData = response.data.items.map((item, index) => ({
  key: index + 1,
  id: item._id, // Add the ID for linking to profile
  name: item.name,
  email: item.email,
  phone: item.phoneNumber,
  isVerified: item.isVerified,
}));

        setData(formattedData);
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };

    fetchCustomers();
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleEdit = (record) => {
    setEditingRecord(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDelete = (key) => {
    setData((prevData) => prevData.filter((item) => item.key !== key));
  };
  const handleOk = async () => {
    const values = form.getFieldsValue();
  
    const payload = {
      "name": values.name,
      "email": values.email,
      "phoneNumber": values.phone,
      "role": "CUSTOMER",
      "image": "string",
      "password": "@admin123!",
      "serviceProviderName": "string",
      "address": "string",
      "location": {
          "type": "Point",
          "coordinates": [
              24.774265,
              46.738586
          ]
      },
    }
    debugger
    try {
      const res = await createCustomer(payload);
      
      debugger
    } catch (error) {
      console.error( error);
    }

    
    setEditingRecord(null);
    form.resetFields();
    setIsModalVisible(false);
  };
  
  const handleCancel = () => {
    setEditingRecord(null);
    setIsModalVisible(false);
    form.resetFields();
  };

  
  return (
    <div>
      <Button
        type="primary"
        onClick={showModal}
        className="add-customer-button"
      >
        Add Customer
      </Button>
      <h4>Registered Customers</h4>

      
      {/* <Table
        className="table"
        columns={[
          ...customerTableColumns,
          {
            title: 'Actions',
            dataIndex: 'actions',
            render: (_, record) => (
              <>
                <Button
                  type="link"
                  icon={<EditOutlined />}
                  onClick={() => handleEdit(record)}
                />
                <Button
                  type="link"
                  icon={<DeleteOutlined />}
                  danger
                  onClick={() => handleDelete(record.key)}
                />
              </>
            ),
          },
        ]}
        dataSource={data}
      /> */}


{/* <Table
  className="table"
  columns={[
    {
      title: 'Customer ID',
      dataIndex: 'id',
      render: (text, record) => (
        <Button type="link" onClick={() => navigate(`/customer-profile/${record.id}`)}>
          {record.id}
        </Button>
      ),
    },
    ...customerTableColumns,
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (_, record) => (
        <>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          />
          <Button
            type="link"
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDelete(record.key)}
          />
        </>
      ),
    },
  ]}
  dataSource={data}
/> */}


<Table
  className="table"
  columns={[
    {
      title: 'Customer ID',
      dataIndex: 'id',
    },
    ...customerTableColumns,
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (_, record) => (
        <>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={(e) => {
              e.stopPropagation(); // Prevent row click
              handleEdit(record);
            }}
          />
          <Button
            type="link"
            icon={<DeleteOutlined />}
            danger
            onClick={(e) => {
              e.stopPropagation(); // Prevent row click
              handleDelete(record.key);
            }}
          />
        </>
      ),
    },
  ]}
  dataSource={data}
  onRow={(record) => ({
    onClick: () => navigate(`/customer-profile/${record.id}`),
  })}
/>

      <Modal
        title={editingRecord ? 'Edit Customer' : 'Add Customer'}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please enter the name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: 'Please enter the email' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Phone Number"
            rules={[{ required: true, message: 'Please enter the phone number' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="isVerified"
            label="Is Verified"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Customers;