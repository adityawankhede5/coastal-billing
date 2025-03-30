"use client"
import MENU, { CATEGORY, MENU_DICTIONARY } from "@/constants/menu";
import { useState } from "react";
import { MENU_CATEGORY, TAB_CATEGORY } from "@/constants/types";
import PlusIcon from "@/assets/icons/plus.svg";
import MinusIcon from "@/assets/icons/minus.svg";
import Image from "next/image";
import QRCodeModal from "@/components/QRCodeModal";
import MenuIcon from "@/assets/icons/MenuIcon";
import CartIcon from "@/assets/icons/CartIcon";
import ResetIcon from "@/assets/icons/ResetIcon";
import Logo from "@/assets/images/logo.png";
export default function Home() {
  const [tab, setTab] = useState<TAB_CATEGORY>("MENU");
  const [cart, setCart] = useState<Record<string, number>>({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [isQRCodeModalOpen, setIsQRCodeModalOpen] = useState(false);

  const handleUpdateCart = (itemId: string, increment: number = 1) => {
    const item = MENU_DICTIONARY[itemId];
    if (!item) return;
    if (increment < 0) {
      if (!cart[itemId]) return;
      if (cart[itemId] === 0) return;
    }
    setCart((prev) => {
      const newCart = { ...prev };
      newCart[itemId] = (newCart[itemId] || 0) + increment;
      if (newCart[itemId] === 0) {
        delete newCart[itemId];
      }
      return newCart;
    });
    setTotalPrice(totalPrice + item.price * increment);
  }

  const handleQRGenerateClick = () => {
    setIsQRCodeModalOpen(true);
  }

  const handleResetCart = () => {
    setCart({});
    setTotalPrice(0);
  }

  return (
    <div className="box-border h-screen max-h-screen w-screen max-w-screen p-2">
      {tab === "MENU" && (
        <>
          <div className="flex items-center border-0 border-b border-solid border-gray-200 mb-2">
            <div className="flex-1 flex items-center">
              <Image src={Logo} alt="logo" className="w-10 h-10" />
              <div className="text-4xl font-bold px-1 py-2">Menu</div>
            </div>
            <span onClick={handleResetCart}><ResetIcon className="w-8 h-8 rotate-x-1" /></span>
          </div>
          <div className="flex flex-col gap-2 pb-12">
            {Object.keys(MENU).map((key) => (
              <div key={key}>
                <h2 className="text-sm text-gray-700 font-bold px-2">{CATEGORY[key as MENU_CATEGORY]}</h2>
                {MENU[key as MENU_CATEGORY].map((item) => (
                  <div key={item.id} className="flex justify-center items-center py-2 px-3 border-0 border-b border-solid border-gray-200">
                    <div className="flex-1">
                      <div>{item.name}</div>
                      {/* <div>{item.description}</div> */}
                      <div className="text-gray-500">&#8377;{item.price}</div>
                    </div>
                    <div className="flex bg-gray-200 rounded-sm overflow-hidden">
                      <span className="flex justify-center items-center w-6 h-6 border-0 bg-gray-200" onClick={() => handleUpdateCart(item.id, -1)}><Image className="w-4 h-4" src={MinusIcon} alt="-" /></span>
                      <span className="flex justify-center items-center w-6 h-6 bg-gray-50">{cart[item.id] || 0}</span>
                      <span className="flex justify-center items-center w-6 h-6 border-0 bg-gray-200" onClick={() => handleUpdateCart(item.id, 1)}><Image className="w-4 h-4" src={PlusIcon} alt="+" /></span>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </>
      )}
      {tab === "CART" && (
        <div className="flex flex-col gap-2">
          <div className="flex items-center border-0 border-b border-solid border-gray-200 mb-2">
            <div className="flex-1 flex items-center">
              <Image src={Logo} alt="logo" className="w-10 h-10" />
              <div className="text-4xl font-bold px-1 py-2">Cart</div>
            </div>
          </div>
          <div className="pb-40">
            {Object.keys(cart).map((key) => (
              <div key={key} className="flex justify-center items-center py-2 px-3 border-0 border-b border-solid border-gray-200">
                <div className="flex-1">
                  <div>{MENU_DICTIONARY[key].name}</div>
                  <div><span className="text-gray-500">Qty</span> {cart[key]}</div>
                </div>
                <div>&#8377;{MENU_DICTIONARY[key].price}</div>
              </div>
            ))}
          </div>
          <div className="box-border fixed flex flex-col justify-center gap-2 bottom-12 h-28 left-0 right-0 px-4 bg-gray-100">
            <div className="flex justify-between gap-1 font-bold text-2xl">
              <div>Total:</div>
              <div>&#8377;{totalPrice}</div>
            </div>
            <div className="flex justify-center items-center">
              <button onClick={handleQRGenerateClick} className="button-primary w-full">Generate QR</button>
            </div>
          </div>
        </div>
      )}
      <div className="fixed bottom-0 left-0 right-0 flex h-12 bg-white shadow-lg border-t border-solid border-gray-300">
        <button className={`flex justify-center items-center flex-1 ${tab === "MENU" ? "text-[#007AFF]" : ""}`} onClick={() => setTab("MENU")}><MenuIcon className="w-6 h-6" /></button>
        <button className={`flex justify-center items-center flex-1 ${tab === "CART" ? "text-[#007AFF]" : ""}`} onClick={() => setTab("CART")}><div className="flex justify-center items-center w-6 h-6 relative"><CartIcon className="w-6 h-6" />
          {totalPrice > 0 && <span className="absolute box-border scale-75 left-2.5 -top-3 bg-blue-500 text-xs px-2 py-1 text-white rounded-3xl">&#8377;{totalPrice}</span>}
        </div></button>
      </div>
      {isQRCodeModalOpen && <QRCodeModal amount={totalPrice} onClose={() => setIsQRCodeModalOpen(false)} />}
    </div>
  );
}
