import Link, { LinkProps } from "next/link";
import NavLinkDropdown from "./dropdown/NavLinkDropdown";
import { Suspense } from "react";
import DropdownLoader from "./dropdown/DropdownLoader";
import { cn } from "@/utils/cn";

interface Props
  extends LinkProps,
    Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  dropdown?: React.ReactNode;
}

const NavLink: React.FC<Props> = ({
  children,
  className,
  dropdown,
  href,
  ...props
}) => {
  return (
    <span className="group relative">
      <Link
        className={cn(
          className,
          "hover:text-gray-800 transition-colors py-5 px-3 inline-block"
        )}
        href={href}
        {...props}
      >
        {children}
      </Link>

      {dropdown && (
        <NavLinkDropdown>
          <Suspense key={href as string} fallback={<DropdownLoader />}>
            {dropdown}
          </Suspense>
        </NavLinkDropdown>
      )}
    </span>
  );
};

export default NavLink;
