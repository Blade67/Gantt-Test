class Gantt {
    constructor(props) {
        this.columns = props.columns;
        this.rows = props.rows;
        this.element = props.element;
        this.middlewares = props.middlewares;

        if (this.middlewares !== undefined) this.initializeMiddlewares(this.middlewares);

        for (let row = 0; row <= this.rows.length; row++) {
            for (let column = 0; column <= this.columns.length; column++) {
                let el = document.createElement("span");
                let style = "";
                style += `grid-column-start:${column};`;
                style += `grid-column-end:${column + 1};`;
                style += `grid-row-start: ${row};`;
                style += `grid-row-end:${row + 1};`;
                el.style = style;
                el.classList = "gantt-item";
                el.id = `${column}-${row}`;
                if ((row === 0) & (column > 0)) el.innerText = this.columns[column - 1];
                if ((row > 0) & (column === 0)) el.innerText = this.rows[row - 1];
                document.getElementById(this.element).appendChild(el);
            }
        }
    }

    initializeMiddlewares(middlewares) {
        for (let i = 0; i < middlewares.length; i++) middlewares[i].initialize(this);
    }

    addCard(props) {
        try {
            for (let i = 0; i < this.middlewares.length; i++) {
                this.middlewares[i].addCard(this, props);
            }
        } catch (e) {
            this.createCard(props);
        }
    }

    createCard(props) {
        let c = document.createElement("span");
        let style = "";
        style += `grid-column-start: ${props.column};`;
        style += `grid-column-end: ${props.column + props.length};`;
        style += `grid-row-start: ${props.row};`;
        style += `grid-row-end: ${props.row + 1};`;
        style += `background-color: ${props.backgroundColor || "rgb(128, 128, 128)"};`;
        style += `color: ${props.color || "#ffffff"}; margin: 4px;`;
        c.style = style;
        c.classList = "gantt-item task";
        c.id = props.id;
        c.innerText = props.label;
        document.getElementById(this.element).appendChild(c);
    }
}
