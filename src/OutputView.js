import { Console } from "@woowacourse/mission-utils";
import { OUTPUT } from "./constants/message.js";
import outputHelper from "./util/outputHelper.js";

const OutputView = {
  startOrder() {
    Console.print(OUTPUT.startOrder);
  },
  printError(error) {
    Console.print(error);
  },
  // 3. 최종 정보를 출력한다.
  printBill(bill) {
    const { visitDate, orders, totalPrice, giveAway, benefits, benefitAmount, badge, finalPrice } = bill.calculateBill();
    Console.print(outputHelper.printBill(visitDate));
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
    Console.print(outputHelper.printOrders(orders));
  },
  // 3-2. 할인 전 총주문 금액을 출력한다.
  printTotalPrice(totalPrice) {
    Console.print(outputHelper.printTotalPrice(totalPrice));
  },
  // 3-3. 증정 메뉴를 출력한다.
  printGiveAway(giveAway) {
    Console.print(outputHelper.printGiveAway(giveAway));
  },
  // 3-4. 혜택 내역을 출력한다.
  printBenefits(benefits) {
    Console.print(outputHelper.printBenefits(benefits));
  },
  // 3-5. 총혜택 금액을 출력한다.
  printBenefitAmount(benefitAmount) {
    Console.print(outputHelper.printBenefitAmount(benefitAmount));
  },
  // 3-6. 할인 후 예상 결제 금액을 출력한다.
  printFinalPrice(finalPrice) {
    Console.print(outputHelper.printFinalPrice(finalPrice));
  },
  // 3-7. 12월 이벤트 배지를 출력한다.
  printBadge(badge) {
    Console.print(outputHelper.printBadge(badge));
  },
};

export default OutputView;