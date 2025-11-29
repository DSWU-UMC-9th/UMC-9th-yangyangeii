import type { CartItem } from "../constants/cartItems";
import { useAppDispatch } from "../app/hooks";
import { increase, decrease, removeItem } from "../features/cart/cartSlice";

interface CartItemRowProps {
  item: CartItem;
}

export default function CartItemRow({ item }: CartItemRowProps) {
  const dispatch = useAppDispatch();

  const handleIncrease = () => {
    dispatch(increase(item.id));
  };

  const handleDecrease = () => {
    dispatch(decrease(item.id));
  };

  const handleRemove = () => {
    dispatch(removeItem(item.id));
  };

  return (
    <li className="flex items-center justify-between bg-white rounded-md shadow-sm px-4 py-3 mb-3">
      {/* 왼쪽 : 이미지 + 텍스트 */}
      <div className="flex items-center gap-3">
        <img
          src={item.img}
          alt={item.title}
          className="w-14 h-14 rounded object-cover"
        />
        <div className="flex flex-col">
          <span className="font-semibold text-sm">{item.title}</span>
          <span className="text-xs text-gray-500">{item.singer}</span>
          <span className="mt-1 text-sm font-medium text-gray-800">
            ₩ {item.price.toLocaleString()}
          </span>
        </div>
      </div>

      {/* 오른쪽 : 수량 조절 + 삭제 */}
      <div className="flex flex-col items-end gap-2">
        <div className="flex items-center border rounded-md text-sm overflow-hidden">
          <button
            type="button"
            onClick={handleDecrease}
            className="px-2 py-1 hover:bg-gray-100"
          >
            -
          </button>
          <span className="px-3 py-1 border-l border-r min-w-[32px] text-center">
            {item.amount}
          </span>
          <button
            type="button"
            onClick={handleIncrease}
            className="px-2 py-1 hover:bg-gray-100"
          >
            +
          </button>
        </div>
        <button
          type="button"
          onClick={handleRemove}
          className="text-xs text-red-500 hover:underline"
        >
          삭제
        </button>
      </div>
    </li>
  );
}
