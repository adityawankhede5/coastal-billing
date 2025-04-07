'use client';
import Image from "next/image";
import logo from "@/assets/images/logo.png";
import { useState } from "react";
import CloseIcon from "@/assets/icons/Close.icon";
import { useSideNavStore } from "@/zustand/store";
import PackageIcon from "@/assets/icons/Package.icon";
import CalendarFoldIcon from "@/assets/icons/CalendarFold.icon";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { ROUTES } from "@/constants/routes";
enum NAV_ITEMS {
  NONE = "none",
  TODAY = "today",
  ALL = "all",
}
export default function SideNav() {
  const [activeNav, setActiveNav] = useState<NAV_ITEMS>(NAV_ITEMS.NONE);
  const pathname = usePathname();
  const { isOpen, setIsOpen } = useSideNavStore();
  const router = useRouter();
  useEffect(() => {
    console.log(pathname, ROUTES.ORDERS, ROUTES.ALL_ORDERS);
    if (pathname === ROUTES.ORDERS) {
      setActiveNav(NAV_ITEMS.TODAY);
    } else if (pathname === ROUTES.ALL_ORDERS) {
      setActiveNav(NAV_ITEMS.ALL);
    } else {
      setActiveNav(NAV_ITEMS.NONE);
    }
  }, [pathname]);
  const handleNavClick = (nav: NAV_ITEMS) => {
    setIsOpen(false);
    if (activeNav === nav) return;
    if (nav === NAV_ITEMS.TODAY) {
      router.push(ROUTES.ORDERS);
    } else if (nav === NAV_ITEMS.ALL) {
      router.push(ROUTES.ALL_ORDERS);
    }
  }
  if (!isOpen) return <></>;
  return (
    <aside className="fixed top-0 left-0 z-30 w-full h-full bg-black/50" onClick={() => setIsOpen(false)}>
      <div className="flex flex-col gap-2 w-3/4 h-full bg-white p-4" onClick={(e) => e.stopPropagation()}>
        <header className="flex items-center border-b border-gray-200 pb-4">
          <Image src={logo} alt="Coastal" className="w-10 h-10" />
          <h1 className="text-2xl font-bold">Coastal</h1>
          <button className="ml-auto" onClick={() => setIsOpen(false)}>
            <CloseIcon className="w-6 h-6" />
          </button>
        </header>
        <main className="flex flex-col gap-4">
          <div onClick={() => handleNavClick(NAV_ITEMS.TODAY)} className={`flex items-center gap-2 border-b border-gray-200 ${activeNav === NAV_ITEMS.TODAY ? "text-indigo-600" : ""}`}>
            <PackageIcon className="w-6 h-6" />
            <h2 className="text-lg font-bold h-12 flex items-center">{`Today's Orders`}</h2>
          </div>
          <div onClick={() => handleNavClick(NAV_ITEMS.ALL)} className={`flex items-center gap-2 border-b border-gray-200 ${activeNav === NAV_ITEMS.ALL ? "text-indigo-600" : ""}`}>
            <CalendarFoldIcon className="w-6 h-6" />
            <h2 className="text-lg font-bold h-12 flex items-center">{`All Orders`}</h2>
          </div>
        </main>
      </div>
    </aside>
  );
}