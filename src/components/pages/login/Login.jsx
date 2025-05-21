import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, Button, Typography, message } from "antd";
import axios from "axios";
import "./Login.scss";

const { Title } = Typography;

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Hide and disable sidebar and header
    const sidebarWrapper = document.querySelector(".sidebarWrapper");
    const header = document.querySelector(".header");
    if (sidebarWrapper) {
      sidebarWrapper.style.display = "none";
      sidebarWrapper.style.pointerEvents = "none";
    }
    if (header) header.style.display = "none";

    return () => {
      // Restore sidebar and header visibility and functionality when leaving the login page
      if (sidebarWrapper) {
        sidebarWrapper.style.display = "";
        sidebarWrapper.style.pointerEvents = "";
      }
      if (header) header.style.display = "";
    };
  }, []);

  const onFinish = async (values) => {
    try {
      debugger;
      const payload = {
        email: values.email,
        password: values.password,
      };

      const response = await axios.post(
        "http://142.93.211.139/api/V1/auth/login",
        payload
      );

      // Handle successful login
      const accessToken = response.data.accessToken;
      message.success("Login successful!");
      localStorage.setItem("token", accessToken); // Save token to localStorage
      navigate("/"); // Redirect to dashboard or another page
    } catch (error) {
      // Handle login failure
      console.error("Login failed:", error);
      message.error(
        error.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="login-page">
      <div className="login-image-section">
        {/* Add an image or background here */}
      </div>
      <div className="login-form-section">
        <Title level={2}>MF Blinds </Title>
        <Form
          name="login"
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          className="login-form"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Login
            </Button>
          </Form.Item>
        </Form>
        <div className="login-links">
          <Link to="/forgot-password" className="forgot-password-link">
            Forgot Password?
          </Link>
          <p>
            Don't have an account?{" "}
            <Link to="/signup" className="signup-link">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
