import scss from "./CopyrightFooter.module.scss";

const CopyrightFooter = () => {
  return (
    <div className={scss.wrapper}>
      <p className={scss.text}>
        &copy; 2023 WebSite Movies All Rights Reserved
      </p>
      <p className={scss.text}>
        Developed by{" "}
        <a
          className={scss.link}
          href="https://github.com/benbrzezinski"
          target="_blank"
          rel="noopener noreferrer nofollow"
        >
          Beniamin Brzeziński
        </a>
      </p>
    </div>
  );
};

export default CopyrightFooter;
