import { useState, useRef, useEffect } from "react";
import "./App.css";
import useLocoScroll from "./hooks/useLocoScroll";
import About from "./components/About";
import Cursor from "./components/Cursor";
import Featured from "./components/Featured";
import Footer from "./components/Footer";
import Gallery from "./components/Gallery";
import Header from "./components/Header";
import Navbar from "./components/Navbar";

const style = {
  body: `font-poppins cursor-none px-[5vw] bg-background`,
  loaderWrapper: `fixed z-10 top-0 left-0 right-0 bottom-0 flex items-center justify-center flex-col bg-[#191919] text-[#dbd8d6]`,
  headerOne: `text-[1.5vw] uppercase font-bai font-semibold`,
  headerTwo: `text-[1.5vw] uppercase font-bodoni italic mt-2.5`,
};

function App() {
  const [preloader, setPreloader] = useState(true);

  useLocoScroll(!preloader);

  const [timer, setTimer] = useState(3);

  const id = useRef(null);

  const clear = () => {
    window.clearInterval(id.current);
    setPreloader(false);
  };

  useEffect(() => {
    id.current = window.setInterval(() => {
      setTimer((timer) => timer - 1);
    }, 1000);
  }, []);

  useEffect(() => {
    console.log("text", timer);
    if (timer < 1) {
      clear();
    }
  }, [timer]);

  return (
    <>
      <Cursor />

      {preloader ? (
        <div className={style.loaderWrapper}>
          <h1 className={style.headerOne}>Flirty flowers</h1>
          <h2 className={style.headerTwo}>Rio de Janeiro</h2>
        </div>
      ) : (
        <div className={style.body} id="main" data-scroll-container>
          <Navbar />
          <Header />
          <Featured />
          <About />
          <Gallery />
          <Footer />
        </div>
      )}
    </>
  );
}

export default App;
