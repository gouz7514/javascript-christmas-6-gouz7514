import { MENU } from "../constants/menu.js";
import { GIVEAWAY } from "../constants/constant.js";

class Bill {
  #info = {
    orders: [],
    totalPrice: 0,
    giveAway: false,
    benefits: [],
    benefitAmount: 0,
    finalPrice: 0,
    badge: "",
  };

  createBill(orders) {
    this.#info.orders = orders;
    this.#info.totalPrice = this.calculateTotalPrice(orders);
    this.#info.giveAway = this.calculateGiveAway(this.#info.totalPrice);
  }

  // 2-1. 할인 전 총주문 금액을 계산한다.
  calculateTotalPrice(orders) {
    let totalPrice = 0;
    orders.forEach((order) => {
      const [menu, count] = order.split("-");
      totalPrice += MENU[menu] * count;
    });
    return totalPrice;
  }

  // 2-2. 총주문 금액이 12만 원 이상이면 증정 이벤트를 진행한다.
  calculateGiveAway(totalPrice) {
    return totalPrice >= GIVEAWAY;
  }
}

export default Bill;