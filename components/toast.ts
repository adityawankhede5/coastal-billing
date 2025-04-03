export const toast = (message: string) => {
  const existingToast = document.getElementById("toast");
  if (existingToast) {
    existingToast.remove();
  }
  const newToast = document.createElement("div");
  newToast.id = "toast";
  newToast.className = "fixed max-w-96 w-fit  bottom-4 left-1/2 -translate-x-1/2 text-center px-4 py-2 bg-gray-800 text-white flex items-center justify-center rounded-lg animate-bounce z-50";
  newToast.textContent = message;
  document.body.appendChild(newToast);
  setTimeout(() => {
    newToast.remove();
  }, 3000);
}
