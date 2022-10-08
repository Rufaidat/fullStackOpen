import { useSelector } from "react-redux";
import { Alert, AlertTitle } from "@mui/material";

const Success = () => {
  const message = useSelector((state) => state.success);
  if (message === "") {
    return null;
  }
  console.log(message);
  return (
    <div style={{ margin: "1rem 0" }}>
      {message && (
        <Alert severity="success">
          <AlertTitle>Success</AlertTitle>
          {message}
        </Alert>
      )}
    </div>
  );
};

export default Success;
