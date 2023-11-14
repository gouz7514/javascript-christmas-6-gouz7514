import { DELIMITER } from "../constants/constant.js";
import { MENU_TYPE, MENU, MENU_COUNT, MENU_GIVEAWAY } from "../constants/menu.js";
import { ERROR } from "../constants/error.js";

class Menu {
  #menu = {};

  constructor() {
    this.#menu.type = MENU_TYPE;
    this.#menu.content = MENU;
    this.#menu.count = MENU_COUNT;
    this.#menu.giveAway = MENU_GIVEAWAY;

    if (Menu.instance) {
      throw new Error(ERROR.menuInstanceExist);
    }
    Menu.instance = this;
  }

  isMenuExist(menuName) {
    try {
      if (this.#menu.content[menuName] === undefined) {
        throw new Error(ERROR.noMenuExist);
      }
      return this.#menu.content[menuName];
    } catch (error) {
      throw new Error(ERROR.noMenuExist);
    }
  }

  getMenuType(menuName) {
    this.isMenuExist(menuName);
    return this.#menu.content[menuName].type;
  }

  getMenuPrice(menuName) {
    this.isMenuExist(menuName);
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
      this.isMenuExist(menuName);
      const menuType = this.getMenuType(menuName);
      menuTypeSet.add(menuType);
    });
    return menuTypeSet.size !== 1 || !menuTypeSet.has(MENU_TYPE.drink);
  }

  getGiveAwayMenu() {
    const { name, amount } = this.#menu.giveAway;
    return {
      name,
      amount,
      price: this.#menu.content[name].price,
    };
  }

  getInstace() {
    return this;
  }
}

const singletonMenu = Object.freeze(new Menu());
export default singletonMenu;