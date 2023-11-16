import { Console } from "@woowacourse/mission-utils";
import { INPUT } from "./constants/message.js";

// 1. 고객의 입력을 받는다.
const InputView = {
  async getVisitDate() {
    const date = await Console.readLineAsync(INPUT.getVisitDate);
    return date;
  },
  async getOrders() {
    const orders = await Console.readLineAsync(INPUT.getOrders);
    return orders;
  }
};

export default InputView;