import { expect } from 'chai';
import { Item, GildedRose } from '../app/gilded-rose';

describe('Gilded Rose', function () {
    describe("constructor function", function () {
        it("sets the items property correctly if an argument list is provided", function() {
            const testItems = [ new Item("test", 1, 1) ];
            const gildedRose = new GildedRose(testItems);

            expect(gildedRose.items).to.equal(testItems);
        });

        it("sets the items property to an empty list if an argument isn't provided", function() {
            const gildedRose = new GildedRose();

            expect(gildedRose.items).to.be.an( "array" ).that.is.empty
        });
    });

    describe("updateQuality function", function () {
        let itemName: string;
        let itemSellIn: number;
        let itemQuality: number;

        const getItems = function() {
            const gildedRose = new GildedRose([ new Item(itemName, itemSellIn, itemQuality) ]);
            return gildedRose.updateQuality();
        };

        describe("Updating the sellIn value", function () {
            beforeEach(function() {
                itemSellIn = 1;
                itemQuality = 50;
            });

            describe("Standard item", function () {
                it("should decrease the sellIn value by 1", function() {
                    itemName = "Test item";
                    const items = getItems();

                    expect(items[0].sellIn).to.equal(0);
                });
            });

            describe("Legendary item", function () {
                it("should not change the sellIn value", function() {
                    itemName = "Sulfuras, Hand of Ragnaros";
                    const items = getItems();

                    expect(items[0].sellIn).to.equal(1);
                });
            });
        });

        describe("Updating the quality value", function () {
            describe("Standard item", function () {
                beforeEach(function() {
                    itemName = "Test item";
                });

                describe("when sellIn value after update is 0 or more", function () {
                    beforeEach(function() {
                        itemSellIn = 1;
                    });

                    it("should decrease the quality by 1 if it is 1 or more", function() {
                        itemQuality = 10;
                        const items = getItems();

                        expect(items[0].quality).to.equal(9);
                    });
                    
                    it("should not decrease the quality below 0", function() {
                        itemQuality = 0;
                        const items = getItems();

                        expect(items[0].quality).to.equal(0);
                    });
                });

                describe("when sellIn value after update is less than 0", function () {
                    beforeEach(function() {
                        itemSellIn = 0; // this will be updated within the function to -1
                    });

                    it("should decrease the quality by 2 if it is 2 or more", function() {
                        itemQuality = 10;
                        const items = getItems();

                        expect(items[0].quality).to.equal(8);
                    });

                    it("should decrease the quality by 1 if it is 1", function() {
                        itemQuality = 1;
                        const items = getItems();

                        expect(items[0].quality).to.equal(0);
                    });

                    it("should not decrease the quality below 0", function() {
                        itemQuality = 0;
                        const items = getItems();

                        expect(items[0].quality).to.equal(0);
                    });
                });
            });

            describe("Special case items", function () {
                describe("Legendary item", function () {
                    beforeEach(function() {
                        itemName = "Sulfuras, Hand of Ragnaros";
                        itemQuality = 50;
                    });

                    it("should not change the quality value when sellIn value is 0 or more", function() {
                        itemSellIn = 10;

                        const items = getItems();

                        expect(items[0].quality).to.equal(50);
                    });

                    it("should not change the quality value when sellIn value is negative", function() {
                        itemSellIn = -1; // this will be updated within the function to -1

                        const items = getItems();

                        expect(items[0].quality).to.equal(50);
                    });
                });

                describe("Aged Brie item", function () {
                    beforeEach(function() {
                        itemName = "Aged Brie";
                    });

                    describe("when sellIn value after update is 0 or more", function () {
                        beforeEach(function() {
                            itemSellIn = 1;
                        });

                        it("should increase the quality by 1 if it is 49 or less", function() {
                            itemQuality = 0;
                            const items = getItems();

                            expect(items[0].quality).to.equal(1);
                        });

                        it("should not increase the quality above 50", function() {
                            itemQuality = 50;
                            const items = getItems();

                            expect(items[0].quality).to.equal(50);
                        });
                    });

                    describe("when sellIn value after update is less than 0", function () {
                        beforeEach(function() {
                            itemSellIn = 0; // this will be updated within the function to -1
                        });

                        it("should increase the quality by 2 if it is 48 or less", function() {
                            itemQuality = 0;
                            const items = getItems();

                            expect(items[0].quality).to.equal(2);
                        });

                        it("should increase the quality by 1 if it is 49", function() {
                            itemQuality = 49;
                            const items = getItems();

                            expect(items[0].quality).to.equal(50);
                        });

                        it("should not increase the quality above 50", function() {
                            itemQuality = 50;
                            const items = getItems();

                            expect(items[0].quality).to.equal(50);
                        });
                    });
                });

                describe("Backstage passes item", function () {
                    beforeEach(function() {
                        itemName = "Backstage passes to a TAFKAL80ETC concert";
                    });

                    describe("when sellIn value after update is less than 0", function () {
                        beforeEach(function() {
                            itemSellIn = 0; // this will be updated within the function to -1
                        });

                        it("should set the quality to 0", function() {
                            itemQuality = 50;
                            const items = getItems();

                            expect(items[0].quality).to.equal(0);
                        });
                    });

                    describe("when sellIn value before update is 5 or less but not less than 0", function () {
                        beforeEach(function() {
                            itemSellIn = 5;
                        });

                        it("should increase the quality by 3 if it is 47 or less", function() {
                            itemQuality = 0;
                            const items = getItems();

                            expect(items[0].quality).to.equal(3);
                        });

                        it("should increase the quality by 2 if it is 48", function() {
                            itemQuality = 48;
                            const items = getItems();

                            expect(items[0].quality).to.equal(50);
                        });

                        it("should increase the quality by 1 if it is 49", function() {
                            itemQuality = 49;
                            const items = getItems();

                            expect(items[0].quality).to.equal(50);
                        });

                        it("should not increase the quality above 50", function() {
                            itemQuality = 50;
                            const items = getItems();

                            expect(items[0].quality).to.equal(50);
                        });
                    });

                    describe("when sellIn value before update is 10 or less but not less than 5", function () {
                        beforeEach(function() {
                            itemSellIn = 10;
                        });

                        it("should increase the quality by 2 if it is 48 or less", function() {
                            itemQuality = 0;
                            const items = getItems();

                            expect(items[0].quality).to.equal(2);
                        });

                        it("should increase the quality by 1 if it is 49", function() {
                            itemQuality = 49;
                            const items = getItems();

                            expect(items[0].quality).to.equal(50);
                        });

                        it("should not increase the quality above 50", function() {
                            itemQuality = 50;
                            const items = getItems();

                            expect(items[0].quality).to.equal(50);
                        });
                    });

                    describe("when sellIn value after update is more than 10", function () {
                        beforeEach(function() {
                            itemSellIn = 50;
                        });

                        it("should increase the quality by 1 if it is 49 or less", function() {
                            itemQuality = 0;
                            const items = getItems();

                            expect(items[0].quality).to.equal(1);
                        });

                        it("should not increase the quality above 50", function() {
                            itemQuality = 50;
                            const items = getItems();

                            expect(items[0].quality).to.equal(50);
                        });
                    });
                });
            });
        });
    });
});
