import { Header } from "../components/Header";
import { Outlet } from "react-router-dom";

const PrivateRouter = () => {
  return (
    <div>
      <div> Public Router </div>
      <Outlet />
    </div>
  );
}

export default PrivateRouter;