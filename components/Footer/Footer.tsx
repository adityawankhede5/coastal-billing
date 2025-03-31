"use client";
import CartIcon from "@/assets/icons/CartIcon";
import MenuIcon from "@/assets/icons/MenuIcon";
import { getRoute, ROUTES } from "@/constants/routes";
import { useRouter, usePathname, useParams } from "next/navigation";
import useOrdersStore, { useOrder } from "@/zustand/store";
import { db } from "@/lib/firebase";
import { addDoc, collection, getCountFromServer } from "firebase/firestore";
export default function Footer() {
  const { orderId } = useParams();
  const { appendOrder } = useOrdersStore();
  const router = useRouter();
  const pathname = usePathname();
  const order = useOrder(orderId as string);
  const handleNewOrder = async () => {
    const countSnapshot = await getCountFromServer(collection(db, "orders"));
    const newOrder = {
      createdAt: new Date(),
      number: countSnapshot.data().count + 1,
      name: "",
      cart: {},
      price: 0,
      quantity: 0,
    }
    try {
      const createdOrder = await addDoc(collection(db, "orders"), newOrder);
      appendOrder({ ...newOrder, id: createdOrder.id });
      router.push(getRoute(createdOrder.id, ROUTES.MENU));
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <footer className="fixed h-[40px] bottom-0 left-0 right-0 flex bg-white shadow-lg border-t border-solid border-gray-300">
      {
        order ?
          <>
            <button className={`flex justify-center items-center flex-1 ${pathname === getRoute(orderId as string, ROUTES.MENU) ? "text-[#007AFF]" : ""}`} onClick={() => router.push(getRoute(orderId as string, ROUTES.MENU))}>
              <MenuIcon className="w-6 h-6" />
            </button>
            <button className={`flex justify-center items-center flex-1 ${pathname === getRoute(orderId as string, ROUTES.CART) ? "text-[#007AFF]" : ""}`} onClick={() => router.push(getRoute(orderId as string, ROUTES.CART))}>
              <div className="flex justify-center items-center w-6 h-6 relative">
                <CartIcon className="w-6 h-6" />
        {order && order.quantity > 0 && <span className="absolute box-border scale-75 left-2.5 -top-3 bg-blue-500 text-xs px-2 py-1 text-white rounded-3xl">{order.quantity}</span>}
      </div></button>
          </> :
          <>
            <button onClick={handleNewOrder} className="button button-primary w-full flex justify-center items-center m-1 mx-4">New Order</button>
          </>
      }
    </footer>
  );
}

