const BADGE = {
  santa: {
    name: "산타",
    threshold: 20000,
  },
  tree: {
    name: "트리",
    threshold: 10000,
  },
  star: {
    name: "별",
    threshold: 5000,
  },
};

class Badge {
  #name;

  constructor(benefitAmount = 0) {
    this.#name = this.decideBadgeName(benefitAmount);
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

  get name() {
    return this.#name;
  }
}

export default Badge;