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
    <div className="h-screen text-black bg-white border-r-1">
      <h1 className="py-10 text-3xl font-bold text-center bg-[#006fee] text-white">
        E&P
      </h1>
      <nav className="">
        <div className="flex flex-col mt-10 rounded-lg items-center">
          {LINKS.map((link) => {
            const LinkIcon = link.icon;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={clsx(
                  "flex px-4 gap-3 py-5 w-[90%] rounded-lg hover:bg-sky-100",
                  {
                    " font-extrabold !bg-[#006fee] text-white":
                      pathname === link.href,
                  }
                )}
              >
                <LinkIcon className="w-6"></LinkIcon>
                {link.name}
              </Link>
            );
          })}
        </div>
      </nav>
      <div className="pl-4 absolute bottom-8 flex gap-3">
        <PowerIcon className="w-6"></PowerIcon>
        <Link
          href="#"
          onClick={(e) => {
            e.preventDefault();
            logout();
          }}
        >
          Log out
        </Link>
      </div>
    </div>
  );
}
