import React, { useState, useEffect } from "react";
import * as FaIcons from "react-icons/fa";
import "./Home.scss";
import CustomTable from "../../common/custom-table/CustomTable";
import axiosInstance from "../../../utils/axiosInstance"; // <-- use axiosInstance now
import axios from "axios"; // still needed for countries API (different base URL)
import { Select } from "antd";
import { countryTableColumns } from "../../../constants";
import { userStatistics } from "../../API/Dashboard";

const { Option } = Select;

const Home = () => {
  const [allCountries, setAllCountries] = useState([]);
  const [countryData, setCountryData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dropdownCountries, setDropdownCountries] = useState([]);
  const [loadedCount, setLoadedCount] = useState(10);

  // User stats
  const [statsData, setStatsData] = useState({
    serviceProviders: 0,
    customers: 0,
    totalOrders: 0,
  });

  const fetchData = async () => {
    try {
      // debugger;
      // Fetch user statistics using axiosInstance
      const statsResponse = await userStatistics();
      debugger;
      // const stats = statsResponse.data;
      setStatsData(statsResponse);

      // Fetch countries (from external API)
      // const countriesResponse = await axios.get(
      //   "https://restcountries.com/v3.1/all"
      // );
      // const data = countriesResponse.data;

      // const formattedData = data.map((country, index) => {
      //   const name = country.name?.common || "N/A";
      //   const capital = country.capital?.[0] || "N/A";
      //   const code = country.cca2 || "N/A";
      //   let currency = "N/A";

      //   if (country.currencies) {
      //     for (const key in country.currencies) {
      //       currency = key;
      //       break;
      //     }
      //   }

      //   const population = country.population
      //     ? country.population.toLocaleString()
      //     : "N/A";

      //   return {
      //     key: index,
      //     name,
      //     capital,
      //     code,
      //     currency,
      //     population,
      //   };
      // });

      // formattedData.sort((a, b) => a.name.localeCompare(b.name));

      // setAllCountries(formattedData);
      // setDropdownCountries(formattedData.slice(0, 10));
      // setCountryData(formattedData);
      // setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Load more countries on scroll
  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;

    if (scrollTop + clientHeight >= scrollHeight - 5) {
      const newCount = loadedCount + 10;
      const moreCountries = allCountries.slice(0, newCount);
      setDropdownCountries(moreCountries);
      setLoadedCount(newCount);
    }
  };

  const handleSelect = (value) => {
    if (value === "all") {
      setCountryData(allCountries);
    } else {
      const filtered = allCountries.filter((c) => c.name === value);
      setCountryData(filtered);
    }
  };

  return (
    <div className="home-container">
      <div className="dashboard">
        <div className="heading">Dashboard</div>
        <div className="cards">
          <div className="card">
            <div className="icon">
              <FaIcons.FaUserCog />
            </div>
            <div className="text">Service Providers</div>
            <div className="value">{statsData?.serviceProviders}</div>
          </div>
          <div className="card">
            <div className="icon">
              <FaIcons.FaUsers />
            </div>
            <div className="text">Active Customers</div>
            <div className="value">{statsData?.customers}</div>
          </div>
          <div className="card">
            <div className="icon">
              <FaIcons.FaClipboardList />
            </div>
            <div className="text">Total Orders</div>
            <div className="value">{statsData?.totalOrdersCount}</div>
          </div>
        </div>
      </div>

      <div className="table-details">
        <div className="heading">Countries</div>
        <div style={{ marginBottom: 16, maxWidth: 300 }}>
          <Select
            showSearch
            style={{ width: "100%" }}
            placeholder="Select a country"
            onPopupScroll={handleScroll}
            onSelect={handleSelect}
            optionFilterProp="children"
          >
            <Option value="all">All Countries</Option>
            {dropdownCountries.map((country) => (
              <Option key={country.key} value={country.name}>
                {country.name}
              </Option>
            ))}
          </Select>
        </div>

        {/* Country table */}
        <CustomTable
          columns={countryTableColumns}
          dataSource={countryData}
          loading={loading}
          pagination={{ pageSize: 10 }}
        />
      </div>
    </div>
  );
};

export default Home;
