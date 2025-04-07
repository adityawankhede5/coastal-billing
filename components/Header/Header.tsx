'use client';
import HamburgerMenuIcon from "@/assets/icons/HamburgerMenu.icon";
import { useSideNavStore } from "@/zustand/store";
import { useRef, useEffect } from "react";
const maxScroll = 48 * 4;
export default function Header({ title, titleSmall }: { title: React.ReactNode, titleSmall: string }) {
  const largeHeaderRef = useRef<HTMLDivElement>(null);
  const smallHeaderRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const setIsOpen = useSideNavStore((state) => state.setIsOpen);
  useEffect(() => {
    const handleScroll = () => {
      const scrollProgress = Math.min(window.scrollY / maxScroll, 1);
      if (largeHeaderRef.current) {
        largeHeaderRef.current.style.opacity = `${1 - (scrollProgress * 2)}`;
      }
      if (titleRef.current) {
        titleRef.current.style.opacity = `${scrollProgress}`;
      }
      if (smallHeaderRef.current && scrollProgress >= 1) {
        smallHeaderRef.current.classList.add('bg-white');
        smallHeaderRef.current.classList.add('shadow-md');
      } else {
        smallHeaderRef.current?.classList.remove('bg-white');
        smallHeaderRef.current?.classList.remove('shadow-md');
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <div className="h-24"></div>
      <div ref={largeHeaderRef} className="h-24 flex items-start justify-center text-2xl font-bold bg-gray-100 transition-[left,transform] duration-300 z-10 w-full">
        {title}
      </div>
      <div ref={smallHeaderRef} className="mb-4 z-10 flex items-center gap-2 sticky top-0 h-12 -mx-4 px-4 text-2xl font-bold transition-[background-color,box-shadow] duration-300">
        <HamburgerMenuIcon className="w-6 h-6" onClick={() => setIsOpen(true)} />
        <div ref={titleRef} className="opacity-0 flex-1 text-left">
          {titleSmall}
        </div>
      </div>
    </>
  )
}