class middleware {
    constructor(msg) {
        this.msg = msg;

        console.log(msg);
    }
    initialize(parent) {
        console.log("Initialized!", parent);
    }
    addCard(parent, props) {
        parent.createCard(props);
    }
}
