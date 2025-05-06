"use client";
import MENU, { CATEGORY, MENU_DICTIONARY } from "@/constants/menu";
import { MENU_CATEGORY, MENU_ITEM } from "@/constants/types";
import { useParams, useRouter } from "next/navigation";
import NotFound from "@/components/NotFound";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useRef, useState } from "react";
import MenuItemCard from "@/components/MenuItemCard";
import { ORDERS_COLLECTION } from "@/constants/DB";
import { Order, ORDER_STATUS, PAYMENT_METHOD } from "@/zustand/types";
import { updateOrderPayment } from "@/lib/utils";
import Header from "@/components/Header/Header";
import HydrationSafeDate from "@/components/HydrationSafeDate";
import ClockIcon from "@/assets/icons/Clock.icon";
import CheckCircleIcon from "@/assets/icons/CheckCirlce.icon";
import CartButton from "@/components/CartButton";
import CartModal from "@/components/CartModal";
import SearchInput from "@/components/SearchInput";
import { toast } from "@/components/toast";
import OrderSettingsDropdown from "@/components/OrderSettingsDropdown";
import PaymentMethodCard from "@/components/PaymentMethodCard";
import { ROUTES } from "@/constants/routes";
function Title({
  createdAt,
  status,
  payment,
}: {
  createdAt: number;
  status: ORDER_STATUS;
    payment?: PAYMENT_METHOD;
}) {
  return (
    <div className="flex flex-row items-center justify-center gap-2 flex-wrap">
      {status === ORDER_STATUS.PENDING && (
        <ClockIcon className="w-7 h-7 text-amber-600" />
      )}
      {status === ORDER_STATUS.COMPLETE && (
        <CheckCircleIcon className="w-7 h-7 text-emerald-600" />
      )}
      <div className="">Order</div>
      <div className="text-2xl font-bold text-gray-400">
        <HydrationSafeDate milliseconds={createdAt} />
      </div>
      {payment &&
        <div className="flex justify-center items-center gap-2 flex-1 basis-full">
          <PaymentMethodCard method={payment} className="scale-150" />
        </div>
      }
    </div>
  );
}
export default function Menu({ _order }: { _order: Order | null }) {
  const [menu, setMenu] = useState<Record<MENU_CATEGORY, MENU_ITEM[]>>(MENU);
  const [order, setOrder] = useState<Order | null>(_order || null);
  const [showCart, setShowCart] = useState(false);
  const query = useRef("");
  const router = useRouter();
  const { orderId } = useParams();
  const handleCartButtonClick = () => {
    setShowCart(true);
    handleSaveCart();
  };
  const handleUpdateCart = (itemId: string, quantity: number = 1) => {
    if (!order) return;
    if (order.status === ORDER_STATUS.COMPLETE) {
      toast("Updating completed order");
    }
    const item = MENU_DICTIONARY[itemId];
    if (!item) return;
    if (quantity < 0) {
      if (!order.cart[itemId]) return;
      if (order.cart[itemId] === 0) return;
    }
    const newCart = { ...order.cart };
    newCart[itemId] = (newCart[itemId] || 0) + quantity;
    if (newCart[itemId] === 0) {
      delete newCart[itemId];
    }
    const newTotalPrice = order.price + item.price * quantity;
    const newQuantity = order.quantity + quantity;
    const newOrder = {
      ...order,
      cart: newCart,
      price: newTotalPrice,
      quantity: newQuantity,
    };
    setOrder(newOrder);
  };
  const handlePaymentMethodClick = async (method: PAYMENT_METHOD) => {
    if (!order) return;
    try {
      const receivedAt = Date.now();
      await updateOrderPayment(orderId as string, method, receivedAt);
      setOrder((prev) => {
        if (!prev) return prev;
        prev.status = ORDER_STATUS.COMPLETE;
        prev.payment = { method, receivedAt };
        return { ...prev };
      });
      toast("Order complete", "success");
      setTimeout(() => {
        router.push(ROUTES.ORDERS);
      }, 500);
    } catch (error) {
      console.error(error);
    }
  };
  const handleSaveCart = async () => {
    if (!order) return;
    try {
      const orderRef = doc(db, ORDERS_COLLECTION, order.id);
      await updateDoc(orderRef, {
        cart: order.cart,
        price: order.price,
        quantity: order.quantity,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = (search: string) => {
    query.current = search;
    const searchLowerCase = search.toLowerCase();
    const filteredMenu = Object.keys(MENU).reduce((acc, key) => {
      const items = MENU[key as MENU_CATEGORY].filter((item) =>
        item.name.toLowerCase().includes(searchLowerCase)
      );
      if (items.length > 0) {
        acc[key as MENU_CATEGORY] = items;
      }
      return acc;
    }, {} as Record<MENU_CATEGORY, MENU_ITEM[]>);
    setMenu(filteredMenu);
  };
  if (!order) return <NotFound message="Order not found" />;
  return (
    <>
      <Header
        title={<Title createdAt={order.createdAt} status={order.status} payment={order.payment?.method} />}
        titleSmall="Order"
        action={<OrderSettingsDropdown />}
      />
      <div className="sticky top-12 py-2 z-10">
        <SearchInput onSearch={handleSearch} />
      </div>
      <div className="flex flex-col gap-2 pb-12">
        {Object.keys(menu).map((key) => (
          <div key={key}>
            <div className="flex items-center my-2 gap-2 text-gray-500 font-bold text-lg">
              <div className="underline underline-offset-4 decoration-emerald-600 decoration-2">
                {CATEGORY[key as MENU_CATEGORY]}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {menu[key as MENU_CATEGORY].map((item) => (
                <MenuItemCard
                  key={item.id}
                  item={item}
                  quantity={order.cart[item.id] || 0}
                  query={query.current}
                  handleUpdateCart={handleUpdateCart}
                />
              ))}
            </div>
          </div>
        ))}
        <div className="text-md font-bold p-2 text-center text-neutral-400 ">
          End of list
        </div>
        <CartButton onClick={handleCartButtonClick} />
      </div>
      {showCart && (
        <CartModal
          order={order}
          onClose={() => setShowCart(false)}
          handlePaymentMethodClick={handlePaymentMethodClick}
        />
      )}
    </>
  );
}
