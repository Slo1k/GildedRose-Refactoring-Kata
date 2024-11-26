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

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    for (const item of this.items) {
      if (item.name === "Sulfuras, Hand of Ragnaros") {
        continue;
      }

      if (
        item.name !== "Aged Brie" &&
        item.name !== "Backstage passes to a TAFKAL80ETC concert"
      ) {
        if (item.quality > 0) {
          item.quality -= 1;
        }
      } else {
        if (item.name === "Aged Brie") {
          item.quality = Math.min(50, item.quality + 1);
        } else if (item.name === "Backstage passes to a TAFKAL80ETC concert") {
          if (item.sellIn < 6) {
            item.quality = Math.min(50, item.quality + 3);
          } else if (item.sellIn < 11) {
            item.quality = Math.min(50, item.quality + 2);
          } else {
            item.quality = Math.min(50, item.quality + 1);
          }
        }
      }

      item.sellIn -= 1;

      if (item.sellIn < 0) {
        if (item.name === "Aged Brie") {
          item.quality = Math.min(50, item.quality + 1);
        } else if (item.name === "Backstage passes to a TAFKAL80ETC concert") {
          item.quality = 0;
        } else if (item.quality > 0) {
          item.quality -= 1;
        }
      }
    }
    return this.items;
  }
}
