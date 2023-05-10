const btn = document.querySelector(".add-btn") 
const inputTitleElem = document.querySelector(".todo-input")
const inputContentElem = document.querySelector(".todo-content")
btn.addEventListener('click',deleteItem)
// async(e)=>{
//     e.preventDefault();
//     if(inputTitleElem.value && inputContentElem.value){
//         const data={
//             title:inputTitleElem.value,
//             content:inputContentElem.value,
//             done:false
//         }

//         const result = await fetch("/api",{
//             method:'POST',
//             headers:{
//                 'Content-Type': 'application/json'
//               },
//             body: JSON.stringify(data)
//         })
//         console.log(await result.json());
//     }
// }
window.onload = async ()=>{
    const response = await fetch("/api") 
    console.log(await response.json());
}

async function deleteItem(e) {
    e.preventDefault()
    const data ={
        itemId:"645af2d0955c25b113e79f20"
    }
    const result = await fetch("/api",{
        method:"DELETE",
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    console.log(await result.json());
}