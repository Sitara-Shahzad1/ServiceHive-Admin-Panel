// import { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./App.scss";
import Home from "./components/pages/home/Home";
import Customers from "./components/pages/customers/Customers";
import CustomerProfile from "./components/pages/customers/CustomerProfile";
import LayoutWrapper from "./components/layout-wrapper/layoutWrapper";
import ServiceCategories from "./components/pages/service-categories/ServiceCategories";
import ServiceProviders from "./components/pages/service-providers/ServiceProviders";
import OrdersRecord from "./components/pages/orders-record/OrdersRecord";
import Login from "./components/pages/login/Login";
import Profile from "./components/common/profile/Profile";
import ServiceProviderInfo from "./components/pages/service-providers/serviceProviderInfo";
import ServicesDetail from "./components/pages/service-providers/ServicesDetail";
// import NewCustomer from './components/API/NewCustomer/NewCustomer';

function App() {
  // const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path="/" element={<LayoutWrapper />}>
        <Route path="/login" element={<Login />} />
        <Route index element={<Home />} />
        <Route path="/service-categories" element={<ServiceCategories />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/customer-profile/:id" element={<CustomerProfile />} />
        <Route path="/service-providers" element={<ServiceProviders />} />
        <Route path="/service-provider-info/:id"  element={<ServiceProviderInfo />}/>
        <Route path="/services-detail/:id"  element={<ServicesDetail />}/>
        <Route path="/orders-record" element={<OrdersRecord />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}

export default App;
