import { Triangle } from "react-loader-spinner";

const Loader = () => (
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
    visible={true}
  />
);

export default Loader;
