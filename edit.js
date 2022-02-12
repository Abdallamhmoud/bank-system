// const customerTypes = ["t1", "t2", "t3", "t4"]
// const customerHeads = ["customerTitle", "customerContent", "customerDueDate", "customerType"]
// const createMyOwnElement = (element)=>{
//     try{
//         let myElement = document.createElement(element.element)
//         element.parent.appendChild(myElement)
//         if(element.textContent) myElement.textContent=element.textContent
//         if(element.classes) myElement.classList=element.classes  // <option class> 
//         element.attributes.forEach(attribute=>{
//             myElement.setAttribute(attribute.key, attribute.val)
//         })
//         return myElement
//     }
//     catch(e){
//         console.log(e)
//     }
// }

// customerTypes.forEach(customerType=>{
//     let ele= {
//         element:"option",
//         parent:document.querySelector("#tType"),
//         textContent:customerType,
//         classes:null,
//         attributes:[ {key:"value", val:customerType}]
//     }
//     createMyOwnElement(ele)
// })



// const addCustomer= document.querySelector("#addCustomer")

// addCustomer.addEventListener("submit", function(e){
//     e.preventDefault()
//     let customer = { id: Date.now() }
//     customerHeads.forEach( head => customer[head]= addCustomer.elements[head].value)
//     console.log(customer)
//     let d=localStorage.setItem("customer",JSON.stringify(customer));
// })

// const readStorage = (localItem) => {
//     const asd= JSON.parse(localStorage.setItem())
// }

// const writeDataToStorage = ( data ) => {
//     try{
//         localStorage.setItem("task", JSON.stringify(data))
//     }
//     catch(e){
//         console.log(e)
//     }
    
// }



