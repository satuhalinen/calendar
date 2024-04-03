import Header from "../components/header/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
export default function Root() {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
