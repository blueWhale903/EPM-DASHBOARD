import SideNav from "../ui/sidenav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="md:flex md:overflow-hidden">
      <div className="w-full md:w-64">
        <SideNav />
      </div>
      <div className="grow p-6 md:overflow-y-auto md:p-12 ">{children}</div>
    </div>
  );
}
