import { connect } from "react-redux";

const Notification = (props) => {
  const notification = props.notifications;
  console.log(notification);
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };
  if (!notification) {
    return null;
  }
  return <div style={style}>{notification}</div>;
};

const mapStateToProps = (state) => {
  return {
    notifications: state.notifications,
  };
};

export default connect(mapStateToProps)(Notification);
