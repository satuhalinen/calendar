import Header from "../components/header/Header";
//import Footer from "../components/footer/Footer";
import { Outlet } from "react-router-dom";
export default function Root() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      {/*<Footer />*/}
    </>
  );
}
