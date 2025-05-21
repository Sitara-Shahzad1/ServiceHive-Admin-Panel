import React, { useEffect, useState } from "react";
import { Table, Spin, Button, Modal, Form, Input, Switch } from "antd";
import { Select } from "antd";
const { Option } = Select;
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { serviceDetailTableColumns } from "../../../constants/index";
import {
  createNewService,
  getServiceCategories,
} from "../../../utils/axiosInstance";

function ServicesDetail() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(false);

  const payload = {
    serviceCategoryId: "680b55731eb96aea4c4d28ef",
    price: "123120",
    duration: "20",
    description: "Yellow",
    serviceProviderId: "682339643dec4aacf954f537",
    image: "abcd",
  };

  const handleCreateService = async () => {
    try {
      const response = await createNewService(payload);
      console.log("Service created:", response);
    } catch (error) {
      console.error("Failed to create service:", error);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      setLoadingCategories(true);
      try {
        console.log("Calling getServiceCategories API..."); // <-- Add this
        const response = await getServiceCategories();
        console.log("API Response:", response); // <-- Add this
        setCategories(response.data?.items); // Adjust if needed
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setData([
        {
          key: "1",
          name: "Service A",
          description: "Description A",
          active: true,
        },
        {
          key: "2",
          name: "Service B",
          description: "Description B",
          active: false,
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleEdit = (record) => {
    setEditingRecord(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDelete = (key) => {
    setData((prevData) => prevData.filter((item) => item.key !== key));
  };

  const handleModalOk = () => {
    form.validateFields().then((values) => {
      setData((prevData) =>
        prevData.map((item) =>
          item.key === editingRecord.key ? { ...item, ...values } : item
        )
      );
      setIsModalVisible(false);
      setEditingRecord(null);
      form.resetFields();
    });
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    form.validateFields().then((values) => {
      console.log("Modal Form Submitted:", values);
      // Optionally update local state or API call here

      // Clear and close
      form.resetFields();
      setIsModalOpen(false);
    });
  };

  const handleCancel = () => {
    console.log("Modal Cancelled");
    form.resetFields();
    setIsModalOpen(false);
  };

  return (
    <div>
      <h4>Service Details</h4>

      <Button
        type="primary"
        onClick={showModal}
        className="add-customer-button"
      >
        + Add Services
      </Button>

      <div className="table-container">
        <Table
          columns={[
            ...serviceDetailTableColumns,
            {
              title: "Actions",
              dataIndex: "actions",
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
          loading={loading}
          pagination={{ pageSize: 5 }}
        />
      </div>

      <Modal
        title="Edit Service"
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input />
          </Form.Item>
          <Form.Item name="active" label="Active" valuePropName="checked">
            <Switch />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Add Services"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          {/* <Form.Item
            name="serviceCategoryId"
            label="Service Category"
            rules={[{ required: true, message: "Please select a category" }]}
          >
            <Select
              placeholder="Select a service category"
              loading={loadingCategories}
            >
              {categories.map((category) => (
                <Option key={category._id} value={category._id}>
                  {category.name}
                </Option>
              ))}
            </Select>
          </Form.Item> */}

          <Form.Item
            name="serviceCategoryId"
            label="Service Category"
            rules={[{ required: true, message: "Please select a category" }]}
          >
            <Select
              placeholder="Select a service category"
              loading={loadingCategories}
            >
              {categories.map((category) => (
                <Option key={category._id} value={category._id}>
                  {category.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="discounted price (sar)"
            label="Discounted Price (SAR)"
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="duration"
            label="Duration"
            rules={[{ required: true, message: "Please Fill this feild" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="description "
            label="Description"
            row={6}
            rules={[
              { required: true, message: "Please Fill Your Description" },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default ServicesDetail;
