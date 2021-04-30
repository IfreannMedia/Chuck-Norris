export default class ChuckToast {

    templateToast = null;
    constructor() {
        this.templateToast = document.getElementById("master-toast");
        this.addToast("hello there!");
    }

    static getSingletonInstance() {
        window.toast = !!window.toast && window.toast instanceof this ? window.toast : new ChuckToast();
        return window.toast;
    }

    toasts = [];

    addToast(text) {
        if (this.templateToast) {
            var newToast = this.templateToast.cloneNode(true);
            newToast.removeAttribute("id");
            var index = this.toasts.length;
            newToast.setAttribute("data-t-index", index);
            newToast.lastElementChild.firstElementChild.textContent = text;
            newToast.classList.add("z-9999");
            window.document.getElementById("main-content").appendChild(newToast);
            this.toasts.push(newToast);
            this.addEventListeners(newToast);
        } else {
            console.error("could not determine a master toast");
        }
    }

    addEventListeners(toast) {
        this.addAnimationEndEvent(toast);
        this.addMouseEnterEvent(toast);
        this.addMouseLeaveEvent(toast);
        this.bindCloseEvent(toast);
    }

    addMouseLeaveEvent(toast) {
        toast.addEventListener('mouseleave', (event) => {
            event.srcElement.querySelector(".toast-loader").classList.remove("dont-animate");
        });
    }

    addMouseEnterEvent(toast) {
        toast.addEventListener('mouseenter', (event) => {
            event.srcElement.querySelector(".toast-loader").classList.add("dont-animate");
        });
    }

    addAnimationEndEvent(toast) {
        toast.addEventListener('animationend', (event) => {
            var container = event.srcElement.closest(".toast-container");
            if (container)
                container.remove();
        });
    }
    
    bindCloseEvent(toast) {
        for (let i = 0; i < toast.children.length; i++) {
            if (toast.children[i].classList.contains("toast-loader-container")) {
                for (let j = 0; j < toast.children[i].children.length; j++) {
                    const element = toast.children[i].children[j];
                    if (element.classList.contains("toast-close")) {
                        element.addEventListener("click", () => this.removeToast(toast.getAttribute("data-t-index")));
                        break;
                    }
                }
                break;
            }
        }
    }

    removeToast(index) {
        this.toasts[index].remove();
        this.toasts = this.toasts.splice(index, 1);
    }
}