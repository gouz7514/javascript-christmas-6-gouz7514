import { MENU } from "../constants/menu.js";
import { DATE, EVENT, BENEFIT_TYPE, BENEFIT } from "../constants/constant.js";
import { BADGE_THRESHOLD } from "../constants/badge.js";
import { orderToArray } from "../util/order.js";
import { getDay } from "../util/date.js";

import Badge from "./Badge.js";

class Bill {
  #result = {
    visitDate: 0,
    orders: [],
    totalPrice: 0,
    giveAway: false,
    benefits: [],
    benefitAmount: 0,
    badge: '',
    finalPrice: 0,
  };

  constructor(visitDate, orders) {
    this.#result.visitDate = visitDate;
    this.#result.orders = orderToArray(orders);
  }

  // 이벤트 대상인지 확인한다. 총주문 금액이 10,000원 이상이면 이벤트 대상이다.
  #isEventTarget(totalPrice) {
    return totalPrice >= EVENT.priceThreshold;
  }

  // 이벤트 대상인지 확인한다. 주문을 토대로 한 총주문 금액이 10,000원 이상이면 이벤트 대상이다.
  #isOrderEventTarget(orders) {
    const totalPrice = this.#result.totalPrice || this.#calculateTotalPrice(orders);
    return this.#isEventTarget(totalPrice);
  }

  // 크리스마스 디데이 할인 이벤트 기간인지 확인한다. 기간은 1일부터 25일까지이다.
  #isChristmasEventTarget(visitDate) {
    return visitDate >= DATE.dday.start && visitDate <= DATE.dday.end;
  }

  // 방문 날짜와 주문 메뉴를 토대로 필요한 정보를 계산한다.
  calculateBill() {
    const { visitDate, orders } = this.#result;
    const totalPrice = this.#calculateTotalPrice(orders);
    this.#result.totalPrice = totalPrice;
    // 2-1-1. 총주문 금액 10,000원 이상부터 이벤트를 적용한다. 아닌 경우 바로 `2-6`을 실행한다.
    if (this.#isEventTarget(totalPrice)) {
      this.#result.giveAway = this.#calculateGiveAway(orders);
      this.#result.benefits = this.#calculateBenefits(visitDate, orders);
      this.#result.benefitAmount = this.#calculateBenefitAmount(visitDate, orders);
      this.#result.badge = this.#createBadge(visitDate, orders);
    }
    this.#result.finalPrice = this.#calculateFinalPrice(visitDate, orders);
    return this.#result;
  }

  // 2-1. 할인 전 총주문 금액을 계산한다.
  #calculateTotalPrice(orders) {
    return orders.reduce((acc, order) => {
      const { menu, amount } = order;
      return acc + MENU[menu].price * amount;
    }, 0);
  }

  // 2-2. 총주문 금액이 12만 원 이상이면 증정 이벤트를 진행한다.
  #calculateGiveAway(orders) {
    const totalPrice = this.#result.totalPrice || this.#calculateTotalPrice(orders);
    return totalPrice >= BENEFIT.giveAway.threshold;
  }

  // 2-3. 혜택 내역을 계산한다.
  #calculateBenefits(visitDate, orders) {
    if (!this.#isOrderEventTarget(orders)) return [];
    return this.#calculateAllBenefits(visitDate, orders);
  }

  // 모든 혜택 내역을 계산한다.
  #calculateAllBenefits(visitDate, orders) {
    const christmasBenefit = this.#calculateChristmasBenefit(visitDate);
    const dayBenefit = this.#calculateDayBenefit(visitDate, orders);
    const specialBenefit = this.#calculateSpecialBenefit(visitDate);
    const giveAwayBenefit = this.#calculateGiveAwayBenefit(orders);
    return [christmasBenefit, dayBenefit, specialBenefit, giveAwayBenefit].filter((benefit) => Object.keys(benefit).length !== 0);
  }

  // 2-3-1. 크리스마스 디데이 할인 금액을 계산한다.
  #calculateChristmasBenefit(visitDate) {
    if (!this.#isChristmasEventTarget(visitDate)) return {};
    return {
      name: BENEFIT.christmas.name,
      type: BENEFIT.christmas.type,
      discount: BENEFIT.christmas.startPrice + BENEFIT.christmas.dayPrice * (visitDate - DATE.dday.start),
    };
  }

  // 2-3-2. 요일에 따라 평일, 주말 할인 금액을 계산한다.
  #calculateDayBenefit(visitDate, orders) {
    const day = getDay(visitDate);
    if (DATE.weekDay.includes(day)) {
      return this.#calculateWeekDayBenefits(visitDate, orders);
    }
    if (DATE.weekend.includes(day)) {
      return this.#calculateWeekEndBenefits(visitDate, orders);
    }
    return {};
  }

  // 평일 할인 금액을 계산한다.
  #calculateWeekDayBenefits(visitDate, orders) {
    if (!DATE.weekDay.includes(getDay(visitDate))) return {};
    const discountNumber = this.#calculateWeekDayDiscountNumber(visitDate, orders);
    return {
      name: BENEFIT.weekDay.name,
      type: BENEFIT.weekDay.type,
      discount: BENEFIT.weekDay.discount * discountNumber,
    };
  }

  #calculateWeekDayDiscountNumber(visitDate, orders) {
    if (!DATE.weekDay.includes(getDay(visitDate))) return 0;
    return orders.reduce((acc, order) => {
      const { menu, amount } = order;
      if (MENU[menu].type === BENEFIT.weekDay.menuType) {
        return acc + amount;
      }
      return acc;
    }, 0);
  }

  // 주말 할인 금액을 계산한다.
  #calculateWeekEndBenefits(visitDate, orders) {
    if (!DATE.weekend.includes(getDay(visitDate))) return {};
    const discountNumber = this.#calculateWeekEndDiscountNumber(visitDate, orders);
    return {
      name: BENEFIT.weekEnd.name,
      type: BENEFIT.weekEnd.type,
      discount: BENEFIT.weekEnd.discount * discountNumber,
    };
  }

  #calculateWeekEndDiscountNumber(visitDate, orders) {
    if (!DATE.weekend.includes(getDay(visitDate))) return 0;
    return orders.reduce((acc, order) => {
      const { menu, amount } = order;
      if (MENU[menu].type === BENEFIT.weekEnd.menuType) {
        return acc + amount;
      }
      return acc;
    }, 0);
  }

  // 2-3-3. 특별 할인 금액을 계산한다.
  #calculateSpecialBenefit(visitDate) {
    if (!DATE.special.includes(visitDate)) return {};
    return {
      name: BENEFIT.special.name,
      type: BENEFIT.special.type,
      discount: BENEFIT.special.discount,
    };
  }

  // 2-3-4. 증정 메뉴 금액을 계산한다.
  #calculateGiveAwayBenefit(orders) {
    const giveAway = this.#result.giveAway || this.#calculateGiveAway(orders);
    if (!giveAway) return {};
    return {
      name: BENEFIT.giveAway.name,
      type: BENEFIT.giveAway.type,
      discount: BENEFIT.giveAway.discount,
    };
  }

  // 2-4. 총혜택 금액을 계산한다.
  #calculateBenefitAmount(visitDate, orders) {
    if (!this.#isOrderEventTarget(orders)) return 0;
    const benefitDiscount = this.#calculateBenefitDiscount(visitDate, orders);
    const benefitGiveAway = this.#calculateBenefitGiveAway(orders);
    return benefitDiscount + benefitGiveAway;
  }

  // 2-4-1. 할인 금액의 합계를 계산한다
  #calculateBenefitDiscount(visitDate, orders) {
    const benefits = this.#calculateBenefits(visitDate, orders);
    return benefits.reduce((acc, benefit) => {
      const { type, discount } = benefit;
      if (type === BENEFIT_TYPE.discount) {
        return acc + discount;
      }
      return acc;
    }, 0);
  }

  // 2-4-2. 증정 이벤트 여부에 따라 증정 메뉴의 가격을 계산한다.
  #calculateBenefitGiveAway(orders) {
    const giveAway = this.#result.giveAway || this.#calculateGiveAway(orders);
    if (!giveAway) return 0;
    return BENEFIT.giveAway.discount;
  }

  // 2-5. 총혜택 금액에 따라 이벤트 뱃지를 부여한다.
  #createBadge(visitDate, orders) {
    // 이벤트 대상이 아니거나
    if (!this.#isOrderEventTarget(orders)) return '';
    const benefitAmount = this.#calculateBenefitAmount(visitDate, orders);
    // 총혜택 금액이 5,000원(뱃지를 받기 위한 최소 금액) 미만이면 뱃지를 부여하지 않는다.
    if (benefitAmount < BADGE_THRESHOLD.star) return '';
    return new Badge(benefitAmount);
  }

  // 2-6. 할인 후 예상 결제 금액을 계산한다.
  #calculateFinalPrice(visitDate, orders) {
    const totalPrice = this.#result.totalPrice || this.#calculateTotalPrice(orders);
    const benefitDiscount = this.#calculateBenefitDiscount(visitDate, orders);
    const finalPrice = totalPrice - benefitDiscount;
    return finalPrice;
  }
}

export default Bill;