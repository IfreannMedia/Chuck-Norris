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
                var nextCat = document.createElement("text");
                 nextCat.innerText = res[i] + " ";
                 nextCat.classList.add("category")
                 categoriesEl.appendChild(nextCat);
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
        category = " " + category;
        if (this.currentCategoryEl && category) {
            if( this.currentCategoryEl.firstElementChild){
                this.currentCategoryEl.firstElementChild.innerText = category;
            } else {
                var textEl = document.createElement("text");
                textEl.innerText = category;
                this.currentCategoryEl.appendChild(textEl);
            }
            // this.currentCategoryEl.appendChild(document.createElement("text")) = this.currentCategoryEl.textContent.concat(" " + category);
            // this.currentCategoryEl.textContent = this.currentCategoryEl.textContent.concat(" " + category);
        }
    }

}

window.norris = window.norris ? window.norris : new Norris();