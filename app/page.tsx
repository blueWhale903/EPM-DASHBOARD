import { Button } from "@nextui-org/react";
import Link from "next/link";
import Image from "next/image";
export default function Home() {
  return (
    <main className="h-screen w-full bg-[#006fee] flex flex-col items-center">
      <div className="flex flex-col items-center justify-center gap-4 h-[70%] md:h-[50%] flex-wrap">
        <h1 className="text-white px-3 text-wrap text-center font-black text-[2rem] md:text-[3rem] h-auto break-words">
          EVENTS AND PARTICIPATIONS MANAGER
        </h1>
        <p className="text-white px-3 text-center md-w-full w-[70%]">
          Easily manage your events, track participation, and ensure seamless
          coordination all in one place.
        </p>
        <Link
          href="/login"
          className="md:text-large text-[#006fee] font-bold bg-gray-100 px-10 py-3 rounded-lg"
        >
          Login
        </Link>
      </div>
      <div className="absolute bottom-0 m-auto">
        <Image
          src="/img2.jpeg"
          alt="cover"
          width={1280}
          height={720}
          quality={100}
          className="shadow-lg"
        />
      </div>
    </main>
  );
}
