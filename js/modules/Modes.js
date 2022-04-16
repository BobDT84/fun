function Mode() {

    setGameModeStatus() {
        //toggle modes from false to true for every mode listed in activatedModes
        let modes = {
            strict: 'strictMode',
            fiveWord: 'fiveWordMode',
        };
        let listOfModes = Object.keys(modes);
        for (let mode of this.activatedModes) {
            if (listOfModes.includes(mode)) {
                this[modes[mode]] = true;
            }
        }
    }

}


export { Mode };