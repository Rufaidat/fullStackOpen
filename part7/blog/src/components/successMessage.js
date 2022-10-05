import { useSelector } from "react-redux";

const Success = () => {
  const success = useSelector((state) => state.notifications);
  if (success === "") {
    return null;
  }
  console.log(success);
  return <div className="success">{success}</div>;
};

export default Success;
