import { Link } from "react-router-dom";

function Homepage() {
  return (
    <div className="w-screen h-screen overflow-hidden">
      <div className="bg-[url('/hero-bg.png')] w-full h-full flex justify-center pt-20">
        <div className="flex flex-col items-center">
          <img src="/logo.png" alt="Paco Finance" className="h-52 lg:h-64" />
          <div className="flex flex-col items-center gap-3">
            <h1 className="text-white text-xl lg:text-4xl font-black flex gap-2 lg:gap-3 uppercase">
              <span className="border-r-4 border-white pr-3">Staking</span>
              <span className="border-r-4 border-white pr-3">Swap</span>
              <span className="border-r-4 border-white pr-3">Gamefi</span>
              <span>Nfts</span>
            </h1>
            <p className="text-white text-sm lg:text-base text-center font-extrabold uppercase">
              $PACO: Beyond Memes, Real Value & Ultimate GameFi Powerhouse
            </p>
          </div>
          <Link to="/dashboard" className="mt-8">
            <img
              src="/buttons/dashboard-button.png"
              alt=""
              className="h-10 lg:h-12"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
