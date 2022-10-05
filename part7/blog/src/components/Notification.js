import { useSelector } from "react-redux";

const Notification = () => {
  const error = useSelector((state) => state.notifications);
  console.log(error);
  if (!error) {
    return null;
  }

  return <div className="error">{error} title</div>;
};

export default Notification;
