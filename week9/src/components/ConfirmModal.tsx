import { useAppDispatch, useAppSelector } from "../app/hooks";
import { closeModal } from "../features/modal/modalSlice";
import { clearCart } from "../features/cart/cartSlice";

export default function ConfirmModal() {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.modal.isOpen);

  if (!isOpen) return null;

  const handleCancel = () => {
    dispatch(closeModal());
  };

  const handleConfirm = () => {
    dispatch(clearCart());
    dispatch(closeModal());
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-md shadow-lg px-6 py-5 w-72 text-center">
        <p className="mb-5 text-sm text-gray-800">정말 삭제하시겠습니까?</p>
        <div className="flex justify-center gap-3">
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 text-sm rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            아니요
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="px-4 py-2 text-sm rounded-md bg-red-500 text-white hover:bg-red-600"
          >
            네
          </button>
        </div>
      </div>
    </div>
  );
}
