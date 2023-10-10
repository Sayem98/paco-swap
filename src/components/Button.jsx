import { Link } from "react-router-dom";
import { cn } from "../utils";

function Button({ children, className, to, ...rest }) {
  if (to)
    return (
      <Link
        to={to}
        className={cn(
          "flex items-center gap-1 bg-[#2e2552] transition hover:bg-[#423566] text-white text-lg font-extrabold px-6 py-2 rounded-2xl",
          className
        )}
      >
        <img src="/icons/game-icon.png" alt="" className="h-8" />
        <span>{children}</span>
      </Link>
    );

  return (
    <button className={cn("", className)} {...rest}>
      {children}
    </button>
  );
}

export default Button;
