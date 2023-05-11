import { expect } from 'chai';
import { Item, GildedRose } from '../app/gilded-rose';

describe('Gilded Rose', function () {
    let itemName: string;
    let itemSellIn: number;
    let itemQuality: number;

    describe("Constructor function", function () {
        it("sets the items property correctly if an argument list is provided", function() {
            const testItems = [ new Item(itemName, 1, 1) ];
            const gildedRose = new GildedRose(testItems);

            expect(gildedRose.items).to.equal(testItems);
        });

        it("sets the items property to an empty list if an argument isn't provided", function() {
            const gildedRose = new GildedRose();

            expect(gildedRose.items).to.be.an( "array" ).that.is.empty
        });
    });

    describe("Helper functions", function () {
        beforeEach(function() {
            itemName = "Test item";
            itemQuality = 10;
            itemSellIn = 10
        });

        describe("increaseQualityWithLimit", function () {
            describe("amount argument", function () {
                it("increases the quality by the amount argument it is provided", function() {
                    const testItem = new Item(itemName, itemSellIn, itemQuality);
                    const gildedRose = new GildedRose([testItem]);
                    
                    gildedRose.increaseQualityWithLimit(testItem, 5)

                    expect(gildedRose.items[0].quality).to.equal(itemQuality + 5);
                });

                it("increases the quality by 1 if an amount argument isn't provided", function() {
                    const testItem = new Item(itemName, itemSellIn, itemQuality);
                    const gildedRose = new GildedRose([testItem]);
                    
                    gildedRose.increaseQualityWithLimit(testItem)

                    expect(gildedRose.items[0].quality).to.equal(itemQuality + 1);
                });
            });
            
            it("increases the quality by the amount if it won't not exceed 50", function() {
                const testItem = new Item(itemName, itemSellIn, itemQuality);
                const gildedRose = new GildedRose([testItem]);
                
                gildedRose.increaseQualityWithLimit(testItem, 2)

                expect(gildedRose.items[0].quality).to.equal(itemQuality + 2);
            });

            it("partially increases the amount if needed without exceeding 50", function() {
                itemQuality = 49;
                const testItem = new Item(itemName, itemSellIn, itemQuality);
                const gildedRose = new GildedRose([testItem]);
                
                gildedRose.increaseQualityWithLimit(testItem, 2)

                expect(gildedRose.items[0].quality).to.equal(50);
            });

            it("does not increase the quality if it would exceed 50", function() {
                itemQuality = 50;
                const testItem = new Item(itemName, itemSellIn, itemQuality);
                const gildedRose = new GildedRose([testItem]);
                
                gildedRose.increaseQualityWithLimit(testItem, 1)

                expect(gildedRose.items[0].quality).to.equal(50);
            });
        });

        describe("decreaseQualityWithLimit", function () {
            describe("Amount argument", function () {
                it("decreases the quality by the amount argument it is provided", function() {
                    const testItem = new Item(itemName, itemSellIn, itemQuality);
                    const gildedRose = new GildedRose([testItem]);
                    
                    gildedRose.decreaseQualityWithLimit(testItem, 5)

                    expect(gildedRose.items[0].quality).to.equal(itemQuality - 5);
                });

                it("decreases the quality by 1 if an amount argument isn't provided", function() {
                    const testItem = new Item(itemName, itemSellIn, itemQuality);
                    const gildedRose = new GildedRose([testItem]);
                    
                    gildedRose.decreaseQualityWithLimit(testItem)

                    expect(gildedRose.items[0].quality).to.equal(itemQuality - 1);
                });
            });

            it("decreases the quality by the amount argument if it won't go below 0", function() {
                const testItem = new Item(itemName, itemSellIn, itemQuality);
                const gildedRose = new GildedRose([testItem]);
                
                gildedRose.decreaseQualityWithLimit(testItem, 2)

                expect(gildedRose.items[0].quality).to.equal(itemQuality - 2);
            });

            it("partially decreases the amount if needed without going below 0", function() {
                itemQuality = 1;
                const testItem = new Item(itemName, itemSellIn, itemQuality);
                const gildedRose = new GildedRose([testItem]);
                
                gildedRose.decreaseQualityWithLimit(testItem, 2)

                expect(gildedRose.items[0].quality).to.equal(0);
            });

            it("does not decrease the quality if it would go below 0", function() {
                itemQuality = 0;
                const testItem = new Item(itemName, itemSellIn, itemQuality);
                const gildedRose = new GildedRose([testItem]);
                
                gildedRose.decreaseQualityWithLimit(testItem, 1)

                expect(gildedRose.items[0].quality).to.equal(0);
            });
        });

        describe("getSellInDependantQualityChangeAmount", function () {
            it("returns 2 if the item sellIn is less than 0", function() {
                itemSellIn = -1;
                const testItem = new Item(itemName, itemSellIn, itemQuality);
                const gildedRose = new GildedRose([testItem]);
                
                const changeAmount = gildedRose.getSellInDependantQualityChangeAmount(testItem)

                expect(changeAmount).to.equal(2);
            });

            it("returns 1 if the item sellIn is 0", function() {
                itemSellIn = 0;
                const testItem = new Item(itemName, itemSellIn, itemQuality);
                const gildedRose = new GildedRose([testItem]);
                
                const changeAmount = gildedRose.getSellInDependantQualityChangeAmount(testItem)

                expect(changeAmount).to.equal(1);
            });

            it("returns 1 if the item sellIn is more than 0", function() {
                const testItem = new Item(itemName, itemSellIn, itemQuality);
                const gildedRose = new GildedRose([testItem]);
                
                const changeAmount = gildedRose.getSellInDependantQualityChangeAmount(testItem)

                expect(changeAmount).to.equal(1);
            });
        });
    });
    
    describe("updateQuality function", function () {
        const getItems = function() {
            const gildedRose = new GildedRose([ new Item(itemName, itemSellIn, itemQuality) ]);
            return gildedRose.updateQuality();
        };

        describe("Updating the sellIn value", function () {
            beforeEach(function() {
                itemSellIn = 10;
                itemQuality = 10;
            });

            describe("Standard item", function () {
                it("should decrease the sellIn value by 1", function() {
                    itemName = "Test item";
                    const items = getItems();

                    expect(items[0].sellIn).to.equal(itemSellIn - 1);
                });
            });

            describe("Legendary item", function () {
                it("should not change the sellIn value", function() {
                    itemName = "Sulfuras, Hand of Ragnaros";
                    const items = getItems();

                    expect(items[0].sellIn).to.equal(itemSellIn);
                });
            });
        });

        describe("Updating the quality value", function () {
            beforeEach(function() {
                itemQuality = 10;
            });

            describe("Standard item", function () {
                beforeEach(function() {
                    itemName = "Test item";
                });

                describe("when sellIn value after update is 0 or more", function () {
                    beforeEach(function() {
                        itemSellIn = 1;
                    });

                    it("should decrease the quality by 1", function() {
                        const items = getItems();

                        expect(items[0].quality).to.equal(itemQuality - 1);
                    });
                });

                describe("when sellIn value after update is less than 0", function () {
                    beforeEach(function() {
                        itemSellIn = 0; // this will be updated within the function to -1
                    });

                    it("should decrease the quality by 2", function() {
                        const items = getItems();

                        expect(items[0].quality).to.equal(itemQuality - 2);
                    });
                });
            });

            describe("Special case items", function () {
                describe("Legendary item", function () {
                    beforeEach(function() {
                        itemName = "Sulfuras, Hand of Ragnaros";
                        itemSellIn = 10;
                    });

                    it("should not change the quality", function() {
                        const items = getItems();

                        expect(items[0].quality).to.equal(itemQuality);
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

                        it("should increase the quality by 1", function() {
                            const items = getItems();

                            expect(items[0].quality).to.equal(itemQuality + 1);
                        });
                    });

                    describe("when sellIn value after update is less than 0", function () {
                        beforeEach(function() {
                            itemSellIn = 0; // this will be updated within the function to -1
                        });

                        it("should increase the quality by 2", function() {
                            const items = getItems();

                            expect(items[0].quality).to.equal(itemQuality + 2);
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
                            const items = getItems();

                            expect(items[0].quality).to.equal(0);
                        });
                    });

                    describe("when sellIn value before update is 5 or less but not less than 0", function () {
                        beforeEach(function() {
                            itemSellIn = 5;
                        });

                        it("should increase the quality by 3", function() {
                            const items = getItems();

                            expect(items[0].quality).to.equal(itemQuality + 3);
                        });
                    });

                    describe("when sellIn value before update is 10 or less but not less than 5", function () {
                        beforeEach(function() {
                            itemSellIn = 10;
                        });

                        it("should increase the quality by 2", function() {
                            const items = getItems();

                            expect(items[0].quality).to.equal(itemQuality + 2);
                        });
                    });

                    describe("when sellIn value after update is more than 10", function () {
                        beforeEach(function() {
                            itemSellIn = 50;
                        });

                        it("should increase the quality by 1", function() {
                            const items = getItems();

                            expect(items[0].quality).to.equal(itemQuality + 1);
                        });
                    });
                });
            });
        });
    });
});
