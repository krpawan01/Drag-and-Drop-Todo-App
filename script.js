const imgContainer = document.getElementById('img-container');
const inputFile = document.getElementById('input-file');
const dropArea = document.getElementById('drop-area');

inputFile.addEventListener('change', uploadImg);

function uploadImg() {
    const imageLink = URL.createObjectURL(inputFile.files[0]);
    const todoItem = document.createElement('div');
    todoItem.className = "todo-item";
    todoItem.innerHTML = `
    <img src="${imageLink}" class="image" alt="${inputFile.files[0].name}">
    <input type="text" class="img-name" value="${inputFile.files[0].name}" disabled>
    <button class="edit-btn">Edit</button>
    <button class="delete-btn">Delete</button>
    `;
    imgContainer.appendChild(todoItem);
}

dropArea.addEventListener("dragover", (event) => {
    event.preventDefault();
});

dropArea.addEventListener("drop", (event) => {
    event.preventDefault();
    inputFile.files = event.dataTransfer.files;
    uploadImg();
});

imgContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains('edit-btn')) {
        const todoItem = event.target.closest('.todo-item');
        const imgNameInput = todoItem.querySelector('.img-name');

        if (event.target.textContent === 'Edit') {
            imgNameInput.disabled = false;
            imgNameInput.focus();
            event.target.textContent = 'Save';
        } else {
            imgNameInput.disabled = true;
            event.target.textContent = 'Edit';
            
        }
    } else if (event.target.classList.contains('delete-btn')) {
        const todoItem = event.target.closest('.todo-item');
        imgContainer.removeChild(todoItem);
    }
});
