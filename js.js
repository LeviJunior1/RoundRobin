class RoundRobin {
    constructor(interrupt, processes) {
        this.interrupt = parseInt(interrupt);
        this.processes = processes;
        this.arrayNull = false;
        this.whenInterrupt = [];
        this.timeIdle = [0, 0, 0, 0];
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
        for (process in this.processes) {
            if (this.processes[process] > 0) {
                this.timer += this.interrupt;
                this.timeWait(process);
                if (this.processes[process] < this.interrupt) {
                    this.processes[process] = 0;
                }
                if (this.processes[process] >= this.interrupt) {
                    this.processes[process] = this.processes[process] - this.interrupt;
                }
                this.validatedProcess(process);
            }
        }
    }

    validatedProcess(process) {
        if (this.processes[process] === 0) {
            this.whenInterrupt.push("PROCESSO: " + process + "<br />" + " TEMPO OCIOSO: " + this.timeIdle[process] + "<br />" + " TEMPO TOTAL DE EXECUÇÃO: " + this.timer + "<br />" + "<br />");
        }
    }

    timeWait(process) {
        if (process != 0) {
            this.timeIdle[0] += this.interrupt;
        }
        if (process != 1) {
            this.timeIdle[1] += this.interrupt;
        }
        if (process != 2) {
            this.timeIdle[2] += this.interrupt;
        }
        if (process != 3) {
            this.timeIdle[3] += this.interrupt;
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

const form = document.getElementById('formulario');
let interrupt = document.getElementById('interrupt');
let process1 = document.getElementById('process1');
let process2 = document.getElementById('process2');
let process3 = document.getElementById('process3');
let process4 = document.getElementById('process4');

form.addEventListener('submit', function (e) {
    roundRobin = new RoundRobin(interrupt.value, processes = [process1.value, process2.value, process3.value, process4.value]);
    roundRobin.runMethods();
    roundRobin.showArray();
    e.preventDefault();
})
