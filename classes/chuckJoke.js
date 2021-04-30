export default class ChuckJoke {
    categories = [];
    created_at = '';
    icon_url = '';
    id = '';
    updated_at = '';
    url = '';
    value = '';

    constructor(joke) {
        this.categories = joke.categories ? joke.categories : this.categories;
        this.created_at = joke.created_at ? joke.created_at : this.created_at;
        this.icon_url = joke.icon_url ? joke.icon_url : this.icon_url;
        this.id = joke.id ? joke.id : this.id;
        this.updated_at = joke.updated_at ? joke.updated_at : this.updated_at;
        this.url = joke.url ? joke.url : this.url;
        this.value = joke.value ? joke.value : this.value;
    }
}