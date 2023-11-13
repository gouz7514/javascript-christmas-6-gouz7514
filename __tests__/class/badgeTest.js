import Badge from "../../src/class/Badge.js";

describe("Badge 클래스 테스트", () => {
  describe("setBadgeInfo 메소드는 혜택 금액에 따라 뱃지 정보를 설정한다.", () => {
    test("혜택 금액이 0원일 경우 뱃지 정보를 설정하지 않는다.", () => {
      const benefitAmount = 0;
      const badge = new Badge(benefitAmount);
      const expected = {
        name: '',
      };
      const result = badge.info;
      expect(result).toEqual(expected);
    });

    test("혜택 금액이 5,000원 이상일 경우 뱃지 정보를 설정한다.", () => {
      const benefitAmount = 5000;
      const badge = new Badge(benefitAmount);
      const expected = {
        name: '별',
      };
      const result = badge.info;
      expect(result).toEqual(expected);
    });

    test("혜택 금액이 10,000원 이상일 경우 뱃지 정보를 설정한다.", () => {
      const benefitAmount = 10000;
      const badge = new Badge(benefitAmount);
      const expected = {
        name: '트리',
      };
      const result = badge.info;
      expect(result).toEqual(expected);
    });

    test("혜택 금액이 20,000원 이상일 경우 뱃지 정보를 설정한다.", () => {
      const benefitAmount = 20000;
      const badge = new Badge(benefitAmount);
      const expected = {
        name: '산타',
      };
      const result = badge.info;
      expect(result).toEqual(expected);
    });
  });

  describe("decideBadgeName 메소드는 혜택 금액에 따라 뱃지 이름을 반환한다.", () => {
    test("혜택 금액이 5,000원 이상일 경우 뱃지 이름(별)을 반환한다.", () => {
      const benefitAmount = 5000;
      const badge = new Badge(benefitAmount);
      const expected = '별';
      const result = badge.info.name;
      expect(result).toEqual(expected);
    });

    test("혜택 금액이 10,000원 이상일 경우 뱃지 이름(트리)을 반환한다.", () => {
      const benefitAmount = 10000;
      const badge = new Badge(benefitAmount);
      const expected = '트리';
      const result = badge.info.name;
      expect(result).toEqual(expected);
    });

    test("혜택 금액이 20,000원 이상일 경우 뱃지 이름(산타)을 반환한다.", () => {
      const benefitAmount = 20000;
      const badge = new Badge(benefitAmount);
      const expected = '산타';
      const result = badge.info.name;
      expect(result).toEqual(expected);
    });
  });
});