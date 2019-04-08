class RoundRobin {
    constructor(interrupt, arrayNull, processes) {
        this.interrupt = interrupt;
        this.arrayNull = arrayNull;
        this.processes = processes;
        this.interruptIn = 0;
        this.whenInterrupt = [];
        this.timer = 0;
    }

    runMethods() {
        do {
            this.calcRoundRobin();
            this.arrayNull = this.checksNullArray();
        } while (this.arrayNull === true);
    }

    calcRoundRobin() {
        let process;
        this.interruptIn += 1;
        for (process in this.processes) {
            if (this.processes[process] > 0) {
                if (this.processes[process] < this.interrupt) {
                    this.processes[process] = 0;
                    this.timer += this.interrupt;
                }
                if (this.processes[process] >= this.interrupt) {
                    this.processes[process] = this.processes[process] - this.interrupt;
                    this.timer += this.interrupt;
                }
                if (this.processes[process] === 0) {
                    this.whenInterrupt.push("O processo " + (parseInt(process) + 1) + " terminou na " + this.interruptIn + "°" + " execução. " + "Tempo de termino: " + this.timer + "ms" + "<br />");
                }
            }
        }
    }

    checksNullArray() {
        let process;
        let checks = false;
        for (process in this.processes) {
            if (this.processes[process] > 0) {
                checks = true;
                break;
            }
        }
        return checks;
    }

    showArray() {
        document.getElementById("process").innerHTML = this.whenInterrupt;
    }
}

roundRobin = new RoundRobin(2, false, processes = [1, 3, 2, 10]);
roundRobin.runMethods();
roundRobin.showArray();