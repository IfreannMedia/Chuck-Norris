import ChuckJoke from './chuckJoke.js';
import ChuckCanHearYou from './ChuckCanHearYou.js';
import * as chuckBind from './chuck-bind.js';

class Norris {

    currentJoke = null;
    currentJokeEl = null;
    categoriesEl = null;
    currentCategoryEl = null;
    chuckCanHearYou = new ChuckCanHearYou();
    constructor() {
        this.grabHtmlEls();
        this.setInitialHtmlEls()
        this.chuckCanHearYou.getCategories().then(res => {
            this.removeChildLoader(this.categoriesEl.parentNode);
            this.categoriesEl.textContent = this.categoriesEl.textContent.concat(" ");
            for (let i = 0; i < res.length; i++) {
                var nextCat = document.createElement("text");
                nextCat.innerText = res[i] + " ";
                nextCat.classList.add("category");
                nextCat.classList.add("c-b");
                this.categoriesEl.appendChild(nextCat);
                chuckBind.bindClickEventHandler(this.categoriesEl.children[i], () => this.categorySelection(this.categoriesEl.children[i]));
            }
        }).catch(failed => console.error(new Error(failed)));
    }

    grabHtmlEls() {
        this.currentJokeEl = document.getElementById("current-joke");
        this.categoriesEl = document.getElementById("categories");
        this.currentCategoryEl = document.getElementById("current-category");
    }

    setInitialHtmlEls() {
        this.sethtmlCategory('none selected');
        this.setHtmlJoke('no joke');
    }

    getJoke() {
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

    addChildLoader(parentEl) {
        var loader = document.createElement("div");
        textEl.classList.add("loader")
        parentEl.appendChild(loader);
    }

    removeChildLoader(parentEl) {
        for (let i = 0; i < parentEl.children.length; i++) {
            if (parentEl.children[i].classList.contains("loader")) {
                parentEl.children[i].remove();
            }

        }
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
                this.setHtmlJoke();
                this.sethtmlCategory(category);
            }).catch(reason => {
                console.error(new Error(reason));
            })

    }

    hearJoke() {
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
        category = " " + category;
        if (this.currentCategoryEl && category) {
            if (this.currentCategoryEl.firstElementChild) {
                this.currentCategoryEl.firstElementChild.innerText = category;
            } else {
                var textEl = document.createElement("text");
                textEl.classList.add("c-b")
                textEl.innerText = category;
                this.currentCategoryEl.appendChild(textEl);
            }
        }
    }

    categorySelection(categoryEl) {
        this.getCategoricalJoke(categoryEl.textContent);
        let categories = document.getElementsByClassName("category")
        for (let i = 0; i < categories.length; i++) {
            categories[i].classList.remove("chosen");
        }
        categoryEl.classList.add("chosen");
    }

    bindClickEvents() {
        chuckBind.bindById("btn-get-joke", () => this.getJoke());
        chuckBind.bindById("btn-get-joke-category", () => this.askForJoke());
        chuckBind.bindById("btn-hear-joke", () => this.hearJoke());
    }

}

window.norris = window.norris ? window.norris : new Norris();

window.norris.bindClickEvents();

