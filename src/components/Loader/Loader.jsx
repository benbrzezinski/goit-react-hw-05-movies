import { TailSpin } from "react-loader-spinner";
import PropTypes from "prop-types";
import scss from "./Loader.module.scss";

const Loader = ({ isLoading = true }) => (
  <TailSpin
    height="100"
    width="100"
    color="#a80f2e"
    ariaLabel="tail-spin-loading"
    radius="1"
    wrapperClass={scss.loaderWrapper}
    visible={isLoading}
  />
);

Loader.propTypes = {
  isLoading: PropTypes.bool,
};

export default Loader;
