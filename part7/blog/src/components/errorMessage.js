import { useSelector } from "react-redux";
import { Alert, AlertTitle } from "@mui/material";

const Error = () => {
  const error = useSelector((state) => state.error);
  console.log(error);
  // if (!error) {
  //   return null;
  // }

  return (
    <div>
      {error && (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {error}
        </Alert>
      )}
    </div>
  );
};

export default Error;
