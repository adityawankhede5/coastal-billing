import { Order } from "@/zustand/types";
import Bill from "./Bill";
import OrderStatusCard from "./OrderStatusCard";
import { useEffect, useRef } from "react";
import html2canvas from "html2canvas-pro";

export default function OrderPDF({ order }: { order: Order }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const orderPDFElement = ref.current;
    if (orderPDFElement) {
      const computedStyle = window.getComputedStyle(orderPDFElement);
      const width = parseFloat(computedStyle.width);
      const height = parseFloat(computedStyle.height);
      html2canvas(orderPDFElement, {
        width: width,
        height: height,
        x: 0,
        y: 0,
      }).then(canvas => {
        canvas.toBlob(blob => {
          if (blob) {
            const name = `order-${order.id}.png`;
            const file = new File([blob], name, { type: 'image/png' });
            if (navigator.canShare && navigator.canShare({ files: [file] })) {
              navigator.share({ files: [file] });
            } else {
              const objectURL = URL.createObjectURL(blob);

              const a = document.createElement('a');
              a.href = objectURL;
              a.download = name;
              a.click();
            }
          }
        });
      }).finally(() => {
        const container = document.getElementById(`order-pdf-${order.id}-container`);
        if (container) {
          document.body.removeChild(container);
        }
      });
    }
  }, [order.id]);
  const createdAt = new Date(order.createdAt).toLocaleString('en-IN');
  const receivedAt = order.payment?.receivedAt ? new Date(order.payment.receivedAt).toLocaleString('en-IN') : "N/A";
  return (
    <div ref={ref} className="p-4 w-96">
      <header className="flex flex-col items-center justify-between">
        <div className="flex flex-1 items-center gap-1 justify-between">
          <span className="text-base font-bold text-gray-700">Order Time</span>
          <span className="text-base text-right font-bold text-gray-500">{createdAt}</span>
        </div>
        <div className="flex flex-1 items-center gap-1 justify-between">
          <span className="text-base font-bold text-gray-700">Order ID</span>
          <span className="text-base text-right font-bold text-gray-500">{order.id}</span>
        </div>

      </header>
      <Bill order={order} detailed />
      <main className="mt-2 flex flex-col gap-2 p-4 border border-solid border-gray-200 rounded-xl">
        <div className="flex flex-col gap-2 max-h-48 overflow-y-auto -mr-4 pr-4">
          <div className="flex items-center gap-1 justify-between">
            <span className="text-base font-bold text-gray-700">Created At</span>
            <span className="text-base text-right font-bold text-gray-500">{createdAt}</span>
          </div>
          <div className="flex items-center gap-1 justify-between">
            <span className="text-base font-bold text-gray-700">Status</span>
            <span className="text-base text-right font-bold text-gray-500"><OrderStatusCard status={order.status} /></span>
          </div>
          <div className="flex items-center gap-1 justify-between">
            <span className="text-base font-bold text-gray-700">Payment Method</span>
            <span className="text-base text-right font-bold text-gray-500 capitalize">{order.payment?.method || 'N/A'}</span>
          </div>

          <div className="flex items-center gap-1 justify-between">
            <span className="text-base font-bold text-gray-700">Received At</span>
            <span className="text-base text-right font-bold text-gray-500">{receivedAt}</span>
          </div>
        </div>
      </main>
    </div>
  );
}