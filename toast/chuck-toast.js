export default class ChuckToast {

    constructor() {
    }


    static getSingletonInstance() {
        window.toast = !!window.toast && window.toast instanceof this ? window.toast : new ChuckToast();
        return window.toast;
    }

    toasts = [];

    addToast(text) {
        var master = window.document.getElementById("master-toast");
        if (master) {
            var newToast = master.cloneNode(true);
            newToast.removeAttribute("id");
            var index = window.toast.toasts.length + 1;
            newToast.setAttribute("data-t-index", index);
            newToast.lastElementChild.firstElementChild.textContent = text;
            newToast.classList.add("z-9999");
            window.document.getElementById("main-content").appendChild(newToast);
            this.addEventListeners(newToast);
        }
    }

    addEventListeners(toast) {
        toast.addEventListener('animationend', (event) => {
            var container = event.srcElement.closest(".toast-container");
            if (container)
                container.remove();
        });
        toast.addEventListener('mouseenter', (event) => {
            event.srcElement.querySelector(".toast-loader").classList.add("dont-animate");
        });
        toast.addEventListener('mouseleave', (event) => {
            event.srcElement.querySelector(".toast-loader").classList.remove("dont-animate");
        });
    }

    removeToast(index) {
        this.addToast("example");
        console.log("remove: " + index);
    }

    timeoutToast(index) {
        setTimeout(() => {
            var allToasts = window.document.getElementsByClassName("toast-container");
            for (let i = 0; i < allToasts.length; i++) {
                if (allToasts[i].getAttribute("data-t-index") == index) {
                    allToasts[i].remove();
                }
            }
        }, 4000)
    }
}