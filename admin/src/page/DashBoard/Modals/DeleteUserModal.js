import { Modal, Typography } from "antd";

function DeleteUserModal({ isOpen, setIsOpen, user }) {
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
        <Typography.Text>Delete {user} ?</Typography.Text>
      </Modal>
    </>
  );
}

export default DeleteUserModal;
