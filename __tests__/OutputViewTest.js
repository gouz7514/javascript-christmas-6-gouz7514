import { MissionUtils } from "@woowacourse/mission-utils";
import { EOL as LINE_SEPARATOR } from "os";

import OutputView from "../src/OutputView.js";
import Bill from "../src/class/Bill.js";
import { orderToArray } from "../src/util/order.js";

const getLogSpy = () => {
  const logSpy = jest.spyOn(MissionUtils.Console, "print");
  logSpy.mockClear();

  return logSpy;
};

const getOutput = (logSpy) => {
  return [...logSpy.mock.calls].join(LINE_SEPARATOR);
};

const expectLogContains = (received, expectedLogs) => {
  expectedLogs.forEach((log) => {
    expect(received).toContain(log);
  });
};

describe("이벤트 플래너 결과 출력 테스트", () => {
  test("이벤트 플래너 시작 타이틀 출력 테스트", () => {
    // given
    const logSpy = getLogSpy();
    const expected = "안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.";

    // when
    OutputView.startOrder();

    // then
    expectLogContains(getOutput(logSpy), [expected]);
  });

  test("(요구사항 3-1) - <주문 메뉴> 출력 테스트", () => {
    // given
    const logSpy = getLogSpy();
    const orders = [
      { menu: "티본스테이크", amount: 1 },
      { menu: "바비큐립", amount: 1 },
      { menu: "초코케이크", amount: 2 },
      { menu: "제로콜라", amount: 1 },
    ];
    const expected = [
      "<주문 메뉴>",
      "티본스테이크 1개",
      "바비큐립 1개",
      "초코케이크 2개",
      "제로콜라 1개",
    ];

    // when
    OutputView.printOrders(orders);

    // then
    expectLogContains(getOutput(logSpy), expected);
  });

  test("(요구사항 3-2) - <할인 전 총주문 금액> 출력 테스트", () => {
    // given
    const toalPrice = 50000
    const logSpy = getLogSpy();
    const expected = [
      "<할인 전 총주문 금액>",
      "50,000원",
    ];

    // when
    OutputView.printTotalPrice(toalPrice);

    // then
    expectLogContains(getOutput(logSpy), expected);
  });

  describe("(요구사항 3-3) - <증정 메뉴> 출력 테스트", () => {
    test("증정 이벤트 대상일 경우 증정 메뉴 출력 테스트", () => {
      // given
      const giveAway = true;
      const logSpy = getLogSpy();
      const expected = [
        "<증정 메뉴>",
        "샴페인 1개",
      ];

      // when
      OutputView.printGiveAway(giveAway);

      // then
      expectLogContains(getOutput(logSpy), expected);
    });

    test("증정 이벤트 대상이 아닐 경우 '없음' 출력 테스트", () => {
      // given
      const giveAway = false;
      const logSpy = getLogSpy();
      const expected = [
        "<증정 메뉴>",
        "없음",
      ];

      // when
      OutputView.printGiveAway(giveAway);

      // then
      expectLogContains(getOutput(logSpy), expected);
    });
  });

  describe("(요구사항 3-4) - <혜택 내역> 출력 테스트", () => {
    test("혜택 내역이 있을 경우 혜택 내역 출력 테스트", () => {
      // given
      const logSpy = getLogSpy();
      const benefits = [
        { name: 'christmas', type: 'discount', discount: 1200 },
        { name: 'weekDay', type: 'discount', discount: 4046 },
        { name: 'special', type: 'discount', discount: 1000 },
        { name: 'giveAway', type: 'event', discount: 25000 }
      ];
      const expected = [
        "<혜택 내역>",
        "크리스마스 디데이 할인: -1,200원",
        "평일 할인: -4,046원",
        "특별 할인: -1,000원",
        "증정 이벤트: -25,000원",
      ];

      // when
      OutputView.printBenefits(benefits);

      // then
      expectLogContains(getOutput(logSpy), expected);
    });

    test("혜택 내역이 없을 경우 '없음' 출력 테스트", () => {
      // given
      const logSpy = getLogSpy();
      const benefits = [];
      const expected = [
        "<혜택 내역>",
        "없음",
      ];

      // when
      OutputView.printBenefits(benefits);

      // then
      expectLogContains(getOutput(logSpy), expected);
    });
  });

  describe("(요구사항 3-5) - <총혜택 금액> 출력 테스트", () => {
    test("총혜택 금액이 있을 경우 총혜택 금액 출력 테스트", () => {
      // given
      const logSpy = getLogSpy();
      const benefitAmount = 10000;
      const expected = [
        "<총혜택 금액>",
        "10,000원",
      ];

      // when
      OutputView.printBenefitAmount(benefitAmount);

      // then
      expectLogContains(getOutput(logSpy), expected);
    });

    test("총혜택 금액이 없을 경우 '0원' 출력 테스트", () => {
      // given
      const logSpy = getLogSpy();
      const benefitAmount = 0;
      const expected = [
        "<총혜택 금액>",
        "0원",
      ];

      // when
      OutputView.printBenefitAmount(benefitAmount);

      // then
      expectLogContains(getOutput(logSpy), expected);
    });
  });

  test("(요구사항 3-6) - <할인 후 예상 결제 금액> 출력 테스트", () => {
    // given
    const finalPrice = 38000;
    const logSpy = getLogSpy();
    const expected = [
      "<할인 후 예상 결제 금액>",
      "38,000원",
    ];

    // when
    OutputView.printFinalPrice(finalPrice);

    // then
    expectLogContains(getOutput(logSpy), expected);
  });

  test("(요구사항 3-7) - <12월 이벤트 배지> 출력 테스트", () => {
    // given
    const logSpy = getLogSpy();
    const expected = [
      "<12월 이벤트 배지>",
      "없음",
    ];

    // when
    OutputView.printBadge('');

    // then
    expectLogContains(getOutput(logSpy), expected);
  });

  test("(요구사항 3) - 모든 타이틀 출력 테스트", () => {
    // given
    const visitDate = 3;
    const orders = orderToArray("티본스테이크-1,바비큐립-1,초코케이크-2,제로콜라-1");
    const bill = new Bill(visitDate, orders);
    const logSpy = getLogSpy();
    const expected = [
      "안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.",
      "12월 3일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!",
      "<주문 메뉴>",
      "<할인 전 총주문 금액>",
      "<증정 메뉴>",
      "<혜택 내역>",
      "<총혜택 금액>",
      "<할인 후 예상 결제 금액>",
      "<12월 이벤트 배지>",
    ];

    // when
    OutputView.startOrder();
    OutputView.printBill(bill);

    // then
    expect(logSpy).toHaveBeenCalledTimes(expected.length);
    expectLogContains(getOutput(logSpy), expected);
  })
});