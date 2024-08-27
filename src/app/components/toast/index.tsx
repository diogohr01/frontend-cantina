"use client";
import { toast } from 'sonner';

interface Props {
  message: string;
}

export function toastSuccess({ message }: Props) {
      return(toast.success(message))
      
}
      