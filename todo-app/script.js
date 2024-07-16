let add = document.querySelector("#add")
let addbtn = document.querySelector("#btn-add")
let h3 = document.querySelector(".h3")
let task = document.querySelector(".task")
let del = document.querySelector(".delete")
let edit = document.querySelector(".edit")

todo();

function todo() {
    addbtn.addEventListener("click", () => {
        if (add.value.trim() === "") {
            alert("Please enter a task");
            return;
        }
        let newH3 = document.createElement("h3");
        newH3.innerText = add.value;
        newH3.classList.add("h3");
        let newBtn1 = document.createElement("button");
        newBtn1.classList.add("edit");
        newBtn1.innerText = "Edit";
        let newBtn2 = document.createElement("button");
        newBtn2.classList.add("delete");
        newBtn2.innerText = "Delete";
        newH3.appendChild(newBtn1);
        newH3.appendChild(newBtn2);
        task.appendChild(newH3);
        add.value = "";
        newBtn2.addEventListener("click", () => {
            task.removeChild(newH3);
        });
        newBtn1.addEventListener("click", () => {
            let newText = prompt("Edit your task:", newH3.firstChild.textContent);
            if (newText) {
                newH3.firstChild.textContent = newText;
            }
        });
    });
}
