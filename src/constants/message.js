import { EVENT } from "./constant.js";

export const INPUT = {
  getVisitDate: "12월 중 식당 예상 방문 날짜는 언제인가요? (숫자만 입력해 주세요!)\n",
  getOrders: "주문하실 메뉴를 메뉴와 개수를 알려 주세요. (e.g. 해산물파스타-2,레드와인-1,초코케이크-1)\n",
};

export const OUTPUT = {
  startOrder: `안녕하세요! 우테코 식당 ${EVENT.month}월 이벤트 플래너입니다.`,
  printBill: visitDate => `${EVENT.month}월 ${visitDate}일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!`,
  printOrders: "\n<주문 메뉴>",
  printTotalPrice: "\n<할인 전 총주문 금액>",
  printGiveAway: "\n<증정 메뉴>",
  printBenefits: "\n<혜택 내역>",
  printBenefitAmount: "\n<총혜택 금액>",
  printFinalPrice: "\n<할인 후 예상 결제 금액>",
  printBadge: "\n<12월 이벤트 배지>",
};

export const UNIT = {
  amount: "개",
  price: "원",
};

export const EMPTY_CASE = {
  giveAway: "없음",
  benefits: "없음",
  benefitAmount: "0원",
  badge: "없음",
};