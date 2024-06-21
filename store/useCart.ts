import { makeAutoObservable } from "mobx";
import type { Item } from "@/lib/definitions";

class Cart {
  cartItems: Item[] = [];
  alarm = false;

  constructor() {
    makeAutoObservable(this);
  }

  addCart(addItem: Item) {
    const checkIsExisting = this.cartItems.some(
      (item: Item) => addItem.id === item.id
    );
    if (!checkIsExisting) {
      this.cartItems.push(addItem);
      this.alarm = true;
    }
  }

  removeCart(id: string) {
    this.cartItems = this.cartItems.filter((item: Item) => item.id !== id);
  }

  offAlarm() {
    this.alarm = false;
  }

  removeBuyItemInCart(id_array: string[]) {
    this.cartItems = this.cartItems.filter(
      (item) => !id_array.includes(item.id)
    );
  }
}

const useCart = new Cart();
export default useCart;
