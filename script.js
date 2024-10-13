let secretNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;
const maxAttempts = 10;
let currentPuzzle = null;

document.getElementById("guess-button").addEventListener("click", handleGuess);
document.getElementById("solve-puzzle-button").addEventListener("click", handlePuzzle);

function handleGuess() {
    const guess = parseInt(document.getElementById("guess-input").value);
    const messageElement = document.getElementById("message");
    
    if (isNaN(guess) || guess < 1 || guess > 100) {
        messageElement.textContent = "Please enter a valid number between 1 and 100.";
        return;
    }

    attempts++;
    messageElement.textContent = `Attempt ${attempts}/${maxAttempts}: Your guess is ${guess}.`;

    if (guess === secretNumber) {
        showResult(`Congratulations! You guessed the number ${secretNumber} in ${attempts} attempts.`);
    } else if (attempts === maxAttempts) {
        showResult(`Sorry, you've used all ${maxAttempts} attempts. The number was ${secretNumber}.`);
    } else {
        generatePuzzle();
        document.getElementById("puzzle-container").style.display = "block";
    }
}

function generatePuzzle() {
    const puzzleType = Math.random() < 0.5 ? "arithmetic" : "sequence";
    if (puzzleType === "arithmetic") {
        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        const operator = ["+", "-", "*"][Math.floor(Math.random() * 3)];
        let answer;
        
        switch (operator) {
            case "+":
                answer = num1 + num2;
                break;
            case "-":
                answer = num1 - num2;
                break;
            case "*":
                answer = num1 * num2;
                break;
        }

        currentPuzzle = { question: `What is ${num1} ${operator} ${num2}?`, answer };
    } else {
        const start = Math.floor(Math.random() * 5) + 1;
        const step = Math.floor(Math.random() * 3) + 1;
        const sequence = [start, start + step, start + 2 * step, start + 3 * step];
        currentPuzzle = { question: `What comes next in the sequence: ${sequence.join(", ")}?`, answer: sequence[3] + step };
    }

    document.getElementById("puzzle-question").textContent = currentPuzzle.question;
}

function handlePuzzle() {
    const puzzleAnswer = parseInt(document.getElementById("puzzle-answer").value);
    const messageElement = document.getElementById("message");

    if (puzzleAnswer === currentPuzzle.answer) {
        if (secretNumber > parseInt(document.getElementById("guess-input").value)) {
            messageElement.textContent += " Hint: The secret number is higher.";
        } else {
            messageElement.textContent += " Hint: The secret number is lower.";
        }
    } else {
        messageElement.textContent += " Incorrect puzzle answer. No hint for you!";
    }
    
    document.getElementById("puzzle-container").style.display = "none";
    document.getElementById("puzzle-answer").value = "";
}

function showResult(message) {
    document.getElementById("result").textContent = message;
    document.getElementById("guess-button").disabled = true;
    document.getElementById("solve-puzzle-button").disabled = true;
}
