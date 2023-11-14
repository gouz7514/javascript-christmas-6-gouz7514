import Menu from "../../src/class/Menu.js";

describe("Menu 클래스 테스트", () => {
  describe("isMenuExist 메소드는 메뉴가 존재하는지 확인한다.", () => {
    test("메뉴가 존재할 경우 가격과 타입을 반환한다", () => {
      const menuName = "티본스테이크";
      const expected = {
        price: 55000,
        type: "main",
      };
      const result = Menu.isMenuExist(menuName);
      expect(result).toEqual(expected);
    });

    test("메뉴가 존재하지 않을 경우 undefined를 반환한다", () => {
      const menuName = "없는메뉴";
      expect(() => Menu.isMenuExist(menuName)).toThrow("[ERROR]");
    });
  });

  describe("getMenuType 메소드는 메뉴의 타입을 반환한다.", () => {
    test("주어진 메뉴의 타입을 알맞게 반환한다", () => {
      const menuNames = ["티본스테이크", "타파스", "바비큐립", "초코케이크", "제로콜라", "레드와인", "샴페인"];
      const expected = ["main", "appetizer", "main", "dessert", "drink", "drink", "drink"];
      menuNames.forEach((menuName, index) => {
        const result = Menu.getMenuType(menuName);
        expect(result).toBe(expected[index]);
      });
    });

    test("메뉴가 존재하지 않을 경우 예외를 발생시킨다.", () => {
      const menuName = "없는메뉴";
      expect(() => Menu.getMenuType(menuName)).toThrow("[ERROR]");
    });
  });

  describe("getMenuPrice 메소드는 메뉴의 가격을 반환한다.", () => {
    test("주어진 메뉴의 가격을 알맞게 반환한다", () => {
      const menuNames = ["티본스테이크", "타파스", "바비큐립", "초코케이크", "제로콜라", "레드와인", "샴페인"];
      const expected = [55000, 5500, 54000, 15000, 3000, 60000, 25000];
      menuNames.forEach((menuName, index) => {
        const result = Menu.getMenuPrice(menuName);
        expect(result).toBe(expected[index]);
      });
    });

    test("메뉴가 존재하지 않을 경우 예외를 발생시킨다.", () => {
      const menuName = "없는메뉴";
      expect(() => Menu.getMenuPrice(menuName)).toThrow("[ERROR]");
    });
  });

  describe("isCntOverMin 메소드는 최소 주문 수량 조건을 만족하는지 확인한다.", () => {
    test("최소 주문 수량을 만족할 경우 true를 반환한다", () => {
      const cnt = 1;
      const result = Menu.isCntOverMin(cnt);
      expect(result).toBeTruthy();
    });

    test("최소 주문 수량을 만족하지 못할 경우 false를 반환한다", () => {
      const cnt = 0;
      const result = Menu.isCntOverMin(cnt);
      expect(result).toBeFalsy();
    });
  });

  describe("isCntUnderMax 메소드는 최대 주문 수량 조건을 만족하는지 확인한다.", () => {
    test("최대 주문 수량을 초과하지 않을 경우 true를 반환한다", () => {
      const cnt = 1;
      const result = Menu.isCntUnderMax(cnt);
      expect(result).toBeTruthy();
    });

    test("최대 주문 수량을 초과할 경우 false를 반환한다", () => {
      const cnt = 21;
      const result = Menu.isCntUnderMax(cnt);
      expect(result).toBeFalsy();
    });
  });

  describe("isOnlyDrink 메소드는 주문한 메뉴가 모두 음료인지 확인한다", () => {
    test("주문한 메뉴가 모두 음료일 경우 false를 반환한다", () => {
      const orders = ["제로콜라-5", "레드와인-4", "샴페인-3"];
      const result = Menu.isOnlyDrink(orders);
      expect(result).toBeFalsy();
    });

    test("주문한 메뉴가 음료 외에 다른 종류를 포함할 경우 true를 반환한다", () => {
      const orders = ["제로콜라-5", "레드와인-4", "샴페인-3", "티본스테이크-1"];
      const result = Menu.isOnlyDrink(orders);
      expect(result).toBeTruthy();
    });

    test("존재하지 않는 메뉴를 주문할 경우 예외를 발생시킨다", () => {
      const orders = ["제로콜라-5", "레드와인-4", "샴페인-3", "없는메뉴-1"];
      expect(() => Menu.isOnlyDrink(orders)).toThrow("[ERROR]");
    });
  });

  describe("getGiveAwayMenu 메소드는 증정 메뉴의 정보를 반환한다", () => {
    test("샴페인 정보를 반환한다", () => {
      expect(Menu.getGiveAwayMenu()).toEqual({
        name: "샴페인",
        amount: 1,
        price: 25000,
      });
    });
  });
});