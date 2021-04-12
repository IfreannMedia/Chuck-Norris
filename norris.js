import ChuckJoke from './chuckJoke.js';
import ChuckCanHearYou from './ChuckCanHearYou.js';

class Norris {

    currentJoke = null;
    currentJokeEl = null;
    currentCategoryEl = null;
    chuckCanHearYou = new ChuckCanHearYou();
    constructor() {
        this.grabHtmlEls();
        this.setInitialHtmlEls()
        this.chuckCanHearYou.getCategories().then(res => {
            var categoriesEl = document.getElementById("categories");
            categoriesEl.textContent = categoriesEl.textContent.concat(" ");
            for (let i = 0; i < res.length; i++) {
                categoriesEl.textContent = categoriesEl.textContent.concat(res[i]);
                if (res[i] != res[res.length - 1]) {
                    categoriesEl.textContent = categoriesEl.textContent.concat(" ");
                }
            }
        }).catch(failed => console.error(new Error(failed)));
    }

    grabHtmlEls() {
        this.currentJokeEl = document.getElementById("current-joke");
        this.currentCategoryEl = document.getElementById("current-category");
    }

    setInitialHtmlEls() {
        this.sethtmlCategory('none selected');
        this.setHtmlJoke('no joke');
    }

    getJoke() {
        console.log("getJoke");
        fetch('https://api.chucknorris.io/jokes/random')
            .then(response => {
                if (response.status == 200)
                    return response.json()
                else
                    return Promise.reject(response.statusText);
            })
            .then(data => {
                this.currentJoke = new ChuckJoke(data);
                console.log(this.currentJoke);
                this.setHtmlJoke();
            }).catch(reason => {
                console.error(new Error(reason));
            })

    }

    getCategoricalJoke(category) {
        fetch(`https://api.chucknorris.io/jokes/random?category=${category.toLowerCase()}`)
            .then(response => {
                if (response.status == 200)
                    return response.json()
                else
                    return Promise.reject(response.statusText);
            })
            .then(data => {
                this.currentJoke = new ChuckJoke(data);
                console.log(this.currentJoke);
                this.setHtmlJoke();
                this.sethtmlCategory(category);
            }).catch(reason => {
                console.error(new Error(reason));
            })

    }

    hearJokeAgain() {
        console.log("hearJokeAgain");
    }

    askForJoke() {
        var callback = (category) => {
            this.getCategoricalJoke(category);
        }
        this.chuckCanHearYou.startSpeechRecognition(callback);
    }

    setHtmlJoke() {
        if (this.currentJokeEl && this.currentJoke) {
            this.currentJokeEl.innerHTML = this.currentJoke.value;
        }
    }

    sethtmlCategory(category) {
        if (this.currentCategoryEl && category) {
            this.currentCategoryEl.textContent = this.currentCategoryEl.textContent.concat(" " + category);
        }
    }

}

window.norris = window.norris ? window.norris : new Norris();