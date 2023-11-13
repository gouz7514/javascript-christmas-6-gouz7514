import { OUTPUT, UNIT, EMPTY_CASE } from "../constants/message.js";
import { BENEFIT } from "../constants/constant.js";
import menu from "../class/Menu.js";

const outputHelper = {
  printBill(date) {
    return OUTPUT.printBill(date);
  },
  printOrders(orders) {
    return orders.reduce((acc, cur) => {
      const { menu: menuName, amount: menuAmount } = cur;
      return `${acc}\n${menuName} ${menuAmount}${UNIT.amount}`;
    }, OUTPUT.printOrders);
  },
  printTotalPrice(price) {
    return `${OUTPUT.printTotalPrice}\n${price.toLocaleString()}${UNIT.price}`;
  },
  printGiveAway(giveAway) {
    let result = OUTPUT.printGiveAway;
    if (!giveAway) {
      result += `\n${EMPTY_CASE.giveAway}`;
      return result;
    }
    const { name: giveAwayMenuName, amount: giveAwayMenuAmount } = menu.getGiveAwaymenuInfo();
    result += `\n${giveAwayMenuName} ${giveAwayMenuAmount}${UNIT.amount}`;
    return result;
  },
  printBenefits(benefits) {
    let result = OUTPUT.printBenefits;
    if (!benefits || !benefits.length) {
      result += `\n${EMPTY_CASE.benefits}`;
      return result;
    }
    benefits.forEach((benefit) => {
      const { name, discount } = benefit;
      result += `\n${BENEFIT[name].name_ko}: -${discount.toLocaleString()}${UNIT.price}`;
    });
    return result;
  },
  printBenefitAmount(benefitAmount) {
    let result = OUTPUT.printBenefitAmount;
    if (!benefitAmount) {
      result += `\n${EMPTY_CASE.benefitAmount}`;
      return result;
    }
    result += `\n-${benefitAmount.toLocaleString()}${UNIT.price}`;
    return result;
  },
  printFinalPrice(finalPrice) {
    return `${OUTPUT.printFinalPrice}\n${finalPrice.toLocaleString()}${UNIT.price}`;
  },
  printBadge(badge) {
    let result = OUTPUT.printBadge;
    if (!badge) {
      result += `\n${EMPTY_CASE.badge}`;
      return result;
    }
    const { info: { name: badgeName } } = badge;
    result += `\n${badgeName}`;
    return result;
  }
};

export default outputHelper;