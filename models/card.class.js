class Card {

    dialogId = 'pokedexContainer';
    dialogDom;

    constructor() {
        this.dialogDom = document.getElementById(this.dialogId);
    }

    toggleCard() {
        this.dialogDom.style.display = this.dialogDom.style.display == 'flex' ? 'none' : 'flex';
    }
}