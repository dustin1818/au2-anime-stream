import { EventAggregator, ICustomElementViewModel, inject } from "aurelia";

@inject(EventAggregator)
export class Navbar implements ICustomElementViewModel {
    constructor(private ea: EventAggregator) { }

    public showSearch(): void {
        this.ea.publish('search:open');
    }
}