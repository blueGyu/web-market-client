import { makeAutoObservable } from "mobx";
import type { Item } from "@/lib/definitions";

class BuyItem {
  buyItems: Item[] = [];
  price = 0;
  discount = 0;

  constructor() {
    makeAutoObservable(this);
  }

  addBuyItem(addItem: Item) {
    const checkIsExisting = this.buyItems.some(
      (item: Item) => addItem.id === item.id
    );
    if (!checkIsExisting) {
      this.buyItems.push(addItem);
      this.price = this.price + addItem.price;
      this.discount = this.discount;
    }
  }

  removeBuyItem(removeItem: Item) {
    const checkIsExisting = this.buyItems.some(
      (item: Item) => removeItem.id === item.id
    );
    if (checkIsExisting) {
      this.buyItems = this.buyItems.filter(
        (item: Item) => item.id !== removeItem.id
      );
      this.price = this.price - removeItem.price;
      this.discount = this.discount;
    }
  }

  resetBuyItem() {
    this.buyItems = [];
    this.price = 0;
    this.discount = 0;
  }
}

const useBuyItem = new BuyItem();
export default useBuyItem;
