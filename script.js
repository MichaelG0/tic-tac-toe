class TicTacToe {
    constructor() {
        this.grid = document.querySelector('.grid')
        this.turn = document.querySelector('#turn')
        this.roundEl = document.querySelector('#round')
        this.toggleInit = true
        this.toggle = true
        this.round = 0
        this.controlO = []
        this.controlX = []

        this.choosePlayer()
    }

    choosePlayer() {
        swal({
            title: 'Pick your sign!',
            buttons: {
                cross: 'X',
                circle: 'O',
            },
            className: 'start'
        })
            .then((value) => {
                if (value == 'cross') {
                    this.toggleInit = false
                    this.toggle = false;
                }
                this.startGame()
            });
    }

    startGame() {
        this.round++
        this.roundEl.innerHTML = `Round: ${this.round}`
        if (this.round % 2 == 0) this.turn.innerHTML = `Player 2's turn`;
        else this.turn.innerHTML = `Player 1's turn`
        this.turn.style.visibility = 'visible'
        this.grid.innerHTML = `
            <div class="h1 v1 d1"></div>
            <div class="h1 v2"></div>
            <div class="h1 v3 d2"></div>
            
            <div class="h2 v1"></div>
            <div class="h2 v2 d1 d2"></div>
            <div class="h2 v3"></div>
            
            <div class="h3 v1 d2"></div>
            <div class="h3 v2"></div>
            <div class="h3 v3 d1"></div>`

        this.cells = document.querySelectorAll('.grid div')

        for (let cell of this.cells) {
            cell.addEventListener('click', () => {
                if (this.toggle === true) {
                    cell.innerHTML = 'O'
                    this.controlO = this.controlO.concat(cell.classList.value.split(' '))
                } else {
                    cell.innerHTML = 'X'
                    this.controlX = this.controlX.concat(cell.classList.value.split(' '))
                }

                this.countsO = {};
                this.countsX = {};
                this.countClasses(this.controlO, this.countsO)
                this.countClasses(this.controlX, this.countsX)

                const cellsArr = Array.from(this.cells)
                if (!cellsArr.some(cur => cur.innerText === '')) {
                    this.turn.style.visibility = 'hidden'
                    swal({
                        title: "Tie!",
                        icon: 'error'
                    })
                        .then(() => {
                            this.toggleInit = !this.toggleInit
                            this.toggle = this.toggleInit
                            this.controlO = []
                            this.controlX = []
                            this.countsO = {};
                            this.countsX = {};

                            this.startGame()
                        });
                }

                this.whoWon(this.countsO, cell)
                this.whoWon(this.countsX, cell)

                if (this.turn.innerHTML == `Player 1's turn`)
                    this.turn.innerHTML = `Player 2's turn`
                else this.turn.innerHTML = `Player 1's turn`

                this.toggle = !this.toggle
            }, { once: true })
        }
    }

    countClasses(arr, obj) {
        arr.forEach((cur) => {
            obj[cur] = (obj[cur] || 0) + 1;
        })
    }

    whoWon(obj, el) {
        for (let klass in obj) {
            if (obj[klass] === 3) {
                this.turn.style.visibility = 'hidden'
                let winner = this.turn.innerHTML.substring(0, 8)
                swal({
                    title: `${winner} wins!`,
                    icon: 'success'
                })
                    .then(() => {
                        this.toggleInit = !this.toggleInit
                        this.toggle = this.toggleInit
                        this.controlO = []
                        this.controlX = []
                        this.countsO = {};
                        this.countsX = {};

                        this.startGame()
                    });
            }
        }
    }
}

const ttt = new TicTacToe
