import { forwardRef, useImperativeHandle } from "react";
import { Button } from "@mui/material";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { formVisibility } from "../reducers/blogFormReducer";
const Togglable = forwardRef((props, refs) => {
  const dispatch = useDispatch();
  const visible = useSelector((state) => state.formVisibility);
  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    dispatch(formVisibility(visible ? false : true));
  };
  useImperativeHandle(refs, () => {
    return { toggleVisibility };
  });

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button onClick={toggleVisibility} variant="contained" color="primary">
          {props.buttonLabel}
        </Button>
        <br />
        <br />
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button
          onClick={() => dispatch(formVisibility(false))}
          variant="contained"
          color="error"
        >
          cancel
        </Button>
        <br />
        <br />
      </div>
    </div>
  );
});

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

Togglable.displayName = "Togglable";
export default Togglable;
