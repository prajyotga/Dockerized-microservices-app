
import Categories from "../components/Categories";
import Features from "../components/Features";
import Hero from "../components/Hero";
import PopularRestaurants from "../components/PopularRestaurants";
import Footer from "../components/Footer";



const Home = () => {
  

  return (
       <div className="home-page">
      <Hero />
      <Categories />
       <PopularRestaurants />
      <Features/>
      <Footer/>
    </div>
  );
};

export default Home;