import ChuckToast from '../toast/chuck-toast.js'

export default class ChuckCanSpeak {

    voices = null;
    constructor() {
        this.initializeSpeechSynthesis();
    }

    getJokeText() {
        return 'Hello, I am making you laugh';
    }

    initializeSpeechSynthesis() {
        var synth = this.getSynth();
        this.voices = synth.getVoices();
    }


    synthesizeTextToVoice(text) {
        if (this.synthesizorIsBusy()) {
            return;
        }
        var synth = this.getSynth();
        var voices = synth.getVoices();
        if (!voices || voices.length < 1) {
            ChuckToast.getSingletonInstance().addToast('speech synthesis is still initializing, try again in a moment');
            return;
        }
        var pitch = 1;
        var rate = 1;
        var utterance = new SpeechSynthesisUtterance(text);
        utterance.pitch = pitch;
        utterance.rate = rate;
        this.bindEventHandlers(utterance);
        synth.speak(utterance);
    }

    bindEventHandlers(utterance) {
        utterance.onend = function (event) {
            document.getElementById("btn-hear-joke").removeAttribute("disabled");
            console.log(document.getElementById("btn-hear-joke"));
            console.log("onend: ", event);
        }

        utterance.onerror = function (event) {
            document.getElementById("btn-hear-joke").removeAttribute("disabled");
            console.log("onerror: ", event);
        }

        utterance.onstart = function (event) {
            console.log("onstart: ", event);
            document.getElementById("btn-hear-joke").setAttribute("disabled", true);
        }
    }

    getSynth() {
        return window.speechSynthesis;
    }
    synthesizorIsBusy() {
        return this.getSynth().speaking || this.getSynth().pending;
    }
}