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
                    this.timer += 2;
                }
                if (this.processes[process] >= this.interrupt) {
                    this.processes[process] = this.processes[process] - this.interrupt;
                    this.timer += 2;
                }
                if (this.processes[process] === 0) {
                    this.whenInterrupt.push("O processo " + (parseInt(process) + 1) + " terminou na " + this.interruptIn + "°" + " execução. " + "Tempo de termino: " + this.timer + "<br />");
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
        let process;
        console.log(this.interrupt);
        console.log(this.arrayNull);
        console.log(this.interruptIn);
        for (process in this.processes) {
            console.log(this.processes[process]);
        }
        for (process in this.whenInterrupt) {
            console.log(this.whenInterrupt[process]);
        }
        document.getElementById("process").innerHTML = this.whenInterrupt;
    }
}

roundRobin = new RoundRobin(2, false, processes = [1, 3, 2, 10]);
roundRobin.runMethods();
roundRobin.showArray();