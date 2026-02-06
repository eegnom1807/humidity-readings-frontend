import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { toast } from "sonner";


type ToastType = "success" | "error";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const toastMessage = (message: string, type: ToastType) => {
    const map = {
      success: toast.success,
      error: toast.error
    }

    map[type](message)
  };
