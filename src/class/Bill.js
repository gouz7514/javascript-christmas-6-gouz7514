import { MENU } from "../constants/menu.js";
import { DATE, EVENT, BENEFIT_TYPE, BENEFIT_THRESHOLD, BENEFIT } from "../constants/constant.js";
import Badge from "./Badge.js";

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

  createBillInfo(order) {
    const { visitDate, orders } = order;
    this.setBasicInfo(visitDate, orders);
    const totalPrice = this.calculateTotalPrice(orders);
    // 2-1-1. 총주문 금액이 10,000원 이상인 경우에만 혜택 내역을 계산한다.
    if (totalPrice >= BENEFIT_THRESHOLD) {
      const giveAway = this.calculateGiveAway(totalPrice);
      const benefits = this.calculateBenefits(visitDate, orders);
      const benefitAmount = this.calculateBenefitAmount(benefits, giveAway);
      this.setBadge(benefitAmount);
    }
    this.setFinalPrice(visitDate, orders);
    return this.#info;
  }

  setBasicInfo(visitDate, orders) {
    this.setVisitDate(visitDate);
    this.setOrders(orders);
  }

  setVisitDate(visitDate) {
    this.#info.visitDate = visitDate;
  }

  setOrders(orders) {
    this.#info.orders = orders;
  }

  // 2-1. 할인 전 총주문 금액을 계산한다.
  calculateTotalPrice(orders) {
    let totalPrice = 0;
    orders.forEach((order) => {
      const { menu, amount } = order;
      totalPrice += MENU[menu].price * amount;
    });
    this.setTotalPrice(totalPrice);
    return totalPrice;
  }

  setTotalPrice(totalPrice) {
    this.#info.totalPrice = totalPrice;
  }

  // 2-2. 총주문 금액이 12만 원 이상이면 증정 이벤트를 진행한다.
  calculateGiveAway(totalPrice) {
    const giveAway = totalPrice >= BENEFIT.giveAway.threshold;
    this.setGiveAway(giveAway);
    return giveAway;
  }

  setGiveAway(giveAway) {
    this.#info.giveAway = giveAway;
  }

  // 2-3. 혜택 내역을 계산한다.
  calculateBenefits(visitDate, orders) {
    const benefits = [];
    const totalPrice = this.calculateTotalPrice(orders);
    if (totalPrice < 10000) return [];
    const allBenefits = this.calculateAllBenefits(visitDate, orders);
    allBenefits.forEach((benefit) => {
      if (benefit.name) {
        benefits.push(benefit);
      }
    });
    this.setBenefits(benefits);
    return benefits;
  }

  setBenefits(benefits) {
    this.#info.benefits = benefits;
  }

  calculateAllBenefits(visitDate, orders) {
    const christmasBenefit = this.calculateChristmasBenefit(visitDate);
    const dayBenefit = this.calculateDayBenefit(visitDate, orders);
    const specialBenefit = this.calculateSpecialBenefit(visitDate);
    const giveAwayBenefit = this.calculateGiveAwayBenefit(orders);
    return [christmasBenefit, dayBenefit, specialBenefit, giveAwayBenefit];
  }

  // 2-3-1. 크리스마스 디데이 할인 금액을 계산한다.
  calculateChristmasBenefit(visitDate) {
    const benefit = {};
    if (visitDate >= DATE.dday.start && visitDate <= DATE.dday.end) {
      benefit.name = BENEFIT.christmas.name;
      benefit.type = BENEFIT.christmas.type;
      benefit.discount = BENEFIT.christmas.startPrice + BENEFIT.christmas.dayPrice * (visitDate - DATE.dday.start);
    }
    return benefit;
  }

  // 2-3-2. 요일에 따라 평일, 주말 할인 금액을 계산한다.
  calculateDayBenefit(visitDate, orders) {
    let benefit = {};
    const day = new Date(EVENT.year, EVENT.month - 1, visitDate).getDay();
    if (DATE.weekDay.includes(day)) {
      benefit = this.calculateWeekDayBenefits(orders);
    } else if (DATE.weekend.includes(day)) {
      benefit = this.calculateWeekEndBenefits(orders);
    }
    return benefit;
  }

  // 평일 할인 금액을 계산한다.
  calculateWeekDayBenefits(orders) {
    const discountNumber = this.calculateWeekDayDiscountNumber(orders);
    const benefit = {
      name: BENEFIT.weekDay.name,
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
      name: BENEFIT.weekEnd.name,
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
  calculateSpecialBenefit(visitDate) {
    let benefit = {};
    if (DATE.special.includes(visitDate)) {
      const { name, type, discount } = BENEFIT.special;
      benefit = { name, type, discount };
    }
    return benefit;
  }

  // 2-3-4. 증정 메뉴 금액을 계산한다.
  calculateGiveAwayBenefit(orders) {
    let benefit = {};
    const totalPrice = this.calculateTotalPrice(orders);
    const giveAway = this.calculateGiveAway(totalPrice);
    if (giveAway) {
      const { name, type, discount } = BENEFIT.giveAway;
      benefit = { name, type, discount };
    }
    return benefit;
  }

  // 2-4. 총혜택 금액을 계산한다.
  calculateBenefitAmount(benefits, giveAway) {
    let benefitAmount = 0;
    const benefitDiscount = this.calculateBenefitDiscount(benefits);
    const benefitGiveAway = this.calculateBenefitGiveAway(giveAway);
    benefitAmount = benefitDiscount + benefitGiveAway;
    this.setBenefitAmount(benefitAmount);
    return benefitAmount;
  }

  setBenefitAmount(benefitAmount) {
    this.#info.benefitAmount = benefitAmount;
  }

  // 2-4-1. 할인 금액의 합계를 계산한다
  calculateBenefitDiscount(benefits) {
    return benefits.reduce((acc, benefit) => {
      const { type, discount } = benefit;
      if (type === BENEFIT_TYPE.discount) {
        return acc + discount;
      }
      return acc;
    }, 0);
  }

  // 2-4-2. 증정 메뉴의 가격을 계산한다.
  calculateBenefitGiveAway(giveAway) {
    if (giveAway) {
      return BENEFIT.giveAway.discount;
    }
    return 0;
  }

  // 2-5. 총 혜택 금액에 따라 12월 이벤트 배지를 부여한다.
  setBadge(benefitAmount) {
    const badge = this.createBadge(benefitAmount);
    this.#info.badge = badge;
    return badge;
  }

  createBadge(benefitAmount) {
    const badge = new Badge();
    return badge.createBadge(benefitAmount);
  }
  // 2-6. 할인 후 예상 결제 금액을 계산한다.
  setFinalPrice(visitDate, orders) {
    const totalPrice = this.calculateTotalPrice(orders);
    const benefits = this.calculateBenefits(visitDate, orders);
    const finalPrice = this.calculateFinalPrice(totalPrice, benefits);
    this.#info.finalPrice = finalPrice;
  }

  calculateFinalPrice(totalPrice, benefits) {
    return totalPrice - this.calculateBenefitDiscount(benefits);
  }
}

export default Bill;