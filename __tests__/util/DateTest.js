import { DAY } from "../../src/constants/constant.js";
import { getDay, isWeekend, isWeekday, isSpecial } from "../../src/util/date.js";

describe("2023년 12월의 주어진 날짜에 대해 util/date 테스트", () => {
  describe("getDay 메소드는 주어진 날짜에 해당하는 요일을 반환한다.", () => {
    test("1일은 금요일이다", () => {
      const date = 1;
      const expected = DAY.fri;
      const result = getDay(date);
      expect(result).toBe(expected);
    });
  });

  describe("isWeekend 메소드는 주어진 날짜가 주말인지 확인한다.", () => {
    test("1일은 주말이다.", () => {
      const date = 1;
      const result = isWeekend(date);
      expect(result).toBe(true);
    });

    test("17일은 주말이다.", () => {
      const date = 17;
      const result = isWeekend(date);
      expect(result).toBe(false);
    });
  });

  describe("isWeekday 메소드는 주어진 날짜가 평일인지 확인한다.", () => {
    test("3일은 평일이다.", () => {
      const date = 3;
      const result = isWeekday(date);
      expect(result).toBe(true);
    });

    test("2일은 평일이 아니다.", () => {
      const date = 2;
      const result = isWeekday(date);
      expect(result).toBe(false);
    });
  });

  describe("isSpecial 메소드는 주어진 날짜가 특별 할인에 해당하는지 확인한다", () => {
    test("3일은 특별 할인에 해당한다.", () => {
      const date = 3;
      const result = isSpecial(date);
      expect(result).toBe(true);
    });

    test("4일은 특별 할인에 해당하지 않는다.", () => {
      const date = 4;
      const result = isSpecial(date);
      expect(result).toBe(false);
    });
  })
})