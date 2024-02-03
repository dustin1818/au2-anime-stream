import { animeSearchSchema } from "../../interfaces/animeSchemas";
import { ApiService } from "../../services/api-service";
import { BindingMode, ICustomElementViewModel, inject, bindable } from "aurelia";

@inject(ApiService)
export class Search implements ICustomElementViewModel {
    public results: animeSearchSchema[] = [];
    public searchValue = "";

    // Create a bindable property and make it two way, so when we set it to false from this view-model the value goes back out of the component
    @bindable({ mode: BindingMode.twoWay }) public showing = false;
    constructor(private api: ApiService) {
    }

    // Called on the container and used to close the search dialog if escape is pressed
    public keypress(event: KeyboardEvent) {
        //if user hit escape, set showing to false and return false to stop the event
        if (event.key === "Escape") {
            this.showing = false;
            return false;
        }

        //allow the event to continue, so the search input works
        return true;
    }

    //called when the user types into the search input
    public async search(): Promise<void> {
        //only call the api to if our search word is 3 or more characters
        if (this.searchValue.length >= 3) {
            const data = await this.api.searchAnime(this.searchValue)
            this.results = data['results'];
            console.log(data);
        }
    }

    //when we click a search result, we want to hide the search modal
    public resultClick(): void {
        this.showing = false;
    }
}