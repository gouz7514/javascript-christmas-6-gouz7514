import { DELIMITER } from "../constants/constant.js";

export const orderToArray = (orders) => {
  const arr = [];
  orders.split(DELIMITER.order).forEach((order) => {
    const [menu, amount] = order.split(DELIMITER.menu);
    arr.push({ menu, amount: Number(amount) });
  });
  return arr;
};