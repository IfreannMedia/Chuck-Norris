export default class ChuckToast { 

    constructor(){
    }

    toasts = [];

    addToast(text){
        var master = window.document.getElementById("master-toast");
        if(master){
            var newToast = master.cloneNode(true);
            newToast.removeAttribute("id");
            var index = window.toast.toasts.length++;
            newToast.setAttribute("data-t-index", index);
            
            newToast.lastElementChild.firstElementChild.textContent = text;
            newToast.classList.add("z-9999");
            window.document.getElementById("main-content").appendChild(newToast);
            window.toast.timeoutToast(index);
        }
    }

    removeToast(index){
        this.addToast("example");
        console.log("remove: " + index);
    }

    timeoutToast(index) {
        setTimeout(()=>{
            var allToasts = window.document.getElementsByClassName("toast-container");
            for (let i = 0; i < allToasts.length; i++) {
                if(allToasts[i].getAttribute("data-t-index")== index){
                    allToasts[i].remove();
                }
            }
        }, 4000)
    }
}

window.toast = window.toast ? window.toast : new ChuckToast();