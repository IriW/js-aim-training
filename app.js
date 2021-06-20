const startBtn = document.querySelector('#start')

const screens = document.querySelectorAll('.screen')

const timeList = document.querySelector('#time-list')

const timeEl = document.querySelector('#time')

const board = document.querySelector('#board')

const colors = ['#F1B24A', '#DADED4', '#a28089', '#39603D', '#A3BCB6', '#A79344']

let time = 0
let score = 0

startBtn.addEventListener('click', (event) => {
    event.preventDefault()
    screens[0].classList.add('up')
})

timeList.addEventListener('click', event => {
    if (event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time'))
        screens[1].classList.add('up')
        startGame()
    }
})
board.addEventListener('click', event => {
    if (event.target.classList.contains('circle')) {
        score++
        event.target.remove()
        createRandomCircle()
    }
})


function startGame() {
    setInterval(decreaseTime, 1000)
    createRandomCircle()
    setTime(time)
}

function decreaseTime() {
    if (time === 0) {
        finishGame() 
    } else {
        let current = --time
        if (current < 10) {
            current = `0${current}`
        }
        setTime(current)
    }

}

function setTime(value) {
    timeEl.innerHTML = `00:${value}`
}

function reload() {
    window.location.reload()
}


function finishGame() {
    timeEl.parentNode.remove()
    // Alternatively to 
    //      timeEl.parentNode.remove()
    // you can use timeEl.parentNode.classList.add('hide')

    board.innerHTML = `<h1>Your score: <span class="primary">${score}</span></h1>`
    goToStartBtn()
}

function createRandomCircle() {
    const circle = document.createElement('div')
    const size = getRandomNumber(10, 60)
    const {width, height} = board.getBoundingClientRect()
    const x = getRandomNumber(0, width - size)
    const y = getRandomNumber(0, height - size)

    circle.classList.add('circle')
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${x}px`
    circle.style.left = `${y}px`

    setColor(circle);

    board.append(circle)
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

function setColor(element) {
    const color = getRandomColor()
    element.style.backgroundColor = color
    element.style.boxShadow = `0 0 2px ${color}, 0 0 5px ${color}`
}

function getRandomColor() {
    const index = Math.floor(Math.random() * colors.length);
    return colors[index];
   // return colors[Math.floor(Math.random() * colors.length)]
}

function goToStartBtn() {
    let resetButton = document.createElement('button')
    resetButton.innerHTML = 'Back to Start'
    resetButton.classList.add('reset')
    board.appendChild(resetButton)
    resetButton.addEventListener('click', reload)
}




//AUTO CLICK THE CIRCLE
function winTheGame() {
    function kill() {
        const circle = document.querySelector('.circle')
        if (circle) {
            circle.click()
        }
    }
    setInterval(kill, 42)
}