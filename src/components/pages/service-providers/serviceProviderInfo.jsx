import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Table, Button, Modal, Form, Input, Switch } from "antd";
import axiosInstance from "../../../utils/axiosInstance";
import { getServiceProviderById } from "../../API/NewCustomer/NewCustomer";
import profileImg from "../customers/profile.jpg";
import ServicesDetails from "./ServicesDetail";

const ServiceProviderInfo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const { id } = useParams();
  const location = useLocation();
  const user = location.state;
  const path = location.pathname;
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

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
  useEffect(() => {
  if (user) {
    form.setFieldsValue({
      name: user.name,
      email: user.email,
      phone: user.phone,
      cutPercentage: user.cutPercentage?.replace("%", "") || "0",
      isVerified: user.isVerified,
      description: user.description || "",
    });
    setLoading(false);
  } else {
    // fallback if user comes directly without state (refresh)
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get(`/admin/get-user-by-id/${id}`);
        const userData = response.data;

        const formatted = {
          key: userData._id,
          name: userData.name,
          email: userData.email,
          phone: userData.phoneNumber,
          cutPercentage: `${userData.cutPercentage}%`,
          isVerified: userData.isVerified,
          description: userData.description || "",
        };

        form.setFieldsValue(formatted);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch service provider:", error);
        setLoading(false);
      }
    };

    fetchUser();
  }
}, [user, id]);


  const onFinish = (values) => {
    console.log("Form Submitted:", values);
    // Update user profile here
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
    <div className="customer-profile-container">
      <h2>Service Provider Info</h2>

      <div className="btn-section">
        <Button
          type="primary"
          onClick={() => navigate(`/service-providers/:id/services`)}
          className="add-customer-button"
        >
          + Manage Services
        </Button>

        <Button
          type="primary"
          onClick={showModal}
          className="add-customer-button"
        >
          + Add Customer
        </Button>
      </div>

      <div className="form-section">
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item className="image-profile">
            <img
              src={profileImg}
              alt="Profile"
              style={{
                width: 120,
                height: 120,
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          </Form.Item>

          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please Enter the name" }]}
          >
            <Input placeholder="Customer name" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Please Enter the email" }]}
          >
            <Input placeholder="Email address" />


          </Form.Item>

          <Form.Item
            name="phone"
            label="Phone Number"
            rules={[{ required: true, message: "Please Enter Your Phone Number" }]}
          >
            <Input placeholder="Phone Number" />
          </Form.Item>


          <Form.Item
            name="rating"
            label="Rating"
            
          >
            <Input placeholder="Rating" />
          </Form.Item>

          <Form.Item name="description" label="Description">
            <Input.TextArea
              rows={4}
              placeholder="Enter description about user"
            />
          </Form.Item>

          <Form.Item name="IsVerified" label="IsVerified">
            <Input.TextArea rows={2} placeholder="Yes / No" />
          </Form.Item>

      

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update Profile
            </Button>
          </Form.Item>
        </Form>

        {/* Modal */}
        <Modal
          title="Add Customer"
          open={isModalOpen}
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
              name="isVerified"
              label="Is Verified"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default ServiceProviderInfo;
