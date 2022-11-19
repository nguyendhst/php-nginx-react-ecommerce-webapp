import { Typography, Space, Table, Button } from "antd";
import { useState } from "react";

import classes from "./Users.module.scss";
import NewUserModal from "./Modals/NewUserModal";
import EditUserModal from "./Modals/EditUserModal";
import DeleteUserModal from "./Modals/DeleteUserModal";

function Users() {
  const [isDeleteUserModalOpen, setIsDeleteUserModalOpen] = useState(false);
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);

  const columns = [
    {
      title: "NO",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Groups",
      dataIndex: "groups",
      key: "groups",
      render: (arr) => {
        return arr.join(", ");
      },
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary">Logs</Button>
          <Button type="primary" onClick={() => setIsEditUserModalOpen(true)}>
            Edit
          </Button>
          <Button type="danger" onClick={() => setIsDeleteUserModalOpen(true)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];
  let data = [
    {
      key: "1",
      username: "nguyenvanA",
      groups: ["Group1"],
      description: "Nguyễn Văn A, Phòng tài chính",
    },
    {
      key: "2",
      username: "tranvanB",
      groups: ["Group2"],
      description: "Trần Văn B, Phòng kinh doanh",
    },
    {
      key: "3",
      username: "caothiC",
      groups: ["Group3"],
      description: "Cao Thị C, Phòng giám đốc",
    },
    {
      key: "4",
      username: "Admin",
      groups: ["Group1", "Group2", "Group3"],
      description: "Ông Trùm",
    },
  ];
  return (
    <div className={classes.wrapper}>
      <div className={classes.header}>
        <Typography.Text>User setting</Typography.Text>
        <div className={classes.option}>
          <NewUserModal />
        </div>
      </div>
      <Table scroll={{ y: 500, x: 0 }} columns={columns} dataSource={data} />
      <DeleteUserModal
        isOpen={isDeleteUserModalOpen}
        setIsOpen={setIsDeleteUserModalOpen}
        user="nguyenvanA"
      />
      <EditUserModal
        isOpen={isEditUserModalOpen}
        setIsOpen={setIsEditUserModalOpen}
        user="nguyenvanA"
      />
    </div>
  );
}

export default Users;
