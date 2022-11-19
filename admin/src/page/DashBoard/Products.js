import { Typography, Space, Table, Button,Image } from "antd";
import { useState } from "react";

import classes from "./Products.module.scss";
import NewProductModal from "./Modals/NewProductModal";
import EditProductModal from "./Modals/EditProductModal";
import DeleteProductModal from "./Modals/DeleteProductModal";

function Groups() {
  const [isDeleteProductModalOpen, setIsDeleteProductModalOpen] = useState(false);
  const [isEditProductModalOpen, setIsEditProductModalOpen] = useState(false);

  const columns = [
    {
      title: "NO",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (_, record) => (
        <Space size="middle">
          <Image
            width={50}
            src={record.image}
          />
        </Space>
      ),
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
          <Button type="primary" onClick={() => setIsEditProductModalOpen(true)}>
            Edit
          </Button>
          <Button type="danger" onClick={() => setIsDeleteProductModalOpen(true)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];
  let data = [
    {
      key: 1,
      name: "AirpodPro Vip",
      price: 500,
      image:
        "data:image/jpeg;base64,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",
      description: "Hàng ngon",
    },
  ];
  return (
    <div className={classes.wrapper}>
      <div className={classes.header}>
        <Typography.Text>Products Setting</Typography.Text>
        <div className={classes.option}>
          <NewProductModal />
        </div>
      </div>
      <Table scroll={{ y: 500, x: 0 }} columns={columns} dataSource={data} />
      <DeleteProductModal
        isOpen={isDeleteProductModalOpen}
        setIsOpen={setIsDeleteProductModalOpen}
        product="AirpodPro Vip"
      />
      <EditProductModal
        isOpen={isEditProductModalOpen}
        setIsOpen={setIsEditProductModalOpen}
        product="AirpodPro Vip"
      />
    </div>
  );
}

export default Groups;
