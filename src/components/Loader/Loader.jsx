import { Circles } from "react-loader-spinner";

const Loader = () => {
  return (
    <div
      style={{ display: "flex", justifyContent: "center", margin: "20px 0" }}
    >
      <Circles height="80" width="80" color="#4fa94d" ariaLabel="loading" />
    </div>
  );
};

export default Loader;
