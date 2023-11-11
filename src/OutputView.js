import { Console } from "@woowacourse/mission-utils";
import { OUTPUT } from "./constants/message.js";
import { BENEFIT } from "./constants/constant.js";

const OutputView = {
  startOrder() {
    Console.print(OUTPUT.startOrder);
  },
  printError(message) {
    Console.print(message);
  },
  printBill(bill, visitDate) {
    Console.print(OUTPUT.printBill(visitDate));
    const { orders } = bill;
    const { totalPrice, giveAway, benefits, benefitAmount, badge, finalPrice } = bill.calculateBill();
    this.printOrders(orders);
    this.printTotalPrice(totalPrice);
    this.printGiveAway(giveAway);
    this.printBenefits(benefits);
    this.printBenefitAmount(benefitAmount);
    this.printFinalPrice(finalPrice);
    this.printBadge(badge);
  },
  // 3-1. 주문 메뉴를 출력한다.
  printOrders(orders) {
    Console.print(OUTPUT.printOrders);
    orders.forEach((order) => {
      const { menu, amount } = order;
      Console.print(`${menu} ${amount}개`);
    });
  },
  // 3-2. 할인 전 총주문 금액을 출력한다.
  printTotalPrice(totalPrice) {
    Console.print(OUTPUT.printTotalPrice);
    Console.print(`${totalPrice.toLocaleString()}원`);
  },
  // 3-3. 증정 메뉴를 출력한다.
  printGiveAway(giveAway) {
    Console.print(OUTPUT.printGiveAway);
    if (!giveAway) {
      Console.print("없음");
      return;
    }
    Console.print(`${BENEFIT.giveAway.menu} ${BENEFIT.giveAway.amount}개`);
  },
  // 3-4. 혜택 내역을 출력한다.
  printBenefits(benefits) {
    Console.print(OUTPUT.printBenefits);
    if (!benefits.length) {
      Console.print("없음");
      return;
    }
    benefits.forEach((benefit) => {
      const { name, discount } = benefit;
      Console.print(`${BENEFIT[name].name_ko}: -${discount.toLocaleString()}원`);
    });
  },
  // 3-5. 총혜택 금액을 출력한다.
  printBenefitAmount(benefitAmount) {
    Console.print(OUTPUT.printBenefitAmount);
    if (!benefitAmount) {
      Console.print("0원");
      return;
    }
    Console.print(`-${benefitAmount.toLocaleString()}원`);
  },
  // 3-6. 할인 후 예상 결제 금액을 출력한다.
  printFinalPrice(finalPrice) {
    Console.print(OUTPUT.printFinalPrice);
    Console.print(`${finalPrice.toLocaleString()}원`);
  },
  // 3-7. 12월 이벤트 배지를 출력한다.
  printBadge(badge) {
    Console.print(OUTPUT.printBadge);
    if (!badge) {
      Console.print("없음");
      return;
    }
    const { info } = badge;
    Console.print(`${info.name}`);
  },
};

export default OutputView;