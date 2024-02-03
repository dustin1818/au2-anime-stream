import { ICustomElementViewModel } from "aurelia";

export class Home implements ICustomElementViewModel {
    public num: number = 0;
    constructor() {
    }

    addNum() {
        this.num++;
    }
}