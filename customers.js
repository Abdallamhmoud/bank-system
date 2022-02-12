const customerHeads = ["customerTitle", "customerContent", "customerDueDate", "customerType"]
const addCustomer = document.querySelector("#addCustomer") //form   undifed =>false
const datawrap = document.querySelector("#datawrap")
const delAll = document.querySelector("#delAll")
const addTransaction = document.querySelector("#addTransaction")
const createMyOwnElement = (element) => {
    try {
        let myElement = document.createElement(element.element)
        element.parent.appendChild(myElement)
        if (element.textContent) myElement.textContent = element.textContent
        if (element.classes) myElement.classList = element.classes  // <option class> 
        element.attributes.forEach(attribute => {
            myElement.setAttribute(attribute.key, attribute.val)
        })
        return myElement
    }
    catch (e) {
        console.log(e)
    }
}
const elementObjCreator = (element, parent, textContent, classes, attributes) => {
    return { element, parent, textContent, classes, attributes }
}
//read data from localstorage
const readFromStorage = (storageItem) => {
    //check data is json or not // if the returned data array
    let data
    try {
        data = JSON.parse(localStorage.getItem(storageItem)) //tasks = [{task1}, {task2}]
        if (!Array.isArray(data)) throw new Error("Data not array")
    }
    catch (e) {
        data = []
    }
    return data
}
//write data in localstorage
const writeDataToStorage = (storageItem, data) => {
    localStorage.setItem(storageItem, JSON.stringify(data))
}

// draw task
const drawCustomer = (customer,index) => {
    const tr = createMyOwnElement(elementObjCreator("tr", datawrap, null, null, []))
    createMyOwnElement(elementObjCreator("td", tr, customer.id, null, []))
    createMyOwnElement(elementObjCreator("td", tr, customer.customerTitle, null, []))
    createMyOwnElement(elementObjCreator("td", tr, customer.customerContent, null, []))
    createMyOwnElement(elementObjCreator("td", tr, customer.customerType, null, []))
    createMyOwnElement(elementObjCreator("td", tr, customer.customerDueDate, null, []))
    const td = createMyOwnElement(elementObjCreator("td", tr, null, null, []))
    const singleBtn = createMyOwnElement(
        elementObjCreator("button", td, "Show", "btn btn-success mx-3", [])
    )
    singleBtn.addEventListener("click", ()=> showElement(customer))
    const editBtn = createMyOwnElement(
        elementObjCreator("a", td, "Edit", "btn btn-warning mx-3", [{ key: "href", val: "edit.html" }])
    )
    //<button id="delete" class="btn btn-danger mx-3">Delete</a>
    const delBtn = createMyOwnElement(
        elementObjCreator("button", td, "delete", "btn btn-danger mx-3", [])
    )
    delBtn.addEventListener("click", ()=>deleteItem(index))
}
const deleteItem = (index)=>{
    //index
    const customers = readFromStorage("customers")
    customers.splice(index,1)
    writeDataToStorage("customers", customers)
    drawAllCustomers(customers)
}
const showElement=(customer)=>{
    writeDataToStorage("customer", customer)
    window.location.href="single.html"
}
const drawEmptyRow = (colSpan) => {
    const tr = createMyOwnElement(elementObjCreator("tr", datawrap, null, "alert alert-danger", []))
    createMyOwnElement(elementObjCreator("td", tr, "no customers yet", "text-center", [{ key: "colspan", val: colSpan }]))
}
const drawAllCustomers = (customers) => {
    datawrap.textContent = ""
    if (customers.length == 0) drawEmptyRow(6)
    customers.forEach((customer, i) => drawCustomer(customer, i))
}
const drawCustomerTypes = (customerTypes)=>{
    customerTypes.forEach(customerType => {
        createMyOwnElement(elementObjCreator("option", document.querySelector("#tType"), customerType, null, [{ key: "value", val: customerType }]))
    })
}
//add task page
if (addCustomer) {
    const customerTypes = ["t1", "t2", "t3", "t4"]
    drawCustomerTypes(customerTypes)
    addCustomer.addEventListener("submit",  (e)=> {
        e.preventDefault()
        let customer = { id: Date.now(), status: false }
        customerHeads.forEach( (head) => customer[head] = addCustomer.elements[head].value)
        //{taskTitle:'task2'}
        const customers = readFromStorage("customers") // array of tasks [{taskTitle:'task1'}]
        customers.push(customer) // add new task to tasks {}   [{}] [{taskTitle:'task1'},{tsask 2}]
        writeDataToStorage("customers", customers) // [{taskTitle:'task1'}, {task2}]
        addCustomer.reset()
        window.location.href = "index.html"
    })
}
// transactions
const drawTransactionTypes = (TransactionTypes)=>{
    TransactionTypes.forEach(TransactionType => {
        createMyOwnElement(elementObjCreator("option", document.querySelector("#transactionType"), TransactionType, null, [{ key: "value", val: TransactionType }]))
    })
}
let transactions = ""
//transactions
if (addTransaction) {
    const TransactionTypes = ["withdraw","addBalance"]
    drawTransactionTypes(TransactionTypes)
    const Customers = readFromStorage("Customers")
    drawCustomerTypes(Customers)
    addTransaction.addEventListener("submit",  (e)=> {
        e.preventDefault()
        let type =  addTransaction.elements["transactionType"].value
        let balance =  addTransaction.elements["transactionBalance"].value
        let name =addTransaction.elements["customer"].value
        let index = Customers.findIndex(Customer=>name===Customer.CustomerName)
        let Transaction = {
            transactionType:type,
            balance:balance
        }
        Customers[index].transactions.push(Transaction)
        if(type === "addBalance"){
            Customers[index].CustomerBalance += parseInt(balance)  
        }else{
            Customers[index].CustomerBalance -=  balance      
        }
        writeDataToStorage("Customers", Customers) 
        addTransaction.reset()
        window.location.href = "index.html"
    })
}
if (datawrap) {
    drawAllCustomers( readFromStorage("customers") )
    delAll.addEventListener("click", (event) => {
        writeDataToStorage("customers", [])
        drawAllCustomers([])
    })
}
const singlewrap = document.querySelector("#singlewrap")
if(singlewrap){
    const customer = JSON.parse(localStorage.getItem("customer"))
    singlewrap.innerHTML = `
    <div class="col-md-6 col-12 border border-2 border-primary">
    <h5>ID</h5>
    <p>${customer.id}</p>
    </div>
    <div class="col-md-6 col-12 border border-2 border-primary">
    <h5>Title</h5>
    <p>${customer.customerTitle}</p>
    </div>
    <div class="col-md-6 col-12 border border-2 border-primary">
    <h5>Type</h5>
    <p>${customer.customerType}</p>
    </div>
    <div class="col-md-6 col-12 border border-2 border-primary">
    <h5>Status</h5>
    <p>${customer.status} </p>
    </div>
    <div class="col-md-12 col-12  border border-2 border-primary">
    <h5>Due Date</h5>
    <p>${customer.customerDueDate}</p>
    </div>
    <div class="col-md-12 col-12  border border-2 border-primary">
    <h5>Content</h5>
    <p>${customer.customerContent}</p>
    </div> `
}

