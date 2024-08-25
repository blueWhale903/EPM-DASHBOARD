"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import {
  HomeIcon,
  CalendarDaysIcon,
  UserGroupIcon,
  HandRaisedIcon,
  PowerIcon,
} from "@heroicons/react/24/outline";
import { logout } from "../lib/actions";

const LINKS = [
  { name: "Home", href: "/dashboard", icon: HomeIcon },
  { name: "Events", href: "/dashboard/events", icon: CalendarDaysIcon },
  {
    name: "Participants",
    href: "/dashboard/participants",
    icon: HandRaisedIcon,
  },
  { name: "Members", href: "/dashboard/members", icon: UserGroupIcon },
];

export default function SideNav() {
  const pathname = usePathname();

  return (
    <div className="md:h-screen min-w-[250px] text-black bg-white border-r-1">
      <h1 className="py-10 text-3xl font-bold text-center bg-[#006fee] text-white">
        E&P
      </h1>
      <nav className="">
        <div className="flex md:flex-col md:my-10 my-0 py-4 mx-2 rounded-lg items-center">
          {LINKS.map((link) => {
            const LinkIcon = link.icon;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={clsx(
                  "flex md:justify-normal md:border-none border-solid border-2 justify-center px-4 gap-3 py-5 w-[90%] rounded-lg hover:bg-sky-100",
                  {
                    " font-extrabold !bg-[#006fee] text-white":
                      pathname === link.href,
                  }
                )}
              >
                <LinkIcon className="w-6"></LinkIcon>
                <span className="md:inline-block hidden">{link.name}</span>
              </Link>
            );
          })}
          <Link
            href="#"
            onClick={(e) => {
              e.preventDefault();
              logout();
            }}
            className="md:hidden flex md:justify-normal md:border-none border-solid border-2 justify-center px-4 gap-3 py-5 w-[90%] rounded-lg"
          >
            <PowerIcon className="w-6"></PowerIcon>
            <span className="md:inline-block hidden">Logout</span>
          </Link>
        </div>
        <div className="md:flex hidden pl-4 absolute bottom-8 gap-3">
          <Link
            href="#"
            onClick={(e) => {
              e.preventDefault();
              logout();
            }}
            className="flex gap-3"
          >
            <PowerIcon className="w-6"></PowerIcon>
            Log out
          </Link>
        </div>
      </nav>
    </div>
  );
}
