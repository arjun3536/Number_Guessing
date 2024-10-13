import random

def generate_puzzle():
    """
    Generate a random puzzle (arithmetic or number sequence) and return
    the puzzle question and correct answer.
    """
    puzzle_type = random.choice(["arithmetic", "sequence"])

    if puzzle_type == "arithmetic":
        num1 = random.randint(1, 10)
        num2 = random.randint(1, 10)
        operator = random.choice(["+", "-", "*"])
        if operator == "+":
            answer = num1 + num2
            question = f"What is {num1} + {num2}?"
        elif operator == "-":
            answer = num1 - num2
            question = f"What is {num1} - {num2}?"
        else:
            answer = num1 * num2
            question = f"What is {num1} * {num2}?"
    else:
        start = random.randint(1, 5)
        step = random.randint(1, 3)
        sequence = [start + step * i for i in range(4)]
        question = f"What comes next in the sequence: {sequence[0]}, {sequence[1]}, {sequence[2]}, {sequence[3]}, ...?"
        answer = sequence[3] + step

    return question, answer

def number_guessing_game():
    secret_number = random.randint(1, 100)
    attempts = 0
    max_attempts = 10

    print("Welcome to the Number Guessing Game with Puzzles!")
    print("I have selected a number between 1 and 100.")
    print(f"You have {max_attempts} attempts to guess it.\n")

    while attempts < max_attempts:
        try:
            guess = int(input("Enter your guess: "))
        except ValueError:
            print("Invalid input. Please enter a number.")
            continue

        attempts += 1
        if guess == secret_number:
            print(f"Congratulations! You've guessed the number {secret_number} in {attempts} attempts.")
            break

        # Provide a puzzle for the hint
        question, answer = generate_puzzle()
        print("Solve this puzzle to get a hint:")
        print(question)

        try:
            user_answer = int(input("Your answer: "))
        except ValueError:
            print("Invalid input. No hint for you this time!")
            continue

        if user_answer == answer:
            if guess < secret_number:
                print("Correct! The secret number is higher than your guess.")
            else:
                print("Correct! The secret number is lower than your guess.")
        else:
            print("Incorrect answer. No hint for you this time!")

        if attempts == max_attempts:
            print(f"Sorry, you've used all {max_attempts} attempts. The number was {secret_number}.")
            break

# Run the game
if __name__ == "__main__":
    number_guessing_game()
