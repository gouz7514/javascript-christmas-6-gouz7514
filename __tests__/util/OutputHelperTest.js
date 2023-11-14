import outputHelper from "../../src/util/outputHelper";
import Badge from "../../src/class/Badge.js";
import { EOL as LINE_SEPARATOR } from "os";

describe("주어진 값을 출력 메시지 형식에 맞게 변환하는 outputHelper 테스트", () => {
  test("이벤트 혜택 미리 보기 메시지 테스트", () => {
    // given
    const date = 3;
    const expected = "12월 3일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!";

    // when
    const result = outputHelper.printBill(date);

    // then
    expect(result).toBe(expected);
  });

  test("주문 메뉴 메시지 테스트", () => {
    // given
    const orders = [
      { menu: "티본스테이크", amount: 1 },
      { menu: "바비큐립", amount: 1 },
      { menu: "초코케이크", amount: 2 },
      { menu: "제로콜라", amount: 1 },
    ];
    const expected = [
      "\n<주문 메뉴>",
      "티본스테이크 1개",
      "바비큐립 1개",
      "초코케이크 2개",
      "제로콜라 1개",
    ].join(LINE_SEPARATOR);

    // when
    const result = outputHelper.printOrders(orders);

    // then
    expect(result).toEqual(expected);
  });

  test("할인 전 총주문 금액 메시지 테스트", () => {
    // given
    const totalPrice = 50000;
    const expected = [
      "\n<할인 전 총주문 금액>",
      "50,000원",
    ].join(LINE_SEPARATOR);

    // when
    const result = outputHelper.printTotalPrice(totalPrice);

    // then
    expect(result).toEqual(expected);
  });

  describe("증정 메뉴 메시지 테스트", () => {
    test("증정 이벤트 대상일 경우 증정 메뉴 테스트", () => {
      // given
      const giveAway = true;
      const expected = [
        "\n<증정 메뉴>",
        "샴페인 1개",
      ].join(LINE_SEPARATOR);

      // when
      const result = outputHelper.printGiveAway(giveAway);

      // then
      expect(result).toEqual(expected);
    });

    test("증정 이벤트 대상이 아닐 경우 '없음' 테스트", () => {
      // given
      const giveAway = false;
      const expected = [
        "\n<증정 메뉴>",
        "없음",
      ].join(LINE_SEPARATOR);

      // when
      const result = outputHelper.printGiveAway(giveAway);

      // then
      expect(result).toEqual(expected);
    });
  });

  describe("혜택 내역 테스트", () => {
    test("혜택 내역이 있을 경우 혜택 내역 테스트", () => {
      // given
      const benefits = [
        { name: 'christmas', type: 'discount', discount: 1200 },
        { name: 'weekDay', type: 'discount', discount: 4046 },
        { name: 'special', type: 'discount', discount: 1000 },
        { name: 'giveAway', type: 'event', discount: 25000 }
      ];
      const expected = [
        "\n<혜택 내역>",
        "크리스마스 디데이 할인: -1,200원",
        "평일 할인: -4,046원",
        "특별 할인: -1,000원",
        "증정 이벤트: -25,000원",
      ].join(LINE_SEPARATOR);

      // when
      const result = outputHelper.printBenefits(benefits);

      // then
      expect(result).toEqual(expected);
    });

    test("혜택 내역이 없을 경우 '없음' 테스트", () => {
      // given
      const benefits = [];
      const expected = [
        "\n<혜택 내역>",
        "없음",
      ].join(LINE_SEPARATOR);

      // when
      const result = outputHelper.printBenefits(benefits);

      // then
      expect(result).toEqual(expected);
    });
  });

  describe("총혜택 금액 테스트", () => {
    test("총혜택 금액이 있을 경우 금액 테스트", () => {
      // given
      const benefitAmount = 12000;
      const expected = [
        "\n<총혜택 금액>",
        "-12,000원",
      ].join(LINE_SEPARATOR);
  
      // when
      const result = outputHelper.printBenefitAmount(benefitAmount);
  
      // then
      expect(result).toEqual(expected);
    });

    test("총혜택 금액이 없을 경우 '0원' 테스트", () => {
      // given
      const benefitAmount = 0;
      const expected = [
        "\n<총혜택 금액>",
        "0원",
      ].join(LINE_SEPARATOR);
  
      // when
      const result = outputHelper.printBenefitAmount(benefitAmount);
  
      // then
      expect(result).toEqual(expected);
    });
  });

  test("할인 후 예상 결제 금액 테스트", () => {
    // given
    const finalPrice = 38000;
    const expected = [
      "\n<할인 후 예상 결제 금액>",
      "38,000원",
    ].join(LINE_SEPARATOR);

    // when
    const result = outputHelper.printFinalPrice(finalPrice);

    // then
    expect(result).toEqual(expected);
  });

  describe("2월 이벤트 배지 테스트", () => {
    test("총혜택 금액이 5천원 이상인 경우 '별' 테스트", () => {
      // given
      const benefitAmount = 5000;
      const badge = new Badge(benefitAmount);
      const expected = [
        "\n<12월 이벤트 배지>",
        "별",
      ].join(LINE_SEPARATOR);
  
      // when
      const result = outputHelper.printBadge(badge);
  
      // then
      expect(result).toEqual(expected);
    });

    test("총혜택 금액이 1만원 이상인 경우 '트리' 테스트", () => {
      // given
      const benefitAmount = 10000;
      const badge = new Badge(benefitAmount);
      const expected = [
        "\n<12월 이벤트 배지>",
        "트리",
      ].join(LINE_SEPARATOR);
  
      // when
      const result = outputHelper.printBadge(badge);
  
      // then
      expect(result).toEqual(expected);
    });

    test("총혜택 금액이 2만원 이상인 경우 '산타' 테스트", () => {
      // given
      const benefitAmount = 20000;
      const badge = new Badge(benefitAmount);
      const expected = [
        "\n<12월 이벤트 배지>",
        "산타",
      ].join(LINE_SEPARATOR);
  
      // when
      const result = outputHelper.printBadge(badge);
  
      // then
      expect(result).toEqual(expected);
    });

    test("총혜택 금액이 0원인 경우 '없음' 테스트", () => {
      // given
      const badge = ''
      const expected = [
        "\n<12월 이벤트 배지>",
        "없음",
      ].join(LINE_SEPARATOR);
  
      // when
      const result = outputHelper.printBadge(badge);
  
      // then
      expect(result).toEqual(expected);
    });
  });
});