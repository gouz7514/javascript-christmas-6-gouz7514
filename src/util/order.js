import { DELIMITER } from "../constants/constant.js";

export const orderToArray = (orders) => {
  const arr = [];
  orders.split(DELIMITER.order).forEach((menu) => {
    const [name, count] = menu.split(DELIMITER.menu);
    arr.push({ name, count });
  });
  return arr;
};