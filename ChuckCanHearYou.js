export default class ChuckCanHearYou {
    availableCategories = [];
    speechRecognition = null;
    speechGrammarList = null;
    speechRecognitionEvent = null;
    constructor() {
        // this.speechRecognition = SpeechRecognition || webkitSpeechRecognition;
        // this.speechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
        // this.speechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;
        fetch('https://api.chucknorris.io/jokes/categories').then(res => {
            if (res.status == 200) {
                return res.json();
            } else {
                return Promise.reject(res.statusText);
            }
        }).then(categories =>
            this.availableCategories = categories).catch(err => console.error(new Error(err)));
    }
}