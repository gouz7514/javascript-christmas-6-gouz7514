import { DELIMITER } from "../constants/constant.js";
import { MENU_TYPE, MENU, MENU_COUNT, MENU_GIVEAWAY } from "../constants/menu.js";

class Menu {
  #menu = {};

  constructor() {
    this.#menu.type = MENU_TYPE;
    this.#menu.content = MENU;
    this.#menu.count = MENU_COUNT;
    this.#menu.giveAway = MENU_GIVEAWAY;
  }

  isMenuExist(menuName) {
    return this.#menu.content[menuName];
  }

  getMenuType(menuName) {
    return this.#menu.content[menuName].type;
  }

  getMenuPrice(menuName) {
    return this.#menu.content[menuName].price;
  }

  isCntOverMin(cnt) {
    return cnt >= this.#menu.count.min;
  }

  isCntUnderMax(cnt) {
    return cnt <= this.#menu.count.max;
  }

  isOnlyDrink(orders) {
    const menuTypeSet = new Set();
    orders.forEach((order) => {
      const menuName = order.split(DELIMITER.menu)[0];
      const menuType = this.getMenuType(menuName);
      menuTypeSet.add(menuType);
    });
    return menuTypeSet.size !== 1 || !menuTypeSet.has(MENU_TYPE.drink);
  }

  getGiveAwaymenuInfo() {
    const { name, amount } = this.#menu.giveAway;
    return {
      name,
      amount,
      price: this.#menu.content[name].price,
    };
  }
}

const menu = new Menu();

export default menu;