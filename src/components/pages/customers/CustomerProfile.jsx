// import React, { useEffect, useState } from 'react';
// import { useLocation, useParams } from 'react-router-dom';
// import { Form, Input, Button, Spin } from 'antd';

// import axiosInstance from '../../../utils/axiosInstance';
// import  './CustomerProfile.scss';


// const CustomerProfile = () => {
//   const { id } = useParams();
//   const [customer, setCustomer] = useState(null);
//   const location = useLocation();
//   const user = location.state
//   const path = location.pathname
//   debugger

//    const fetchCustomer = async () => {
//       try {
//         const response = await axiosInstance.get(`/admin/get-user/${id}`);
//         setCustomer(response.data);
//       } catch (error) {
//         console.error('Error fetching customer profile:', error);
//       }
//     };

//   useEffect(() => {
//   //  fetchCustomer();
//   }, [id]);

//   return (
//     <div>
//       <h2>Customer Info </h2>
//       {customer ? (
//         <pre>{JSON.stringify(customer, null, 2)}</pre>
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// };

// export default CustomerProfile;



// ********** Extra Code

// import { useParams } from 'react-router-dom';

// const CustomerProfile = () => {
//   const { id } = useParams();

//   // fetch customer data using `id`

//   return (
//     <div>
//       <h2>Customer Profile for ID: {id}</h2>

//     <h3 > Working Fine </h3>
//       {/* Render customer details here */}
//     </div>

//   );
// };

// export default CustomerProfile;




// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axiosInstance from "../../../utils/axiosInstance";
// import { Form, Input, Button, Spin } from "antd";
// import "./CustomerProfile.scss";

// const CustomerProfile = () => {
//   const { id } = useParams();
//   const [customer, setCustomer] = useState(null);
//   const [form] = Form.useForm();
//   const [loading, setLoading] = useState(true);

//   const fetchCustomer = async () => {
//     try {
//       debugger;
//       const response = await axiosInstance.get(`/admin/get-user/${id}`);
//       debugger;
//       setCustomer(response.data);
//       form.setFieldsValue({
//         name: response.data.name,
//         email: response.data.email,
//         description: response.data.description || "",
//       });
//     } catch (error) {
//       console.error("Error fetching customer profile:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCustomer();
//   }, [id]);

//   const onFinish = (values) => {
//     console.log("Updated values:", values);
//     // You can make a PUT or PATCH request here to update the customer
//   };

//   if (loading) return <Spin tip="Loading customer..." />;

//   return (
//     <div className="customer-profile-container">
//       <h2>Customer Profile</h2>

//       <div className="form-section">
//         <Form form={form} layout="vertical" onFinish={onFinish}>
//           <Form.Item
//             name="name"
//             label="Name"
//             rules={[{ required: true, message: "Please Enter the name" }]}
//           >
//             <Input placeholder="Customer name" />
//           </Form.Item>

//           <Form.Item
//             name="email"
//             label="Email"
//             rules={[{ required: true, message: "Please Enter the email" }]}
//           >
//             <Input placeholder="Email address" />
//           </Form.Item>

//           <Form.Item name="description " label="Description">
//             <Input.TextArea
//               rows={4}
//               placeholder="Enter your Description about User "
//             />
//           </Form.Item>

//           <Form.Item name="IsVerified" label="IsVerified">
//             <Input.TextArea rows={4} placeholder="Yes / No " />
//           </Form.Item>

//           <Form.Item name="address" label="Address">
//             <Input.TextArea rows={4} placeholder="Enter your address " />
//           </Form.Item>

//           <Form.Item>
//             <Button type="primary" htmlType="submit">
//               Update Profile
//             </Button>
//           </Form.Item>
//         </Form>
//       </div>
//     </div>
//   );
// };

// export default CustomerProfile;




import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Form, Input, Button, Spin } from 'antd';

import axiosInstance from '../../../utils/axiosInstance';
import './CustomerProfile.scss';
import profileImg from './profile.jpg';


const CustomerProfile = () => {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const [form] = Form.useForm();
  const location = useLocation();
  const user = location.state;
  const path = location.pathname;

  const fetchCustomer = async () => {
    try {
      const response = await axiosInstance.get(`/admin/get-user/${id}`);
      setCustomer(response.data);
      form.setFieldsValue({
        name: response.data.name,
        age: response.data.age,
        description: response.data.description,
        phone: response.data.phone,
      });
    } catch (error) {
      console.error('Error fetching customer profile:', error);
    }
  };

  useEffect(() => {
    // fetchCustomer();
  }, [id]);

  const onFinish = (values) => {
    console.log('Form Submitted:', values);
    // Handle form submission here (e.g., update the customer via API)
  };

  return (
    
       <div className="customer-profile-container">
       <h2>Customer Profile Info </h2>

       <div className="form-section">
       
         <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item className="image-profile">
    <img
      src={profileImg}
      alt="Profile"
      style={{ width: 120, height: 120, borderRadius: '50%', objectFit: 'cover' }}
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

          <Form.Item name="description " label="Description">
            <Input.TextArea
              rows={4}
              placeholder="Enter your Description about User "
            />
          </Form.Item>

          <Form.Item name="IsVerified" label="IsVerified">
            <Input.TextArea rows={2} placeholder="Yes / No " />
          </Form.Item>

          <Form.Item name="address" label="Address">
            <Input.TextArea rows={4} placeholder="Enter your address " />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update Profile
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default CustomerProfile;
