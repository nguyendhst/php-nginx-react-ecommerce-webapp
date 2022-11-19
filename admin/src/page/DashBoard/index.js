import { useDispatch } from "react-redux";
import { useNavigate, Outlet, Link } from "react-router-dom";
import { ApartmentOutlined, UserOutlined } from "@ant-design/icons";
import { Row, Col, Button } from "antd";

import { logout } from "../../redux/admin";
import classes from "./DashBoard.module.scss";

function DashBoard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div>
      <div className={classes.header}>
        <div></div>
        <Button onClick={() => dispatch(logout())}>Log out</Button>
      </div>
      <div className={classes.wrapper}>
        <Row>
          <Col span={4} className={classes.menu}>
            <Row>
              <Col span={24}>
                <Link to="products">
                  <Button icon={<ApartmentOutlined />} ghost>
                    Products
                  </Button>
                </Link>
              </Col>
            </Row>
            {/* <Row>
              <Col span={24}>
                <Link to="users">
                  <Button icon={<UserOutlined />} ghost>
                    Users
                  </Button>
                </Link>
              </Col>
            </Row> */}
          </Col>
          <Col span={20} className={classes.content}>
            <Outlet />
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default DashBoard;
