document.addEventListener("DOMContentLoaded", () => {
    console.log("Script loaded");

    let boxes = document.querySelectorAll(".box");
    let resetBtn = document.querySelector("#reset-btn");
    let newgamebtn = document.querySelector("#new-btn");
    let msgcontainer = document.querySelector(".msg-container");
    let msg = document.querySelector("#msg");

    let turnO = true;

    const winningpatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const resetGame = () => {
        turnO = true;
        enableBoxes();
        msgcontainer.classList.add("hide");
        console.log("Game reset");
    };

    boxes.forEach((box) => {
        box.addEventListener("click", () => {
            console.log("Box clicked");
            if (turnO) {
                box.innerText = "O";
                turnO = false;
            } else {
                box.innerText = "X";
                turnO = true;
            }
            box.disabled = true;
            checkWinner();
        });
    });

    const disableBoxes = () => {
        boxes.forEach(box => box.disabled = true);
    };

    const enableBoxes = () => {
        boxes.forEach(box => {
            box.disabled = false;
            box.innerText = "";
        });
    };

    const showWinner = (winner) => {
        msg.innerText = `Congratulations, Winner is ${winner}`;
        msgcontainer.classList.remove("hide");
        disableBoxes();
        startConfetti();
    };

    const checkWinner = () => {
        for (let pattern of winningpatterns) {
            let [pos1, pos2, pos3] = pattern;
            let pos1value = boxes[pos1].innerText;
            let pos2value = boxes[pos2].innerText;
            let pos3value = boxes[pos3].innerText;

            if (pos1value && pos1value === pos2value && pos2value === pos3value) {
                console.log("Winner found:", pos1value);
                showWinner(pos1value);
                return;
            }
        }
        console.log("No winner found");
    };

    const startConfetti = () => {
        console.log("Starting confetti");
        confetti(); // confetti chalu
        setTimeout(() => {
            console.log("Stopping confetti");
            confetti.reset(); // confetti stop after 3 seconds
        }, 3000);
    };

    newgamebtn.addEventListener("click", resetGame);
    resetBtn.addEventListener("click", resetGame);
});
