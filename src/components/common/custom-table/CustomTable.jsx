import React from "react";
import { Table, Button } from "antd";
import "./CustomTable.scss";

const CustomTable = ({ columns, dataSource, loading, pagination }) => {
  const handleRowClicked = (e, record) => {
    debugger;
  };
  return (
    <div className="custom-table-container">
      <Table
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        rowKey={(record) => record.id || record.key}
        onRow={(record) => {
          return {
            onClick: (e) => {
              handleRowClicked(e, record);
            },
          };
        }}
        // pagination={false}
        pagination={pagination} // ✅ Make sure this is passed
        footer={() => (
          <div className="see-more-container">
            {/* <Button type="primary" className="see-more-button">
              See More
            </Button> */}
          </div>
        )}
      />
    </div>
  );
};

export default CustomTable;
