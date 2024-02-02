import { EventAggregator, IDisposable, inject } from "aurelia";

@inject(EventAggregator)
export class MyApp {
    public showSearch = false;
    public searchListener: IDisposable;

    static routes = [
        {
            id: 'home',
            path: ['', 'home'],
            component: () => import('./routes/home/home')
        },
        {
            id: 'about',
            path: 'about',
            component: () => import('./routes/about/about')
        }

    ];

    constructor(private ea: EventAggregator) { }

    binding(): void {
        this.searchListener = this.ea.subscribe('search:open', () => {
            this.showSearch = true;
        });
    }

    unbinding(): void {
        this.searchListener.dispose();
    }
}
