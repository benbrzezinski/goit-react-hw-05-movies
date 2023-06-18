import { Triangle } from "react-loader-spinner";
import PropTypes from "prop-types";
import scss from "./Loader.module.scss";

const Loader = ({ isLoading = true }) => (
  <Triangle
    height="100"
    width="100"
    color="#dc143c"
    ariaLabel="triangle-loading"
    wrapperClass={scss.loaderWrapper}
    visible={isLoading}
  />
);

Loader.propTypes = {
  isLoading: PropTypes.bool,
};

export default Loader;
