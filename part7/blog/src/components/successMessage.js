const Success = ({ success }) => {
  if (!success) {
    return null;
  }
  return <div className="success">{success}</div>;
};

export default Success;
