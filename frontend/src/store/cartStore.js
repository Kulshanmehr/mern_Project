import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],
      addToCart: (product) => {
        const cart = get().cart;
        const existing = cart.find((item) => item._id === product._id);
        console.log(existing);
        console.log(cart);
        // if (existing) {
        //   set({
        //     cart: cart.map((item) =>
        //       item._id === product._id
        //         ? { ...item, quantity: item.quantity + 1 }
        //         : item
        //     ),
        //   });
        // } else {
        //   set({ cart: [...cart, { ...product, quantity: 1 }] });
        // }
      },
      removeFromCart: (productId) => {
        set((state) => ({
          cart: state.cart.filter((item) => item._id !== productId),
        }));

        console.log("Product removed. Updated cart:", get().cart);
      },
      clearCart: () => {
        set({ cart: [] });
        console.log("Cart cleared");
      },
    }),
    {
      name: "cart-storage",
      getStorage: () => localStorage,
    }
  )
);

export default useCartStore;
