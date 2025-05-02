type ToastType = "success" | "error" | "warning" | "info";
const CLASSES = {
  success: "bg-green-500",
  error: "bg-red-500",
  warning: "bg-yellow-500",
  info: "bg-gray-500",
}
export const toast = (message: string, type: ToastType = "info") => {
  const existingToast = document.getElementById("toast");
  if (existingToast) {
    existingToast.remove();
  }
  const newToast = document.createElement("div");
  newToast.id = "toast";
  newToast.className = "fixed max-w-96 w-fit  bottom-4 left-1/2 -translate-x-1/2 text-center px-4 py-2 text-white flex items-center justify-center rounded-lg animate-bounce z-50";
  newToast.className += ` ${CLASSES[type]}`;
  newToast.textContent = message;
  document.body.appendChild(newToast);
  setTimeout(() => {
    newToast.remove();
  }, 3000);
}
