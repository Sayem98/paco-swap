import { Link } from "react-router-dom";
import { ConnectKitButton } from "connectkit";

function Header() {
  return (
    <header className="p-4">
      <div className="flex items-center justify-between bg-[#432663] px-3 rounded-3xl shadow-md">
        <div className="flex items-center gap-4">
          <Link to="/dashboard">
            <img src="/icon.png" alt="Paco Finance" className="h-10 md:h-20" />
          </Link>
          <div className="hidden md:flex items-center gap-4">
            <Link to="/dashboard/games">
              <img src="/buttons/games-button.png" alt="" className="h-14" />
            </Link>
            <Link to="/dashboard/earn">
              <img src="/buttons/earn-button.png" alt="" className="h-16" />
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <ConnectKitButton.Custom>
            {({ isConnected, show, address }) => {
              return (
                <button
                  onClick={show}
                  className={
                    isConnected &&
                    "bg-[#393185] text-white font-bold px-4 py-3 rounded-lg shadow-md"
                  }
                >
                  {isConnected ? (
                    address.slice(0, 6) + "..." + address.slice(-4)
                  ) : (
                    <img
                      src="/buttons/connect-button.png"
                      alt=""
                      className="h-11 md:h-16"
                    />
                  )}
                </button>
              );
            }}
          </ConnectKitButton.Custom>
          <Link to="/dashboard/signup" className="hidden md:block">
            <img src="/buttons/signup-button.png" alt="" className="h-16" />
          </Link>
          <button className="hidden md:block">
            <img src="/icons/notification-icon.png" alt="" className="h-12" />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
