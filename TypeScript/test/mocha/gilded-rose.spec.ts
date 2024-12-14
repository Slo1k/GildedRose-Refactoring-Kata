import { expect } from 'chai';
import { Item, GildedRose } from '@/gilded-rose';

describe('Gilded Rose', () => {
  it('should foo', () => {
    const gildedRose = new GildedRose([new Item('foo', 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).to.equal('foo');
  });
});

describe("Gilded Rose", () => {
  it("should increase the quality of Aged Brie by 1", () => {
    const gildedRose = new GildedRose([new Item("Aged Brie", 5, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(11);

    gildedRose.updateQuality();
    expect(items[0].quality).to.equal(12);
    for (let day = 0; day < 40; day++) {
      gildedRose.updateQuality();
    }
    expect(items[0].quality).to.equal(50);
  });
});

describe("Gilded Rose", () => {
  it("should not modify Sulfuras, Hand of Ragnaros over multiple days", () => {
    const sulfurasItem = new Item("Sulfuras, Hand of Ragnaros", 0, 80);
    const gildedRose = new GildedRose([sulfurasItem]);

    for (let day = 1; day <= 30; day++) {
      const items = gildedRose.updateQuality();

      expect(items[0].name).to.equal("Sulfuras, Hand of Ragnaros");
      expect(items[0].sellIn).to.equal(0);
      expect(items[0].quality).to.equal(80);
    }
  });
});

describe("Gilded Rose", () => {
  it("should decrease the quality of Conjured Mana Cake by 2", () => {
    const gildedRose = new GildedRose([new Item("Conjured Mana Cake", 5, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(8);

    gildedRose.updateQuality();
    expect(items[0].quality).to.equal(6);
    for (let day = 0; day < 40; day++) {
      gildedRose.updateQuality();
    }
    expect(items[0].quality).to.equal(0);
  });
});