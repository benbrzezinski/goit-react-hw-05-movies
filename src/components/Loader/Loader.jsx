import { Triangle } from "react-loader-spinner";
import PropTypes from "prop-types";

const Loader = ({ isLoading = true }) => (
  <Triangle
    height="100"
    width="100"
    color="#dc143c"
    ariaLabel="triangle-loading"
    wrapperStyle={{
      position: "fixed",
      top: "32%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      zIndex: "100",
    }}
    visible={isLoading}
  />
);

Loader.propTypes = {
  isLoading: PropTypes.bool,
};

export default Loader;
