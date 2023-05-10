const btn = document.querySelector(".add-btn") 
const inputTitleElem = document.querySelector(".todo-input")
const todoLists = document.querySelector(".todo-list");
const inputContentElem = document.querySelector(".todo-content")
let data;
btn.addEventListener('click',async e=>{
    e.preventDefault();
    data = await addTodo();
    render()
})
document.addEventListener("DOMContentLoaded", async ()=>{
    const response = await fetch("/api") 
    const res = await response.json();
    data=res;
    if(data.length){
        render();
    }else{
        const elem = document.createElement("p")
        elem.classList.add("text-white","font-bold")
        elem.textContent = "No content to display "
        todoLists.appendChild(elem)
    }
})

async function addTodo(){
    if(inputTitleElem.value && inputContentElem.value){
        const data={
            title:inputTitleElem.value,
            content:inputContentElem.value,
            done:false
        }
        const result = await fetch("/api",{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(data)
        })
        inputTitleElem.value = ''
        inputContentElem.value= ''
        return(await result.json())
    }
}

function render() {
    todoLists.innerHTML = '';
    for(const i of data){
        const elem = createListItem(i);
        todoLists.appendChild(elem);
    }
}

async function deleteItem(id) {
    const data ={
        itemId:id
    }
    const result = await fetch("/api",{
        method:"DELETE",
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    return (await result.json());
}

async function markAsDone(id){
    const data ={
        itemId:id
    }
    const result = await fetch("/api",{
        method:"PATCH",
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    return (await result.json());
}

function createListItem({content,title,done,_id}) {
    const outer = document.createElement("div")
    outer.classList.add("flex","items-center","justify-between")
    const inner = document.createElement("div")
    inner.classList.add("flex","flex-col","gap-3")
    const para = document.createElement("p")
    para.textContent = title;
    para.classList.add("text-[#5e5e64]")
    const head = document.createElement("h3")
    head.classList.add("text-white")
    head.textContent = content;
    const button = document.createElement("button");
    button.classList.add("mr-2","text-white", "bg-[#414052]", "px-3", "py-2", "rounded-lg");
    button.textContent="done"
    const div = document.createElement("div")
    button.addEventListener("click",async()=>{
       data = await markAsDone(_id)
       render()
    })
    const delBtn = document.createElement("button");
    delBtn.textContent = '🗑️'
    delBtn.addEventListener("click",async()=>{
        data = await deleteItem(_id)
        render()
    })
    if(done){
        head.classList.add("line-through")
        para.classList.add("line-through")
    }
    //add
    inner.appendChild(para)
    inner.appendChild(head)
    outer.appendChild(inner)
    div.appendChild(button)
    div.appendChild(delBtn)
    outer.appendChild(div)
    return outer
}