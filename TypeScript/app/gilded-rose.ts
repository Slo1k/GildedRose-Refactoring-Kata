export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

const ItemTypes = {
  AGED_BRIE: "Aged Brie",
  BACKSTAGE_PASSES: "Backstage passes to a TAFKAL80ETC concert",
  SULFURAS: "Sulfuras, Hand of Ragnaros",
};

const updateAgedBrie = (item: Item) => {
  item.quality = Math.min(50, item.quality + 1);
  item.sellIn -= 1;
  if (item.sellIn < 0) item.quality = Math.min(50, item.quality + 1);
};

const updateBackstagePasses = (item: Item) => {
  if (item.sellIn < 6) {
    item.quality = Math.min(50, item.quality + 3);
  } else if (item.sellIn < 11) {
    item.quality = Math.min(50, item.quality + 2);
  } else {
    item.quality = Math.min(50, item.quality + 1);
  }
  item.sellIn -= 1;
  if (item.sellIn < 0) item.quality = 0;
};

const updateSulfuras = (item: Item) => {};

const updateDefault = (item: Item) => {
  if (item.quality > 0) {
    item.quality -= 1;
  }
  item.sellIn -= 1;
  if (item.sellIn < 0 && item.quality > 0) item.quality -= 1;
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
