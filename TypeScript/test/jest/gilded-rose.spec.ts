import { Item, GildedRose } from "@/gilded-rose";

describe("Gilded Rose", () => {
  it("should foo", () => {
    const gildedRose = new GildedRose([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("foo");
  });
});

describe("Gilded Rose", () => {
  it("should increase the quality of Aged Brie by 1", () => {
    const gildedRose = new GildedRose([new Item("Aged Brie", 5, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(11);

    gildedRose.updateQuality();
    expect(items[0].quality).toBe(12);
    for (let day = 0; day < 40; day++) {
      gildedRose.updateQuality();
    }
    expect(items[0].quality).toBe(50);
  });
});

describe("Gilded Rose", () => {
  it("should not modify Sulfuras, Hand of Ragnaros over multiple days", () => {
    const sulfurasItem = new Item("Sulfuras, Hand of Ragnaros", 0, 80);
    const gildedRose = new GildedRose([sulfurasItem]);

    for (let day = 1; day <= 30; day++) {
      const items = gildedRose.updateQuality();

      expect(items[0].name).toBe("Sulfuras, Hand of Ragnaros");
      expect(items[0].sellIn).toBe(0);
      expect(items[0].quality).toBe(80);
    }
  });
});

describe("Gilded Rose", () => {
  it("should decrease the quality of Conjured Mana Cake by 2", () => {
    const gildedRose = new GildedRose([new Item("Conjured Mana Cake", 5, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(8);

    gildedRose.updateQuality();
    expect(items[0].quality).toBe(6);
    for (let day = 0; day < 40; day++) {
      gildedRose.updateQuality();
    }
    expect(items[0].quality).toBe(0);
  });
});

describe("Gilded Rose", () => {
  it("should increase the quality of Backstage passes by 1 when sellIn is more than 10", () => {
    const gildedRose = new GildedRose([new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(21);
  });

  it("should increase the quality of Backstage passes by 2 when sellIn is 10 or less", () => {
    const gildedRose = new GildedRose([new Item("Backstage passes to a TAFKAL80ETC concert", 10, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(22);
  });

  it("should increase the quality of Backstage passes by 3 when sellIn is 5 or less", () => {
    const gildedRose = new GildedRose([new Item("Backstage passes to a TAFKAL80ETC concert", 5, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(23);
  });

  it("should drop the quality of Backstage passes to 0 after the concert", () => {
    const gildedRose = new GildedRose([new Item("Backstage passes to a TAFKAL80ETC concert", 0, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
  });
});