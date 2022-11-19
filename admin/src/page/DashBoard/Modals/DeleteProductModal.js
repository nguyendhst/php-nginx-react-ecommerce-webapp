import { Modal, Typography } from "antd";

function DeleteProductModal({ isOpen, setIsOpen, product }) {
  const handleOk = () => {
    setIsOpen(false);
  };
  const handleCancel = () => {
    setIsOpen(false);
  };
  return (
    <>
      <Modal
        title={<Typography.Text>DELETE</Typography.Text>}
        open={isOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{ type: "danger" }}
      >
        <Typography.Text>Delete {product} ?</Typography.Text>
      </Modal>
    </>
  );
}

export default DeleteProductModal;
