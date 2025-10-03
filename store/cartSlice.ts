import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  orderDummyData1,
  productsDummyData,
  userDummyData,
} from "@/assets/assets";

interface Alert {
  id: number;
  message: string;
}
interface details{
  fullname: string,
    phone: string,
    pincode: string,
    address: string,
    city: string,
    state: string,

}

interface CartState {
  products: typeof productsDummyData;
  users: typeof userDummyData | null;
  orders: typeof orderDummyData1;
  isSeller: boolean;
  cartItems: Record<string, number>;
  cartAmount: number;
  userLoggedIn: boolean;
  showAlert: boolean;
  alerts: Alert[];
  shippingDetails: details[];
  userAuth:boolean

}
const initialState: CartState = {
  products: [],
  users: null,
  isSeller: false,
  cartItems: {},
  orders: [],
  cartAmount: 0,
  userLoggedIn: false,
  showAlert: false,
  alerts: [],
  shippingDetails:[],
  userAuth:false
};

let nextAlertId = 0;
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<typeof productsDummyData>) {
      state.products = action.payload;
    },
    setUserData(state, action: PayloadAction<typeof userDummyData>) {
      state.users = action.payload;
    },
    toggleSeller(state) {
      state.isSeller = !state.isSeller;
    },
    addToCart(state, action: PayloadAction<string>) {
      const id = action.payload;
      state.cartItems[id] = (state.cartItems[id] || 0) + 1;
      state.cartAmount += 1;
    },
    removeFromCart(state, action: PayloadAction<string>) {
      const id = action.payload;
      if (state.cartItems[id]) {
        state.cartAmount -= state.cartItems[id];
        delete state.cartItems[id];
      }
    },
    setShippingDetails(state, action:PayloadAction<details>){
      const shipping = action.payload
      state.shippingDetails.push(shipping)
    },
    setOrders(state, action: PayloadAction<typeof orderDummyData1>) {
      state.orders = action.payload;
    },
    addOrder(state, action: PayloadAction<(typeof orderDummyData1)[0]>) {
      state.orders.push(action.payload);
    },
    setUserLoggedIn(state) {
      state.userLoggedIn = !state.userLoggedIn;
    },
    setShowAlert(state, action: PayloadAction<boolean>) {
      state.showAlert = !state.showAlert;
    },
    addAlert(state, action: PayloadAction<string>) {
      state.alerts.push({ id: nextAlertId++, message: action.payload });
    },
    removeAlert(state, action: PayloadAction<number>) {
      state.alerts = state.alerts.filter(
        (alert) => alert.id !== action.payload
      );
    },
    clearAlert(state) {
      state.alerts = [];
    },
    updateCartQuantity(
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) {
      const { id, quantity } = action.payload;
      const prevQty = state.cartItems[id] | 0;
      if (quantity === 0) {
        delete state.cartItems[id];
      } else {
        state.cartItems[id] = quantity;
      }
      state.cartAmount += quantity - prevQty;
    },
  },
});

export const {
  setProducts,
  setUserData,
  toggleSeller,
  addToCart,
  removeFromCart,
  updateCartQuantity,
  setOrders,
  addOrder,
  setShowAlert,
  setUserLoggedIn,
  addAlert,
  removeAlert,
  clearAlert,
  setShippingDetails
} = cartSlice.actions;

export default cartSlice.reducer;
