import { Modal, Button, Form, Input, Select,Typography } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { useState } from "react";
import { UsergroupAddOutlined } from "@ant-design/icons";

function NewUserModal() {
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
        New user
      </Button>
      <Modal
        title={<Typography.Text>NEW USER</Typography.Text>}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form layout="vertical">
          <Form.Item label="Enter username" name="name">
            <Input />
          </Form.Item>
          <Form.Item label="Enter password" name="password">
            <Input.Password
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>
          <Form.Item label="Choose groups" name="groups">
            <Select mode="multiple" allowClear>
              <Select.Option key="A">Group1</Select.Option>
              <Select.Option key="B">Group2</Select.Option>
              <Select.Option key="C">Group3</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Enter description" name="description">
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default NewUserModal;
