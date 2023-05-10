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
        this.items = this.items.map(item => {
            switch (item.name) {
                case 'Aged Brie':
                    if (item.quality < 50) {
                        item.quality = item.quality + 1
                    }
                    break;
                case 'Backstage passes to a TAFKAL80ETC concert':
                    if (item.quality < 50) {
                        item.quality = item.quality + 1
                        if (item.sellIn < 11) {
                            if (item.quality < 50) {
                                item.quality = item.quality + 1
                            }
                        }
                        if (item.sellIn < 6) {
                            if (item.quality < 50) {
                                item.quality = item.quality + 1
                            }
                        }
                    }
                    break;
                case 'Sulfuras, Hand of Ragnaros':
                    break;
                default:
                    if (item.quality > 0) {
                        item.quality = item.quality - 1
                    }
            }
            
            if (item.name != 'Sulfuras, Hand of Ragnaros') {
                item.sellIn = item.sellIn - 1;
            };
            
            // TODO This should be combined into the above switch statement in a followup refactor
            if (item.sellIn < 0) {
                switch (item.name) {
                    case 'Aged Brie':
                        if (item.quality < 50) {
                            item.quality = item.quality + 1
                        }
                        break;
                    case 'Backstage passes to a TAFKAL80ETC concert':
                        item.quality = item.quality - item.quality
                        break;
                    case 'Sulfuras, Hand of Ragnaros':
                        break;
                    default:
                        if (item.quality > 0) {
                            item.quality = item.quality - 1
                        }
                }
            }

            return item;
        });

        return this.items;
    }
}
