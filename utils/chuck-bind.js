function bindClickEventHandler(el, functionToBind) {
    if (el) {
        el.onclick = functionToBind;
    } else {
        console.error(new Error("could not find element with id: " + id));
    }
}

function bindById(id, functionToBind) {
    let el = document.getElementById(id);
    this.bindClickEventHandler(el, functionToBind);
}

function bindByClass(className, functionToBind) {
    let els = document.getElementsByClassName(className);
    els.forEach((el) => this.bindClickEventHandler(el, functionToBind));
}

export { bindById, bindByClass, bindClickEventHandler };