import { Modal, Form, Input, Select, Typography, Upload,Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";


function EditProductModal({ isOpen, setIsOpen, product }) {
  const handleOk = () => {
    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };
  return (
    <>
      <Modal
        title={<Typography.Text>{product}</Typography.Text>}
        open={isOpen}
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

export default EditProductModal;
