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

export const BACKSTAGE_PASSES = 'Backstage passes';
export const AGED_BRIE = 'Aged Brie'
export const SULFURAS = 'Sulfuras, Hand of Ragnaros';

export class GildedRose {
    items: Array<Item>;
    legendaryItemTypes: Array<string> = [SULFURAS];
    doubledDegradationRegex = RegExp(/conjured/i); 
    backstagePassesRegex = RegExp(/backstage passes/i); 

    constructor(items = [] as Array<Item>) {
        this.items = items;
    }

    increaseQualityWithLimit(item, amount = 1) {
        item.quality = Math.min(50, item.quality + amount);
    };

    decreaseQualityWithLimit(item, amount = 1) {
        // the conjured check is done here as the requirements did not exclude the possibility of special case items also being conjured
        // this separates the logic of figuring out the normal amount and the logic for the conjured multiplier
        let doubledAmount;
        if (this.doubledDegradationRegex.test(item.name)) {
            doubledAmount = amount * 2;
        }
        item.quality = Math.max(0, item.quality - (doubledAmount || amount));
    };

    getSellInDependantQualityChangeAmount(item) {
        if (item.sellIn < 0) return 2;
        return 1;
    }

    getItemTypeFromName(itemName) {
        if (this.backstagePassesRegex.test(itemName)) {
            return BACKSTAGE_PASSES;
        }
        return itemName;
    }

    updateQuality() {
        this.items = this.items.map(item => {
            if (this.legendaryItemTypes.indexOf(item.name) !== -1) {    // wasn't sure if I could update TS version to support .includes()
                return item;
            };

            item.sellIn -= 1;

            const itemType = this.getItemTypeFromName(item.name);

            switch (itemType) {
                case BACKSTAGE_PASSES:
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
                case AGED_BRIE:
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
