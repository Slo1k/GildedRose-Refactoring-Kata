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

    // Testing the edge case where quality can't exceed 50
    gildedRose.updateQuality();
    expect(items[0].quality).toBe(12);
    for (let i = 0; i < 40; i++) {
      gildedRose.updateQuality();
    }
    expect(items[0].quality).toBe(50);
  });
});
