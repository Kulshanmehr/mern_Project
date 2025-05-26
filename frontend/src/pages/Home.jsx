import Header from "../components/Header";
import Banner from "../components/Banner";
import Services from "../components/Services";
import Footer from "../components/Footer";
import "../styles/Home.css";
import Categories from "../components/Categories";
import Products from "../components/Products";

export default function Home() {
  return (
    <div>
      <Header />
      <Banner />
      <Services />
      <Categories />
      <Products />
      <Footer />
    </div>
  );
}
