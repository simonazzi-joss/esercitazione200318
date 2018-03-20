export class Item {
    id: number;
    pic: string;
    what: string;
    toWho: string;
    when: string;
    isReturned: boolean;

    constructor() {
        this.isReturned = false;
    }
}