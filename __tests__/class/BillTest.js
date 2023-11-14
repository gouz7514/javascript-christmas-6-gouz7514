import Bill from "../../src/class/Bill.js";

const DATE = {
  weekDay: 3,
  weekEnd: 1,
  christmas: 1,
  notChristmas: 26,
  special: 25,
  notSpecial: 26,
  example: 3,
};

const richOrders = [
  { menu: "티본스테이크", amount: 1 },
  { menu: "바비큐립", amount: 1 },
  { menu: "초코케이크", amount: 2 },
  { menu: "제로콜라", amount: 1 },
];

const poorOrders = [
  { menu: "타파스", amount: 1 },
  { menu: "제로콜라", amount: 1 },
];

const richBill = new Bill(DATE.example, richOrders);
const poorBill = new Bill(DATE.example, poorOrders);

describe("Bill 클래스 테스트", () => {
  describe("총주문 금액 계산 테스트", () => {
    test("총주문 금액을 반환한다.", () => {
      const expected = 142000;
      const result = richBill.calculateTotalPrice();
      expect(result).toBe(expected);
    });

    test("존재하지 않는 메뉴를 주문할 경우 예외를 발생시킨다.", () => {
      const visitDate = 1;
      const orders = [
        { menu: "없는메뉴", amount: 1 },
      ];
      const bill = new Bill(visitDate, orders);
      expect(() => bill.calculateTotalPrice(orders)).toThrow("[ERROR]");
    });
  });

  describe("증정 이벤트 여부 계산 테스트", () => {
    test("총주문 금액이 12만 원 이상일 경우 true를 반환한다.", () => {
      const result = richBill.calculateGiveAway();
      expect(result).toBeTruthy();
    });

    test("총주문 금액이 12만 원 미만일 경우 false를 반환한다.", () => {
      const result = poorBill.calculateGiveAway();
      expect(result).toBeFalsy();
    });
  });

  describe("혜택 내역 계산 테스트", () => {
    let weekDayBill;
    let weekEndBill;

    beforeEach(() => {
      weekDayBill = new Bill(DATE.weekDay, richOrders);
      weekEndBill = new Bill(DATE.weekEnd, richOrders);
    });

    test("이벤트 대상이 아닌 경우 혜택 내역을 계산하지 않는다.", () => {
      const expected = [];
      const result = poorBill.calculateBenefits();
      expect(result).toEqual(expected);
    });

    describe("크리스마스 디데이 할인 금액 계산 메소드 테스트", () => {
      test("이벤트 기간(1일 ~ 25일)인 경우 디데이 할인 금액을 담은 객체를 반환한다.", () => {
        const bill = new Bill(DATE.christmas, richOrders);
        const expected = {
          name: 'christmas',
          type: 'discount',
          discount: 1000,
        };
        const result = bill.calculateChristmasBenefit();
        expect(result).toEqual(expected);
      });

      test("이벤트 기간이 아닌 경우 빈 객체를 반환한다.", () => {
        const bill = new Bill(DATE.notChristmas, richOrders);
        const expected = {};
        const result = bill.calculateChristmasBenefit();
        expect(result).toEqual(expected);
      });
    });

    describe("평일의 경우 할인 금액을 계산한다.", () => {
      describe("평일 할인 적용 가능 메뉴 갯수를 계산한다.", () => {
        test("평일인 경우 적용 가능한 메뉴의 갯수를 반환한다.", () => {
          const expected = 2;
          const result = weekDayBill.calculateWeekDayDiscountNumber();
          expect(result).toEqual(expected);
        });

        test("평일이 아닌 경우 0을 반환한다", () => {
          const expected = 0;
          const result = weekEndBill.calculateWeekDayDiscountNumber();
          expect(result).toEqual(expected);
        });
      });

      describe("평일 할인 금액을 계산한다.", () => {
        test("평일인 경우 할인 금액을 반환한다.", () => {
          const expected = {
            name: 'weekDay',
            type: 'discount',
            discount: 4046,
          };
          const result = weekDayBill.calculateWeekDayBenefits();
          expect(result).toEqual(expected);
        });

        test("평일이 아닌 경우 빈 객체를 반환한다.", () => {
          const expected = {};
          const result = weekEndBill.calculateWeekDayBenefits();
          expect(result).toEqual(expected);
        });
      });
    });

    describe("주말의 경우 할인 금액을 계산한다.", () => {
      describe("주말 할인 적용 가능 메뉴 갯수를 계산한다.", () => {
        test("주말인 경우 적용 가능한 메뉴의 갯수를 반환한다.", () => {
          const expected = 2;
          const result = weekEndBill.calculateWeekEndDiscountNumber();
          expect(result).toEqual(expected);
        });

        test("주말이 아닌 경우 0을 반환한다.", () => {
          const expected = 0;
          const result = weekDayBill.calculateWeekEndDiscountNumber();
          expect(result).toEqual(expected);
        });
      });

      describe("주말 할인 금액을 계산한다.", () => {
        test("주말인 경우 할인 금액을 반환한다.", () => {
          const expected = {
            name: 'weekEnd',
            type: 'discount',
            discount: 4046,
          };
          const result = weekEndBill.calculateWeekEndBenefits();
          expect(result).toEqual(expected);
        });

        test("주말이 아닌 경우 빈 객체를 반환한다.", () => {
          const expected = {};
          const result = weekDayBill.calculateWeekEndBenefits();
          expect(result).toEqual(expected);
        });
      });
    });

    describe("특별 할인 금액을 계산한다.", () => {
      test("특별 할인 이벤트에 해당하는 날짜인 경우 할인 금액을 계산한다.", () => {
        const bill = new Bill(DATE.special, richOrders);
        const expected = {
          name: 'special',
          type: 'discount',
          discount: 1000,
        };
        const result = bill.calculateSpecialBenefit();
        expect(result).toEqual(expected);
      });

      test("특별 할인 이벤트에 해당하지 않는 날짜인 경우 빈 객체를 반환한다.", () => {
        const bill = new Bill(DATE.notSpecial, richOrders);
        const expected = {};
        const result = bill.calculateSpecialBenefit();
        expect(result).toEqual(expected);
      });
    });

    describe("증정 이벤트 금액을 계산한다.", () => {
      test("이벤트 대상인 경우 증정 이벤트 금액을 계산한다.", () => {
        const expected = {
          name: 'giveAway',
          type: 'event',
          discount: 25000,
        };
        const result = richBill.calculateGiveAwayBenefit();
        expect(result).toEqual(expected);
      });

      test("이벤트 대상이 아닌 경우 빈 객체를 반환한다.", () => {
        const expected = {};
        const result = poorBill.calculateGiveAwayBenefit();
        expect(result).toEqual(expected);
      });
    });
  });

  describe("총혜택 금액 계산 테스트", () => {
    test("증정 이벤트 여부에 따라 증정 이벤트 금액을 계산한다.", () => {
      const expected = 25000;
      const result = richBill.calculateGiveAwayPrice();
      expect(result).toBe(expected);
    });

    test("할인 금액의 합계를 계산한다.", () => {
      const expected = 6246;
      const result = richBill.calculateTotalDiscount();
      expect(result).toBe(expected);
    });

    test("혜택 금액을 계산한다.", () => {
      const expected = 31246;
      const result = richBill.calculateBenefitAmount();
      expect(result).toBe(expected);
    });
  });

  describe("이벤트 배지 부여 테스트", () => {
    test("혜택 금액이 20,000원 이상일 경우 산타 배지를 부여한다.", () => {
      const expected = {
        name: '산타',
      };
      const result = new Bill(DATE.example, richOrders).createBadge();
      expect(result).toEqual(expected);
    });
  });


  describe("할인 후 예상 결제 금액 계산 테스트", () => {
    test("할인 후 예상 결제 금액을 계산한다.", () => {
      const expected = 135754;
      const result = richBill.calculateFinalPrice();
      expect(result).toBe(expected);
    });
  });
});