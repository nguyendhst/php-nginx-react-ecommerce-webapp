import { Modal, Button, Form, Input, Upload, Typography } from "antd";
import { useState } from "react";
import { UsergroupAddOutlined, UploadOutlined } from "@ant-design/icons";

function NewProductModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button
        type="primary"
        onClick={showModal}
        icon={<UsergroupAddOutlined />}
      >
        New Product
      </Button>
      <Modal
        title={<Typography.Text>NEW PRODUCT</Typography.Text>}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form layout="vertical">
          <Form.Item label="Enter name" name="name">
            <Input />
          </Form.Item>
          <Form.Item label="Enter price" name="price">
            <Input />
          </Form.Item>
          <Form.Item label="Upload image" name="image">
            <Upload
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              listType="picture"
              maxCount={1}
            >
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item label="Enter description" name="description">
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default NewProductModal;
