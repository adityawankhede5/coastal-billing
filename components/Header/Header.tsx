import PackageIcon from "@/assets/icons/Package.icon";
import { useRef, useEffect } from "react";
const maxScroll = 112 + 96;
export default function Header({ title }: { title: string }) {
  const bottomOffsetRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleScroll = () => {
      const scrollProgress = Math.min(window.scrollY / maxScroll, 1);
      const offset = 50 - (scrollProgress * 50); // Converts 0-1 range to 0%-50% offset
      if (titleRef.current) {
        titleRef.current.style.left = `${offset}%`;
        titleRef.current.style.transform = `translateX(-${offset}%)`;
        const parentElement = titleRef.current.parentElement;
        if (parentElement) {
          if (offset <= 1) {
            parentElement.classList.add('bg-white');
          } else {
            parentElement.style.transition = 'none';
            parentElement.classList.remove('bg-white');
            parentElement.style.transition = '';
          }
        }
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
      <div className="sticky top-0 h-12 -mx-4 flex items-center justify-center text-2xl font-bold bg-gray-100 transition-[left,transform] duration-300">
        <div ref={titleRef} style={{
          left: '50%',
          transform: 'translateX(-50%)'
        }} className="absolute h-full flex items-center px-4">
          <PackageIcon className="w-7 h-7" />
          <span className="ml-2">{title}</span>
        </div>

      </div>
      <div ref={bottomOffsetRef} className="h-24"></div>
    </>
  )
}