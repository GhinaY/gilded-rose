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

    increaseQualityWithLimit(item, amount = 1) {
        item.quality = Math.min(50, item.quality + amount);
    };

    decreaseQualityWithLimit(item, amount = 1) {
        item.quality = Math.max(0, item.quality - amount);
    };

    updateQuality() {
        this.items = this.items.map(item => {
            if (item.name === 'Sulfuras, Hand of Ragnaros') {
                return item;
            };

            switch (item.name) {
                case 'Aged Brie':
                    this.increaseQualityWithLimit(item);
                    break;
                case 'Backstage passes to a TAFKAL80ETC concert':
                    this.increaseQualityWithLimit(item);
                        
                    if (item.sellIn < 11) {
                        this.increaseQualityWithLimit(item);
                    }
                    if (item.sellIn < 6) {
                        this.increaseQualityWithLimit(item);
                    }
                    break;
                default:
                    this.decreaseQualityWithLimit(item);
            }
            
            item.sellIn = item.sellIn - 1;
            
            // TODO This should be combined into the above switch statement in a followup refactor
            if (item.sellIn < 0) {
                switch (item.name) {
                    case 'Aged Brie':
                        this.increaseQualityWithLimit(item);
                        break;
                    case 'Backstage passes to a TAFKAL80ETC concert':
                        item.quality = 0;
                        break;
                    default:
                        this.decreaseQualityWithLimit(item);
                }
            }

            return item;
        });

        return this.items;
    }
}
