import ChuckJoke from './chuckJoke.js';

class Norris {

    currentJoke = null;
    currentJokeEl = null;
    constructor() {
        this.currentJokeEl = document.getElementById("current-joke");
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

    hearJokeAgain() {
        console.log("hearJokeAgain");
    }

    askForJoke() {
        console.log("askForJoke");
    }

    setHtmlJoke() {
        if (this.currentJokeEl && this.currentJoke) {
            this.currentJokeEl.innerHTML = this.currentJoke.value;
        }
    }
}

window.norris = window.norris ? window.norris : new Norris();