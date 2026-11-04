import "./App.css";
import { lazy, Suspense } from "react";
import  NavbarData  from "./Component/Navbar";
import Banner from "./Component/Banner";
import Catgory from "./Component/Catgory";
import Footer from "./Component/Footer";

const ProductListing = lazy(() => import("./Component/ProductListing"));

function App() {
  const params = new URLSearchParams(window.location.search);
  const category = params.get("category");

  if (window.location.pathname === "/products" && category) {
    return (
      <>
        <NavbarData />
        <Suspense fallback={<main className="page-loading">Loading products…</main>}>
          <ProductListing category={category} />
        </Suspense>
        <Footer />
      </>
    );
  }

  return (
 <>
  <NavbarData/>
  <Banner />
  <Catgory />
  <Footer />
 </>
  );
}

export default App;
