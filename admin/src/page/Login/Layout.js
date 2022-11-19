import classes from "./Layout.module.scss";

const Layout = (props) => {
  return (
    <div className={classes.content}>
      <div className={classes.wrapper}>{props.children}</div>
    </div>
  );
};

export default Layout;
