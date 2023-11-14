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
  describe("(요구사항 2-1) - 할인 전 총주문 금액을 계산한다.", () => {
    test("총주문 금액을 반환한다.", () => {
      const expected = 142000;
      const { totalPrice } = richBill.calculateBill();
      expect(totalPrice).toBe(expected);
    });

    test("존재하지 않는 메뉴를 주문할 경우 예외를 발생시킨다.", () => {
      const visitDate = 1;
      const orders = [
        { menu: "없는메뉴", amount: 1 },
      ];
      const bill = new Bill(visitDate, orders);
      expect(() => bill.calculateBill()).toThrow("[ERROR]");
    });
  });

  describe("(요구사항 2-1-1) - 총주문 금액이 10,000원 미만이면 이벤트를 적용하지 않는다",() => {
    test("10,000원 미만 주문 시 이벤트 대상이 아니다.", () => {
      const expected = {
        visitDate: 3,
        orders: [
          { menu: "타파스", amount: 1 },
          { menu: "제로콜라", amount: 1 },
        ],
        totalPrice: 8500,
        giveAway: false,
        benefits: null,
        benefitAmount: 0,
        badge: '',
        finalPrice: 8500,
      };
      const result = poorBill.calculateBill();
      expect(result).toEqual(expected);
    });
  });

  describe("(요구사항 2-2) - 증정 이벤트 여부를 계산한다", () => {
    test("총주문 금액이 12만 원 이상일 경우 true를 반환한다.", () => {
      const { giveAway } = richBill.calculateBill();
      expect(giveAway).toBeTruthy();
    });

    test("총주문 금액이 12만 원 미만일 경우 false를 반환한다.", () => {
      const { giveAway } = poorBill.calculateBill();
      expect(giveAway).toBeFalsy();
    });
  });

  describe("(요구사항 2-3) - 혜택 내역을 계산한다.", () => {
    let weekDayBill;
    let weekEndBill;

    beforeEach(() => {
      weekDayBill = new Bill(DATE.weekDay, richOrders);
      weekEndBill = new Bill(DATE.weekEnd, richOrders);
    });

    test("이벤트 대상이 아닌 경우 혜택 내역을 계산하지 않는다.", () => {
      const expected = null;
      const { benefits } = poorBill.calculateBill();
      expect(benefits).toEqual(expected);
    });

    describe("(요구사항 2-3-1) - 크리스마스 디데이 할인 금액을 계산한다.", () => {
      test("이벤트 기간(1일 ~ 25일)인 경우 디데이 할인 금액을 담은 객체를 반환한다.", () => {
        const bill = new Bill(DATE.christmas, richOrders);
        const expected = {
          name: 'christmas',
          type: 'discount',
          discount: 1000,
        };
        const { benefits } = bill.calculateBill();
        expect(benefits).toContainEqual(expected);
      });

      test("이벤트 기간이 아닌 경우 빈 객체를 반환한다.", () => {
        const bill = new Bill(DATE.notChristmas, richOrders);
        const expected = {
          name: 'christmas',
          type: 'discount',
          discount: 1000,
        };
        const { benefits } = bill.calculateBill();
        expect(benefits).not.toContainEqual(expected);
      });
    });

    describe("(요구사항 2-3-2) - 요일에 따라 평일, 주말 할인 금액을 계산한다", () => {
      describe("평일의 경우 할인 금액을 계산한다.", () => {
        test("평일인 경우 할인 금액을 반환한다.", () => {
          const expected = {
            name: 'weekDay',
            type: 'discount',
            discount: 4046,
          };
          const { benefits } = weekDayBill.calculateBill();
          expect(benefits).toContainEqual(expected);
        });

        test("평일이 아닌 경우 빈 객체를 반환한다.", () => {
          const expected = {
            name: 'weekDay',
            type: 'discount',
            discount: 4046,
          };
          const { benefits } = weekEndBill.calculateBill();
          expect(benefits).not.toContainEqual(expected);
        });
      });
  
      describe("주말의 경우 할인 금액을 계산한다.", () => {
        test("주말인 경우 할인 금액을 반환한다.", () => {
          const expected = {
            name: 'weekEnd',
            type: 'discount',
            discount: 4046,
          };
          const { benefits } = weekEndBill.calculateBill();
          expect(benefits).toContainEqual(expected);
        });

        test("주말이 아닌 경우 빈 객체를 반환한다.", () => {
          const expected = {
            name: 'weekEnd',
            type: 'discount',
            discount: 4046,
          };
          const { benefits } = weekDayBill.calculateBill();
          expect(benefits).not.toContainEqual(expected);
        });
      });
    });


    describe("(요구사항 2-3-3) - 특별 할인 금액을 계산한다.", () => {
      test("특별 할인 이벤트에 해당하는 날짜인 경우 할인 금액을 계산한다.", () => {
        const bill = new Bill(DATE.special, richOrders);
        const expected = {
          name: 'special',
          type: 'discount',
          discount: 1000,
        };
        const { benefits } = bill.calculateBill();
        expect(benefits).toContainEqual(expected);
      });

      test("특별 할인 이벤트에 해당하지 않는 날짜인 경우 빈 객체를 반환한다.", () => {
        const bill = new Bill(DATE.notSpecial, richOrders);
        const expected = {
          name: 'special',
          type: 'discount',
          discount: 1000,
        };
        const { benefits } = bill.calculateBill();
        expect(benefits).not.toContainEqual(expected);
      });
    });

    describe("(요구사항 2-3-4) - 증정 이벤트 금액을 계산한다.", () => {
      test("이벤트 대상인 경우 증정 이벤트 금액을 계산한다.", () => {
        const expected = {
          name: 'giveAway',
          type: 'event',
          discount: 25000,
        };
        const { benefits } = richBill.calculateBill();
        expect(benefits).toContainEqual(expected);
      });

      test("이벤트 대상이 아닌 경우 빈 객체를 반환한다.", () => {
        const expected = null;
        const { benefits } = poorBill.calculateBill();
        expect(benefits).toEqual(expected);
      });
    });
  });

  describe("(요구사항 2-4) - 총혜택 금액을 계산한다.", () => {
    test("할인 금액과 증정 이벤트 금액의 합계를 계산한다.", () => {
      const expected = 31246;
      const { benefitAmount } = richBill.calculateBill();
      expect(benefitAmount).toBe(expected);
    });
  });

  describe("(요구사항 2-5) - 이벤트 배지를 부여한다.", () => {
    describe("이벤트 대상이 아닌 경우 뱃지를 부여하지 않는다.", () => {
      test("총주문 금액이 10,000원 미만인 경우 뱃지를 부여하지 않는다.", () => {
        const expected = '';
        const { badge } = poorBill.calculateBill();
        expect(badge).toEqual(expected);
      });

      test("총혜택 금액이 5,000원 미만인 경우 뱃지를 부여하지 않는다.", () => {
        const visitDate = 26;
        const orders = [
          { menu: "초코케이크", amount: 1 },
          { menu: "아이스크림", amount: 1 },
        ];
        const bill = new Bill(visitDate, orders);
        const expected = '';
        const { badge } = bill.calculateBill();
        expect(badge).toEqual(expected);
      });
    });
  });

  describe("(요구사항 2-6) - 할인 후 예상 결제 금액을 계산한다.", () => {
    test("할인 후 예상 결제 금액을 계산한다.", () => {
      const expected = 135754;
      const { finalPrice } = richBill.calculateBill();
      expect(finalPrice).toBe(expected);
    });
  });
});