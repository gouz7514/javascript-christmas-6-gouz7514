import { DATE, EVENT, BENEFIT_TYPE, BENEFIT, BENEFIT_EMPTY_CASE } from "../constants/constant.js";
import { BADGE_THRESHOLD } from "../constants/badge.js";
import { isWeekend, isWeekday, isSpecial } from "../util/date.js";

import Menu from "./Menu.js";
import Badge from "./Badge.js";

class Bill {
  #result = {
    visitDate: 0,
    orders: [],
    totalPrice: 0,
    giveAway: false,
    benefits: null,
    benefitAmount: 0,
    badge: '',
    finalPrice: 0,
  };

  constructor(visitDate, orders) {
    this.#result.visitDate = visitDate;
    this.#result.orders = orders;
  }

  // 이벤트 대상인지 확인한다. 총주문 금액이 10,000원 이상이면 이벤트 대상이다.
  #isEventTarget() {
    const totalPrice = this.#result.totalPrice || this.#calculateTotalPrice();
    return totalPrice >= EVENT.priceThreshold;
  }

  // 이벤트 대상인지 확인한다. 주문을 토대로 한 총주문 금액이 10,000원 이상이면 이벤트 대상이다.
  #isOrderEventTarget() {
    const totalPrice = this.#result.totalPrice || this.#calculateTotalPrice();
    return this.#isEventTarget(totalPrice);
  }

  // 크리스마스 디데이 할인 이벤트 기간인지 확인한다. 기간은 1일부터 25일까지이다.
  #isChristmasEventTarget() {
    const totalPrice = this.#result.totalPrice || this.#calculateTotalPrice();
    if (!this.#isEventTarget(totalPrice)) return false;
    const { visitDate } = this.#result;
    return visitDate >= DATE.dday.start && visitDate <= DATE.dday.end;
  }

  // 방문 날짜와 주문 메뉴를 토대로 필요한 정보를 계산한다.
  calculateBill() {
    const totalPrice = this.#calculateTotalPrice();
    this.#result.totalPrice = totalPrice;
    // 2-1-1. 총주문 금액 10,000원 이상부터 이벤트를 적용한다. 아닌 경우 바로 `2-6`을 실행한다.
    if (this.#isEventTarget()) {
      this.#result.giveAway = this.#calculateGiveAway();
      this.#result.benefits = this.#calculateBenefits();
      this.#result.benefitAmount = this.#calculateBenefitAmount();
      this.#result.badge = this.#createBadge();
    }
    this.#result.finalPrice = this.#calculateFinalPrice();
    return this.#result;
  }

  // 2-1. 할인 전 총주문 금액을 계산한다.
  #calculateTotalPrice() {
    return this.#result.orders.reduce((acc, order) => {
      const { menu: menuName, amount: menuAmount } = order;
      return acc + Menu.getMenuPrice(menuName) * menuAmount;
    }, 0);
  }

  // 2-2. 총주문 금액이 12만 원 이상이면 증정 이벤트를 진행한다.
  #calculateGiveAway() {
    const totalPrice = this.#result.totalPrice || this.#calculateTotalPrice();
    return totalPrice >= BENEFIT.giveAway.threshold;
  }

  // 2-3. 혜택 내역을 계산한다.
  #calculateBenefits() {
    if (!this.#isOrderEventTarget()) return BENEFIT_EMPTY_CASE.benefits;
    const christmasBenefit = this.#calculateChristmasBenefit();
    const dayBenefit = this.#calculateDayBenefit();
    const specialBenefit = this.#calculateSpecialBenefit();
    const giveAwayBenefit = this.#calculateGiveAwayBenefit();
    return [christmasBenefit, dayBenefit, specialBenefit, giveAwayBenefit].filter((benefit) => Object.keys(benefit).length !== 0);
  }

  // 2-3-1. 크리스마스 디데이 할인 금액을 계산한다.
  #calculateChristmasBenefit() {
    if (!this.#isChristmasEventTarget()) return BENEFIT_EMPTY_CASE.christmasBenefit;
    const { visitDate } = this.#result;
    return {
      name: BENEFIT.christmas.name,
      type: BENEFIT.christmas.type,
      discount: BENEFIT.christmas.startPrice + BENEFIT.christmas.dayPrice * (visitDate - DATE.dday.start),
    };
  }

  // 2-3-2. 요일에 따라 평일, 주말 할인 금액을 계산한다.
  #calculateDayBenefit() {
    const { visitDate } = this.#result;
    if (isWeekday(visitDate)) {
      return this.#calculateWeekDayBenefits();
    }
    if (isWeekend(visitDate)) {
      return this.#calculateWeekEndBenefits();
    }
    return BENEFIT_EMPTY_CASE.dayBenefit;
  }

  // 평일 할인 금액을 계산한다.
  #calculateWeekDayBenefits() {
    const { visitDate } = this.#result;
    if (!isWeekday(visitDate)) return BENEFIT_EMPTY_CASE.weekDay.benefit;
    const discountNumber = this.#calculateWeekDayDiscountNumber();
    if (!discountNumber) return BENEFIT_EMPTY_CASE.weekDay.benefit;
    return {
      name: BENEFIT.weekDay.name,
      type: BENEFIT.weekDay.type,
      discount: BENEFIT.weekDay.discount * discountNumber,
    };
  }

  // 평일 할인 적용 가능한 메뉴의 갯수를 계산한다.
  #calculateWeekDayDiscountNumber() {
    const { visitDate, orders } = this.#result;
    if (!isWeekday(visitDate)) return BENEFIT_EMPTY_CASE.weekDay.discountNumber;
    return orders.reduce((acc, order) => {
      const { menu: menuName, amount: menuAmount } = order;
      if (Menu.getMenuType(menuName) === BENEFIT.weekDay.menuType) {
        return acc + menuAmount;
      }
      return acc;
    }, 0);
  }

  // 주말 할인 금액을 계산한다.
  #calculateWeekEndBenefits() {
    const { visitDate } = this.#result;
    if (!isWeekend(visitDate)) return BENEFIT_EMPTY_CASE.weekEnd.benefit;
    const discountNumber = this.#calculateWeekEndDiscountNumber();
    if (!discountNumber) return BENEFIT_EMPTY_CASE.weekEnd.benefit;
    return {
      name: BENEFIT.weekEnd.name,
      type: BENEFIT.weekEnd.type,
      discount: BENEFIT.weekEnd.discount * discountNumber,
    };
  }

  // 주말 할인 적용 가능한 갯수를 계산한다.
  #calculateWeekEndDiscountNumber() {
    const { visitDate, orders } = this.#result;
    if (!isWeekend(visitDate)) return BENEFIT_EMPTY_CASE.weekEnd.discountNumber;
    return orders.reduce((acc, order) => {
      const { menu: menuName, amount: menuAmount } = order;
      if (Menu.getMenuType(menuName) === BENEFIT.weekEnd.menuType) {
        return acc + menuAmount;
      }
      return acc;
    }, 0);
  }

  // 2-3-3. 특별 할인 금액을 계산한다.
  #calculateSpecialBenefit() {
    const { visitDate } = this.#result;
    if (!isSpecial(visitDate)) return BENEFIT_EMPTY_CASE.specialBenefit;
    return {
      name: BENEFIT.special.name,
      type: BENEFIT.special.type,
      discount: BENEFIT.special.discount,
    };
  }

  // 2-3-4. 증정 이벤트 금액을 계산한다.
  #calculateGiveAwayBenefit() {
    const giveAway = this.#result.giveAway || this.#calculateGiveAway();
    if (!giveAway) return BENEFIT_EMPTY_CASE.giveAwayBenefit;
    const { price: giveAwayMenuPrice } = Menu.getGiveAwayMenu();
    return {
      name: BENEFIT.giveAway.name,
      type: BENEFIT.giveAway.type,
      discount: giveAwayMenuPrice,
    };
  }

  // 2-4. 총혜택 금액을 계산한다.
  #calculateBenefitAmount() {
    if (!this.#isOrderEventTarget()) return BENEFIT_EMPTY_CASE.benefitAmount.total;
    const totalDiscount = this.#calculateTotalDiscount();
    const giveAwayPrice = this.#calculateGiveAwayPrice();
    return totalDiscount + giveAwayPrice;
  }

  // 2-4-1. 할인 금액의 합계를 계산한다
  #calculateTotalDiscount() {
    if (!this.#isOrderEventTarget()) return BENEFIT_EMPTY_CASE.benefitAmount.discount;
    const benefits = this.#result.benefits || this.#calculateBenefits();
    return benefits.reduce((acc, benefit) => {
      const { type, discount } = benefit;
      if (type === BENEFIT_TYPE.discount) {
        return acc + discount;
      }
      return acc;
    }, 0);
  }

  // 2-4-2. 증정 이벤트 여부에 따라 증정 메뉴의 가격을 계산한다.
  #calculateGiveAwayPrice() {
    if (!this.#isOrderEventTarget()) return BENEFIT_EMPTY_CASE.benefitAmount.giveAway;
    const giveAway = this.#result.giveAway || this.#calculateGiveAway();
    if (!giveAway) return 0;
    const { price: giveAwayMenuPrice } = Menu.getGiveAwayMenu();
    return giveAwayMenuPrice;
  }

  // 2-5. 총혜택 금액에 따라 이벤트 배지를 부여한다.
  #createBadge() {
    // 이벤트 대상이 아니거나
    if (!this.#isOrderEventTarget()) return '';
    const benefitAmount = this.#result.benefitAmount || this.#calculateBenefitAmount();
    // 총혜택 금액이 5,000원(배지를 받기 위한 최소 금액) 미만이면 배지를 부여하지 않는다.
    if (benefitAmount < BADGE_THRESHOLD.star) return '';
    const badge = new Badge(benefitAmount);
    return badge;
  }

  // 2-6. 할인 후 예상 결제 금액을 계산한다.
  #calculateFinalPrice() {
    const totalPrice = this.#result.totalPrice || this.#calculateTotalPrice();
    const benefitDiscount = this.#calculateTotalDiscount();
    const finalPrice = totalPrice - benefitDiscount;
    return finalPrice;
  }
}

export default Bill;