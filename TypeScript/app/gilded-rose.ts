export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name: string, sellIn: number, quality: number) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }

  updateQuality(value: number) {
    if (value >= MIN_QUALITY && value <= MAX_QUALITY) this.quality = value;
  }
  increaseQuality(value: number) {
    if (value > 0) this.quality = Math.min(MAX_QUALITY, this.quality + value);
  }
  decreaseQuality(value: number) {
    if (value > 0) this.quality = Math.max(MIN_QUALITY, this.quality - value);
  }
}

interface ItemUpdateStrategy {
  update(item: Item): void;
}

class AgedBrieStrategy implements ItemUpdateStrategy {
  update(item: Item) {
    item.increaseQuality(1);
    item.sellIn -= 1;
    if (item.sellIn < MIN_SELLIN) item.increaseQuality(1);
  }
}

class BackstagePassesStrategy implements ItemUpdateStrategy {
  update(item: Item) {
    if (item.sellIn < 6) {
      item.increaseQuality(3);
    } else if (item.sellIn < 11) {
      item.increaseQuality(2);
    } else {
      item.increaseQuality(1);
    }
    item.sellIn -= 1;
    if (item.sellIn < MIN_SELLIN) item.updateQuality(0);
  }
}

class SulfurasStrategy implements ItemUpdateStrategy {
  update(item: Item) {}
}

class DefaultStrategy implements ItemUpdateStrategy {
  update(item: Item) {
    item.decreaseQuality(1);
    item.sellIn -= 1;
    if (item.sellIn < MIN_SELLIN) item.decreaseQuality(1);
  }
}

const ItemTypes = {
  AGED_BRIE: "Aged Brie",
  BACKSTAGE_PASSES: "Backstage passes to a TAFKAL80ETC concert",
  SULFURAS: "Sulfuras, Hand of Ragnaros",
};

const strategyRegistry: { [key: string]: ItemUpdateStrategy} = {
  [ItemTypes.AGED_BRIE]: new AgedBrieStrategy(),
  [ItemTypes.BACKSTAGE_PASSES]: new BackstagePassesStrategy(),
  [ItemTypes.SULFURAS]: new SulfurasStrategy(),
  default: new DefaultStrategy(),
};

const MAX_QUALITY = 50;
const MIN_QUALITY = 0;
const MIN_SELLIN = 0;

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    for (const item of this.items) {
      const strategy = strategyRegistry[item.name] || strategyRegistry.default;

      strategy.update(item);
    }
    return this.items;
  }
}
