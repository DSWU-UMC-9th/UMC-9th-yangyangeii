import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { calculateTotals } from "./features/cart/cartSlice";
import { openModal } from "./features/modal/modalSlice";
import CartItemRow from "./components/CartItemRow";
import ConfirmModal from "./components/ConfirmModal";

function App() {
  const dispatch = useAppDispatch();
  const { cartItems, amount, total } = useAppSelector((state) => state.cart);

  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems, dispatch]);

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center py-10">
      <ConfirmModal />

      <div className="w-full max-w-3xl bg-slate-50 rounded-lg shadow-md overflow-hidden">
        <header className="flex items-center justify-between bg-slate-800 text-white px-6 py-3">
          <div className="flex items-center gap-2">
            <h1 className="font-semibold text-lg">Ohtani Ahn</h1>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm">장바구니</span>
            <div className="relative">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-600 text-sm">
                🛒
              </span>
              <span className="absolute -top-2 -right-2 bg-orange-500 text-xs text-white rounded-full px-1.5 py-0.5">
                {amount}
              </span>
            </div>
          </div>
        </header>

        <main className="px-6 py-4">
          {cartItems.length === 0 ? (
            <div className="py-12 text-center text-gray-500">
              장바구니가 비어 있습니다.
            </div>
          ) : (
            <ul className="mt-2">
              {cartItems.map((item) => (
                <CartItemRow key={item.id} item={item} />
              ))}
            </ul>
          )}
        </main>

        <footer className="border-t px-6 py-4 bg-white flex items-center justify-between">
          <div className="flex flex-col text-sm">
            <span className="text-gray-600">
              총 수량:{" "}
              <span className="font-semibold text-gray-800">{amount}</span> 개
            </span>
            <span className="text-gray-600 mt-1">
              총 금액:{" "}
              <span className="font-semibold text-indigo-600">
                ₩ {total.toLocaleString()}
              </span>
            </span>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => dispatch(openModal())}
              className="px-3 py-2 text-sm border border-red-400 text-red-500 rounded-md hover:bg-red-50"
            >
              전체 삭제
            </button>
            <button
              type="button"
              className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              결제하기
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
