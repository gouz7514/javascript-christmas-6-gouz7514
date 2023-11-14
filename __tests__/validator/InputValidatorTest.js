import InputValidator from "../../src/validator/inputValidator.js";

describe("inputValidator 테스트", () => {
  const inputValidator = new InputValidator();

  describe("유닛 테스트", () => {
    describe("고객의 식당 예상 방문 날짜에 대해 검증한다.", () => {
      describe("(요구사항 1-1-1) - 입력값은 숫자여야 한다.", () => {
        test("숫자가 아닐 경우 예외를 발생시킨다", () => {
          expect(() => inputValidator.isNumber("a")).toThrow("[ERROR]");
        });
      });
    
      describe("(요구사항 1-1-2) - 입력값은 1 이상 31 이하의 숫자인지 확인한다.", () => {
        test("1 이상 31 이하의 숫자가 아닐 경우 예외를 발생시킨다", () => {
          const dateArray = [0, 32];
          dateArray.forEach((date) => {
            expect(() => inputValidator.isValidDate(date)).toThrow("[ERROR]");
          });
        });
      });
    });

    describe("고객의 주문 메뉴에 대해 검증한다.", () => {
      describe("(요구사항 1-2-1) - 메뉴 형식은 예시와 같아야 한다.", () => {
        test("메뉴 형식에 맞지 않을 경우 예외를 발생시킨다", () => {
          const orderArray = [["티본스테이크1"], ["티본스테이크-1", "타파스4"]];
          orderArray.forEach((order) => {
            expect(() => inputValidator.isValidOrderFormat(order)).toThrow("[ERROR]");
          });
        });
      });
    
      describe("(요구사항 1-2-2) - 메뉴판에 있는 메뉴여야만 한다.", () => {
        test("메뉴판에 없는 메뉴일 경우 예외를 발생시킨다", () => {
          expect(() => inputValidator.isValidOrder(["없는메뉴-1"])).toThrow("[ERROR]");
        });
      });
    
      describe("(요구사항 1-2-3) - 메뉴의 개수는 1 이상의 숫자여야만 한다.", () => {
        test("메뉴의 개수가 1개 이상이 아닌 경우 예외를 발생시킨다", () => {
          expect(() => inputValidator.isValidMenuCount(["티본스테이크-0"])).toThrow("[ERROR]");
        });
      });
    
      describe("(요구사항 1-2-4) - 중복 메뉴는 허용하지 않는다.", () => {
        test("주문한 메뉴가 중복될 경우 예외를 발생시킨다", () => {
          expect(() => inputValidator.isMenuRepeat(["티본스테이크-1", "티본스테이크-1"])).toThrow("[ERROR]");
        });
      });
    
      describe("(요구사항 1-2-5) - 총 메뉴의 개수는 20개를 초과할 수 없다.", () => {
        test("주문한 메뉴의 총 개수가 20개를 넘을 경우 예외를 발생시킨다", () => {
          const orderArray = [
            ["티본스테이크-21"],
            ["타파스-5", "바비큐립-5", "초코케이크-5", "제로콜라-6"]
          ];
          orderArray.forEach((order) => {
            expect(() => inputValidator.isMenuCountOver(order)).toThrow("[ERROR]");
          });
        });
      });
    
      describe("(요구사항 1-2-6) - 음료만 주문 시, 주문할 수 없다.", () => {
        test("주문한 메뉴가 모두 음료일 경우 예외를 발생시킨다", () => {
          const orderArray = [
            ["제로콜라-5"],
            ["제로콜라-5", "레드와인-4", "샴페인-3"]
          ];
          orderArray.forEach((order) => {
            expect(() => inputValidator.isOnlyDrink(order)).toThrow("[ERROR]");
          });
        });
      });
    });

  });

  describe("통합 테스트", () => {
    describe("방문 날짜를 검증한다.", () => {
      test("방문 날짜가 1 이상 31 이하의 숫자일 경우 숫자로 변환하여 반환한다", () => {
        const dateArray = [1, 31];
        dateArray.forEach((date) => {
          const result = inputValidator.validateVisitDate(date);
          expect(result).toBe(date);
        });
      });

      test("방문 날짜가 1 이상 31 이하의 숫자가 아닐 경우 예외를 발생시킨다", () => {
        const dateArray = [0, 32, "a", -2];
        dateArray.forEach((date) => {
          expect(() => inputValidator.validateVisitDate(date)).toThrow("[ERROR]");
        });
      });
    });

    describe("주문 메뉴를 검증한다.", () => {
      test("모든 유닛 테스트를 통과할 경우 주문 메뉴를 객체로 변환하여 반환한다", () => {
        const orders = "티본스테이크-1,타파스-4,바비큐립-3,초코케이크-2";
        const result = inputValidator.validateOrders(orders);
        expect(result).toEqual([
          { menu: "티본스테이크", amount: 1 },
          { menu: "타파스", amount: 4 },
          { menu: "바비큐립", amount: 3 },
          { menu: "초코케이크", amount: 2 },
        ]);
      });

      test("유닛 테스트를 하나라도 통과하지 못할 경우 예외를 발생시킨다", () => {
        const orders = [
          "티본스테이크1,타파스-4",
          "없는메뉴-1",
          "티본스테이크-0",
          "티본스테이크-1,티본스테이크-1",
          "티본스테이크-21",
          "제로콜라-5"
        ]
        orders.forEach((order) => {
          expect(() => inputValidator.validateOrders(order)).toThrow("[ERROR]");
        });
      });
    });
  });
});