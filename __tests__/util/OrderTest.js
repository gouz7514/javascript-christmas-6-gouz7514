import { orderToArray } from "../../src/util/order.js";

describe("util/order 테스트", () => {
  describe("orderToArray 메소드는 주어진 주문을 배열로 변환한다.", () => {
    test("티본스테이크-1,바비큐립-1,초코케이크-2,제로콜라-1", () => {
      const orders = "티본스테이크-1,바비큐립-1,초코케이크-2,제로콜라-1";
      const expected = [
        { menu: "티본스테이크", amount: 1 },
        { menu: "바비큐립", amount: 1 },
        { menu: "초코케이크", amount: 2 },
        { menu: "제로콜라", amount: 1 },
      ];
      const result = orderToArray(orders);
      expect(result).toEqual(expected);
    });
  });
})