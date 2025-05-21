import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input } from 'antd';
import axios from 'axios';
import './ServiceCategories.scss';
import { servicecategoriesColumns } from '../../../constants/index';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';


const ServiceCategories = () => {
  const [data, setData] = useState([]);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false); // Add state for Add Modal
  const [editingRecord, setEditingRecord] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://142.93.211.139/api/V1/service-category?page=1&limit=10');
        const formattedData = response.data.items.map((item) => ({
          key: item._id, // use _id as a unique key
          categoryName: item.name, // map 'name' to 'categoryName'
          description: '-', // no description exists, so you can put a dash or leave blank
        }));
        setData(formattedData);
      } catch (error) {
        console.error('Error fetching service categories:', error);
      }
    };

    fetchData();
  }, []);

 
  const handleEditOk = () => {
    form.validateFields().then((values) => {
      setData((prevData) =>
        prevData.map((item) =>
          item.key === editingRecord.key ? { ...item, ...values } : item
        )
      );
      setIsEditModalVisible(false);
      setEditingRecord(null);
      form.resetFields();
    });
  };

  const handleEditCancel = () => {
    setIsEditModalVisible(false);
    setEditingRecord(null);
    form.resetFields();
  };

  const handleAddOk = () => {
    form.validateFields().then((values) => {
      const newCategory = {
        key: Date.now(), // Generate a unique key
        ...values,
      };
      setData((prevData) => [...prevData, newCategory]);
      setIsAddModalVisible(false);
      form.resetFields();
    });
  };

  const handleAddCancel = () => {
    setIsAddModalVisible(false);
    form.resetFields();
  };

  const handleEdit = (record) => {
    setEditingRecord(record);
    form.setFieldsValue(record);
    setIsEditModalVisible(true);
  };

  const handleDelete = (key) => {
    setData((prevData) => prevData.filter((item) => item.key !== key));
  };

  return (
    <div className="service-categories">
      <div className="header">
        <h4>Service Categories</h4>
        <Button type="primary" onClick={() => setIsAddModalVisible(true)}>
          Add Category
        </Button>
      </div>
      <Table
        columns={[
          ...servicecategoriesColumns,
          {
            title: 'Actions',
            dataIndex: 'actions',
            render: (_, record) => (
              <>
                <Button type="link"  icon={<EditOutlined />} onClick={() => handleEdit(record)}>
                  
                </Button>
                <Button type="link" icon={<DeleteOutlined />} danger onClick={() => handleDelete(record.key)}>
                  
                </Button>
              </>
            ),
          },
        ]}
        dataSource={data}
      />

      <Modal
        title="Edit Category"
        visible={isEditModalVisible}
        onOk={handleEditOk}
        onCancel={handleEditCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="categoryName"
            label="Category Name"
            rules={[{ required: true, message: 'Please enter the category name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please enter the description' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Add Category"
        visible={isAddModalVisible}
        onOk={handleAddOk}
        onCancel={handleAddCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="categoryName"
            label="Category Name"
            rules={[{ required: true, message: 'Please enter the category name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please enter the description' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ServiceCategories;