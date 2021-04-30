import ChuckToast from "../toast/chuck-toast.js";

export default class ChuckCanHearYou {
    availableCategories = [];
    speechRecognition = null;
    speechGrammarList = null;
    speechRecognitionEvent = null;
    grammar = '#JSGF V1.0; grammar categories; public <category> =';
    recognitionObject;
    selectedCategory = "";
    successfulSpeechRecogCallback = null;
    constructor() {
        this.initSpeechRecogApi()
    }


    initSpeechRecogApi() {
        this.speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition || window.msSpeechRecognition;
        this.speechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList  || window.msSpeechGrammarList;
        this.speechRecognitionEvent = window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent || window.msSpeechRecognitionEvent;
    }

    fetchCategories() {
        return fetch('https://api.chucknorris.io/jokes/categories').then(res => {
            if (res.status == 200) {
                return res.json();
            } else {
                return Promise.reject(res.statusText);
            }
        }).then(categories => {
            this.createCateogries(categories);
        }).catch(err => {
            ChuckToast.getSingletonInstance().addToast("error getting categories, try again later!");
            console.error(new Error(err));
        });
    }

    createCateogries(categories) {
        this.availableCategories = categories;
        for (let i = 0; i < categories.length; i++) {
            this.grammar = this.grammar.concat(" " + categories[i] + " ");
            if (i != categories.length - 1) {
                this.grammar = this.grammar.concat("|")
            } else {
                this.grammar = this.grammar.concat(";");
            }

        }
        this.configureSpeechRecognition();
        this.bindSpeechRecognitionEvents();
    }

    startSpeechRecognition(callback) {
        try {
            this.successfulSpeechRecogCallback = callback;
            this.recognitionObject.start();
        } catch (error) {
            ChuckToast.getSingletonInstance().addToast("oops! We're having network issues!");
        }

    }

    configureSpeechRecognition() {
        try {
            this.recognitionObject = new this.speechRecognition();
            var speechRecognitionList = new this.speechGrammarList();
            speechRecognitionList.addFromString(this.grammar, 1);
            this.recognitionObject.grammars = speechRecognitionList;
            this.recognitionObject.continuous = false;
            this.recognitionObject.lang = 'en-US';
            this.recognitionObject.interimResults = false;
            this.recognitionObject.maxAlternatives = 1;
        } catch (error) {
            console.error(error);
            ChuckToast.getSingletonInstance().addToast("unable to configure speech recognition/synthesis, try with another browser!");
        }

    }

    getCategories() {
        return new Promise((resolve, reject) => {
            if (this.categories && this.categories.length) {
                resolve(this.categories);
            } else {
                this.fetchCategories().then((res) => {
                    resolve(this.availableCategories);
                }).catch(() => reject("failed to fetch categories"));
            }
        })
    }

    bindSpeechRecognitionEvents() {
        const self = this;
        this.recognitionObject.onaudiostart = function (event) {
            console.log("audio started");
        }

        this.recognitionObject.onaudioend = function (event) {
            console.log("audio ended");
        }

        this.recognitionObject.onend = function (event) {
            console.log("end");
        }

        this.recognitionObject.onerror = function (event) {
            if (event.error == "not-allowed") {
               
            } else {
                debugger;
            }
            var displayErrorText = "speech recognition is experimental tech, it will only work in certain browsers like Chrome ";
            console.error(event)
            switch (event.error) {
                case "not-allowed":
                    displayErrorText = "speech recognition is not allowed, enable microphone access to use it";
                    break;
                case "network":
                    displayErrorText = "network error encountered, perhaps your are using a privacy focused browser";
                    break;
                default:
                    break;
            }
            ChuckToast.getSingletonInstance().addToast(displayErrorText);
        }

        this.recognitionObject.onnomatch = function (event) {
            console.log("no match");
        }

        this.recognitionObject.onresult = function (event) {
            if (event.results && event.results[0] && event.results[0] && event.results[0][0]) {
                self.selectedCategory = event.results[0][0].transcript;
                if (self.successfulSpeechRecogCallback) {
                    self.successfulSpeechRecogCallback(self.selectedCategory);
                }
            } else {
                console.log("speech detection failed with result: ", event);
            }
        }

        this.recognitionObject.onsoundstart = function (event) {
            console.log("sound start");
        }

        this.recognitionObject.onsoundend = function (event) {
            console.log("sound end");
        }

        this.recognitionObject.onspeechstart = function (event) {
            console.log("speech start");
        }

        this.recognitionObject.onspeechend = function (event) {
            console.log("speech end");
        }

        this.recognitionObject.onstart = function (event) {
            console.log("start");
        }

    }

}