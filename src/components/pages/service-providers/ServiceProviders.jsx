import React, { useEffect, useState } from "react";
import { Table, Spin, Button, Modal, Form, Input, Switch } from "antd";
import "./ServiceProviders.scss";
import { serviceTableColumns } from "../../../constants/index";
import axiosInstance from "../../../utils/axiosInstance";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import ServiceProviderInfo from "./serviceProviderInfo";

const ServiceProviders = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [form] = Form.useForm();

  const navigate = useNavigate();

  // Fetch service providers on mount
  useEffect(() => {
    const fetchServiceProviders = async () => {
      try {
        const response = await axiosInstance.get(
          "/admin/get-all-users?role=SERVICE_PROVIDER&page=1&limit=5"
        );
        const serviceProviders = response.data?.items || [];

        const formatted = serviceProviders.map((user, index) => ({
          key: user._id || index,
          name: user.name || "N/A",
          email: user.email,
          phone: user.phoneNumber || "N/A",
          cutPercentage: user.cutPercentage ? `${user.cutPercentage}%` : "0%",
          isVerified: user.isVerified || false,
        }));

        console.log("Service Providers:", response.data);
        setData(formatted);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch service providers:", error);
        setLoading(false);
      }
    };

    fetchServiceProviders();
  }, []);

  const handleEdit = (record) => {
    debugger;
    setEditingRecord(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleDelete = (key) => {
    setData((prevData) => prevData.filter((item) => item.key !== key));
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      setData((prevData) =>
        prevData.map((item) =>
          item.key === editingRecord.key ? { ...item, ...values } : item
        )
      );
      setEditingRecord(null);
      setIsModalVisible(false);
      form.resetFields();
    });
  };

  const handleCancel = () => {
    setEditingRecord(null);
    setIsModalVisible(false);
    form.resetFields();
  };

  return (
    <div className="service-providers">
      <h4>Service Providers</h4>

      <Button
        type="primary"
        onClick={showModal}
        className="add-customer-button"
      >
        + Edit Service Provider
      </Button>

      <Table
        columns={[
          ...serviceTableColumns,
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
        onRow={(record) => ({
          onClick: () => navigate(`/service-provider-info/${record.key}` , {state: record}),
        })}
      />
      <Modal
        title="Edit Service Provider"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please enter the name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Please enter the email" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Phone Number"
            rules={[
              { required: true, message: "Please enter the phone number" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="cutPercentage"
            label="Cut Percentage"
            rules={[
              { required: true, message: "Please enter the cut percentage" },
            ]}
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

export default ServiceProviders;
