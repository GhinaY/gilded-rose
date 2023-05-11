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
    legendaryItemTypes: Array<string> = ['Sulfuras, Hand of Ragnaros'];

    constructor(items = [] as Array<Item>) {
        this.items = items;
    }

    increaseQualityWithLimit(item, amount = 1) {
        item.quality = Math.min(50, item.quality + amount);
    };

    decreaseQualityWithLimit(item, amount = 1) {
        item.quality = Math.max(0, item.quality - amount);
    };

    getSellInDependantQualityChangeAmount(item) {
        if (item.sellIn < 0) return 2;
        return 1;
    }

    updateQuality() {
        this.items = this.items.map(item => {
            if (this.legendaryItemTypes.indexOf(item.name) !== -1) {    // wasn't sure if I could update TS version to support .includes()
                return item;
            };

            item.sellIn -= 1;

            switch (item.name) {
                case 'Backstage passes to a TAFKAL80ETC concert':
                    if (item.sellIn < 0) {
                        item.quality = 0;
                    } else {
                        let changeAmount;

                        if (item.sellIn < 5) {
                            changeAmount = 3;
                        } else if (item.sellIn < 10) {
                            changeAmount = 2;
                        } else {
                            changeAmount = 1;
                        }

                        this.increaseQualityWithLimit(item, changeAmount);
                    };
                    
                    break;
                case 'Aged Brie':
                    var changeAmount = this.getSellInDependantQualityChangeAmount(item);
                    this.increaseQualityWithLimit(item, changeAmount);
                    break;
                default:
                    var changeAmount = this.getSellInDependantQualityChangeAmount(item);
                    this.decreaseQualityWithLimit(item, changeAmount);
            };

            return item;
        });

        return this.items;
    }
}
