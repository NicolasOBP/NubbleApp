import { ToastService } from './toastTypes';
// import { useToastContext } from './useToastContext';
import { useToastServiceZustand, useToastZustand } from './useToastZustand';

export function useToast(): ToastService['toast'] {
  // const { toast } = useToastContext();
  const toast = useToastZustand();

  return toast;
}

export function useToastService(): Omit<ToastService, 'toast'> {
  // const { showToast, hideToast } = useToastContext();
  const { hideToast, showToast } = useToastServiceZustand();

  return { showToast, hideToast };
}
