import { MENU } from "../constants/menu.js";
import { DATE, EVENT, BENEFIT, GIVEAWAY } from "../constants/constant.js";

class Bill {
  #info = {
    visitDate: 1,
    orders: [],
    totalPrice: 0,
    giveAway: false,
    benefits: [],
    benefitAmount: 0,
    finalPrice: 0,
    badge: "",
  };

  createBill(visitDate, orders) {
    this.#info.visitDate = visitDate;
    this.#info.orders = orders;
    this.#info.totalPrice = this.calculateTotalPrice(orders);
    this.#info.giveAway = this.calculateGiveAway(this.#info.totalPrice);
    this.#info.benefits = this.calculateBenefits(visitDate, orders);
  }

  // 2-1. 할인 전 총주문 금액을 계산한다.
  calculateTotalPrice(orders) {
    let totalPrice = 0;
    orders.forEach((order) => {
      const { menu, amount } = order;
      totalPrice += MENU[menu].price * amount;
    });
    return totalPrice;
  }

  // 2-2. 총주문 금액이 12만 원 이상이면 증정 이벤트를 진행한다.
  calculateGiveAway(totalPrice) {
    return totalPrice >= GIVEAWAY;
  }

  // 2-3. 혜택 내역을 계산한다.
  calculateBenefits(visitDate, orders) {
    if (visitDate >= DATE.dday.start && visitDate <= DATE.dday.end) {
      this.#info.benefits.push(this.calculateChristmasBenefits(visitDate));
    }
    this.calculateDayBenefits(visitDate, orders);
    this.calculateSpecialBenefits(visitDate);
    this.calculateGiveAwayBenefits(this.#info.giveAway);
  }

  // 2-3-1. 크리스마스 디데이 할인 금액을 계산한다.
  calculateChristmasBenefits(visitDate) {
    const benefit = {
      type: BENEFIT.christmas.type,
      discount: BENEFIT.christmas.startPrice + BENEFIT.christmas.dayPrice * (visitDate - DATE.dday.start),
    };
    return benefit;
  }

  // 2-3-2. 요일에 따라 평일, 주말 할인 금액을 계산한다.
  calculateDayBenefits(visitDate, orders) {
    const day = new Date(EVENT.year, EVENT.month - 1, visitDate).getDay();
    if (DATE.weekDay.includes(day)) {
      this.#info.benefits.push(this.calculateWeekDayBenefits(orders));
    } else if (DATE.weekend.includes(day)) {
      this.#info.benefits.push(this.calculateWeekendBenefits(orders));
    }
  }

  // 평일 할인 금액을 계산한다.
  calculateWeekDayBenefits(orders) {
    const discountNumber = this.calculateWeekDayDiscountNumber(orders);
    const benefit = {
      type: BENEFIT.weekDay.type,
      discount: BENEFIT.weekDay.discount * discountNumber,
    };

    return benefit;
  }

  calculateWeekDayDiscountNumber(orders) {
    return orders.reduce((acc, order) => {
      const { menu, amount } = order;
      if (MENU[menu].type === BENEFIT.weekDay.menuType) {
        return acc + amount;
      }
      return acc;
    }, 0);
  }

  // 주말 할인 금액을 계산한다.
  calculateWeekEndBenefits(orders) {
    const discountNumber = this.calculateWeekEndDiscountNumber(orders);
    const benefit = {
      type: BENEFIT.weekEnd.type,
      discount: BENEFIT.weekEnd.discount * discountNumber,
    };

    return benefit;
  }

  calculateWeekEndDiscountNumber(orders) {
    return orders.reduce((acc, order) => {
      const { menu, amount } = order;
      if (MENU[menu].type === BENEFIT.weekEnd.menuType) {
        return acc + amount;
      }
      return acc;
    }, 0);
  }

  // 2-3-3. 특별 할인 금액을 계산한다.
  calculateSpecialBenefits(visitDate) {
    if (DATE.special.includes(visitDate)) {
      const benefit = BENEFIT.special;
      this.#info.benefits.push(benefit);
    }
  }

  // 2-3-4. 증정 메뉴 금액을 계산한다.
  calculateGiveAwayBenefits(giveAway) {
    if (giveAway) {
      const benefit = {
        type: BENEFIT.giveAway.type,
        discount: BENEFIT.giveAway.discount * BENEFIT.giveAway.amount,
      };
      this.#info.benefits.push(benefit);
    }
  }
}

export default Bill;