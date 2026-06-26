document.addEventListener("DOMContentLoaded" , ()=>{
    const todoinput = document.getElementById("addtask");
    const addtaskbutton = document.getElementById("taskbutton") ;
    const todolist = document.getElementById("todolist") ; 

    let tasks ; 
    try{
        JSON.parse(localStorage.getItem("tasks"))|| [] ; 
    }
    catch{
        tasks=[] ;
    }
    tasks.forEach(task => render(task) ) ; 
    
    addtaskbutton.addEventListener("click" , ()=>{
        const textInput = todoinput.value.trim() ; 
        if(textInput==="") return ; 

        const newtask={
            id: Date.now() ,
            text: textInput ,
            completed : false  
        }

        tasks.push(newtask) ; 
        savetask() ; 
        render(newtask) ; 
        todoinput.value="" ;  
    }) ; 
    function savetask(){
        localStorage.setItem("tasks" , JSON.stringify(tasks))
    }
    function render(task){
        const li = document.createElement("li") ; 
        li.setAttribute("data-id" , task.id) ; 
        if(task.completed) li.classList.add("completed") ;
        li.innerHTML=`<span>${task.text}</span> 
        <button>delete</button>` ; 
        li.addEventListener("click" , (e)=>{
            if(e.target.tagName === "BUTTON") return ; 
            task.completed = !task.completed ; 
            li.classList.toggle("completed") ; 
            savetask() ; 
        })
        li.querySelector("button").addEventListener("click", (e)=>{
            e.stopPropagation() ; 
            tasks = tasks.filter((t)=> t.id!==task.id) ; 
            li.remove() ; 
            savetask() ; 
        }) ; 
        todolist.appendChild(li) ; 

    }

})