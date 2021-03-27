export default class ChuckCanHearYou {
    speechRecognition = null;
    speechGrammarList = null;
    speechRecognitionEvent = null;
    constructor() {
        this.speechRecognition = SpeechRecognition || webkitSpeechRecognition
        this.speechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
        this.speechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent
    }
}