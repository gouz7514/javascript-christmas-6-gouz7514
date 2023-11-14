import { BADGE } from "../constants/badge.js";

class Badge {
  #info = {
    name: ''
  };

  constructor(benefitAmount) {
    this.setBadgeInfo(benefitAmount);
  }

  setBadgeInfo(benefitAmount) {
    if (benefitAmount < BADGE.star.threshold) return;
    this.#info.name = this.decideBadgeName(benefitAmount);
  }

  decideBadgeName(benefitAmount) {
    if (benefitAmount >= BADGE.santa.threshold) {
      return BADGE.santa.name;
    }
    if (benefitAmount >= BADGE.tree.threshold) {
      return BADGE.tree.name;
    }
    if (benefitAmount >= BADGE.star.threshold) {
      return BADGE.star.name;
    }
    return "";
  }

  getInfo() {
    return this.#info;
  }
}

export default Badge;