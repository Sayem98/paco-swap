import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="hidden md:flex absolute left-0 bottom-0 w-full z-50 bg-[#432663] shadow-[0px_4px_4px_0px_#00000040_inset] items-end px-8 2xl:px-16 py-4 justify-between">
      <div className="space-y-2">
        <p className="text-center text-white uppercase">Socials</p>
        <div className="flex items-center justify-between gap-8 2xl:gap-16 w-full">
          <Link to="/" className="flex items-center gap-2">
            <img src="/icons/telegram.png" alt="" className="w-8" />
            <span className="text-white uppercase">Telegram</span>
          </Link>
          <Link to="/" className="flex items-center gap-2">
            <img src="/icons/twitter.png" alt="" className="w-8" />
            <span className="text-white uppercase">Twitter</span>
          </Link>
          <Link to="/" className="flex items-center gap-2">
            <img src="/icons/discord.png" alt="" className="w-8" />
            <span className="text-white uppercase">Discord</span>
          </Link>
        </div>
      </div>
      <div className="px-4 border-x-2 h-full border-gray-900">
        <Link to="/" className="flex items-center gap-2">
          <img src="/icons/whitepapper.png" alt="" className="w-8" />
          <span className="text-white uppercase">Whitepaper</span>
        </Link>
      </div>
      <div className="px-4 self-start space-y-1">
        <p className="text-center text-white uppercase">Partners & Investors</p>
        <div className="flex items-center gap-6 pt-2">
          <div className="flex items-center gap-5 2xl:gap-16">
            <img src="/icons/giveaway.png" alt="" className="w-28 2xl:w-36" />
            <img src="/icons/cwallet.png" alt="" className="w-28 2xl:w-36" />
            <img src="/icons/dexview.png" alt="" className="w-28 2xl:w-36" />
            <img src="/icons/pinksale.png" alt="" className="w-28 2xl:w-36" />
            <img src="/icons/cyberscope.png" alt="" className="w-28 2xl:w-36" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
