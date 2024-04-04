import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import { Outlet } from "react-router-dom";
export default function Root() {
  return (
    <main>
      <Header />
      <Outlet />
      <Footer />
    </main>
  );
}
