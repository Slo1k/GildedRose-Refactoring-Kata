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

const ItemTypes = {
  AGED_BRIE: "Aged Brie",
  BACKSTAGE_PASSES: "Backstage passes to a TAFKAL80ETC concert",
  SULFURAS: "Sulfuras, Hand of Ragnaros",
};

const MAX_QUALITY = 50;
const MIN_QUALITY = 0;
const MIN_SELLIN = 0;

const updateAgedBrie = (item: Item) => {
  item.increaseQuality(1);
  item.sellIn -= 1;
  if (item.sellIn < MIN_SELLIN) item.increaseQuality(1);
};

const updateBackstagePasses = (item: Item) => {
  if (item.sellIn < 6) {
    item.increaseQuality(3);
  } else if (item.sellIn < 11) {
    item.increaseQuality(2);
  } else {
    item.increaseQuality(1);
  }
  item.sellIn -= 1;
  if (item.sellIn < MIN_SELLIN) item.updateQuality(0);
};

const updateSulfuras = (item: Item) => {};

const updateDefault = (item: Item) => {
  item.decreaseQuality(1);
  item.sellIn -= 1;
  if (item.sellIn < MIN_SELLIN) item.decreaseQuality(1);
};

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    for (const item of this.items) {
      switch (item.name) {
        case ItemTypes.AGED_BRIE:
          updateAgedBrie(item);
          continue;
        case ItemTypes.BACKSTAGE_PASSES:
          updateBackstagePasses(item);
          continue;
        case ItemTypes.SULFURAS:
          updateSulfuras(item);
          continue;
        default:
          updateDefault(item);
          continue;
      }
    }
    return this.items;
  }
}
