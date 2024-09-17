"use client";
import { toast } from 'sonner';

interface Props {
  message: string;
  
}

export function toastSuccess({ message }: Props) {
      return(toast.success(message))
      
}

export function toastError({ message }: Props) {
  return(toast.error(message))
}
      