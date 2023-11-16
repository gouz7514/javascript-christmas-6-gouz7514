import { BADGE, BADGE_THRESHOLD } from "../constants/badge.js";
import { ERROR } from "../constants/error.js";

class Badge {
  #info = {
    name: ''
  };

  constructor(benefitAmount) {
    this.#setBadgeInfo(benefitAmount);
  }

  #setBadgeInfo(benefitAmount) {
    if (benefitAmount < BADGE_THRESHOLD.star) throw new Error(ERROR.notValidBadge);
    this.#info.name = this.#decideBadgeName(benefitAmount);
  }

  #decideBadgeName(benefitAmount) {
    switch (true) {
      case benefitAmount >= BADGE_THRESHOLD.santa: {
        return BADGE.santa.name;
      }
      case benefitAmount >= BADGE_THRESHOLD.tree: {
        return BADGE.tree.name;
      }
      default: {
        return BADGE.star.name;
      }
    }
  }

  getInfo() {
    return this.#info;
  }
}

export default Badge;