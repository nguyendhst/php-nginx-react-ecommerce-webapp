import { Modal, Form, Input, Select, Typography } from "antd";

function EditUserModal({ isOpen, setIsOpen, user }) {
  const handleOk = () => {
    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };
  return (
    <>
      <Modal
        title={<Typography.Text>{user}</Typography.Text>}
        open={isOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form layout="vertical">
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

export default EditUserModal;
