let n = 0;
let tc = 0;
let tcp = 0;
let name1 = "";
let dept = "";

//function to get count number 
function count(){
    n = parseInt(Math.abs(document.getElementById("count").value));
    document.querySelectorAll(".hide2").forEach( (ele) => {
        ele.style.display = "none";
    });
};
function create(type, tag, inpttype){
    for(let i = 1; i<=n; i++){
        const newElement = document.createElement(`${tag}`);
        newElement.setAttribute("id", `${type}${i}`);
        newElement.setAttribute("class", `${type}`);
        newElement.setAttribute("type", `${inpttype}`);
        newElement.setAttribute("placeholder", `${type} ${i}`);
        document.getElementById(`${type}`).appendChild(newElement);
     };
}

//function to create elements
function step1(){
    name1 = document.getElementById("name").value;
    dept = document.getElementById("dept").value;
    const newElname1 = document.createElement("p");
    newElname1.setAttribute("id", "name1");
    newElname1.innerHTML = `Name - ${name1}`;
    const newElname2 = document.createElement("p");
    newElname2.setAttribute("id", "dept1");
    newElname2.innerHTML = `Department - ${dept}`;
    document.getElementById("nameHolder").appendChild(newElname1);
    document.getElementById("nameHolder").appendChild(newElname2);
    document.getElementById("body").style.justifyContent = "flex-start";
    document.getElementById("body").style.paddingTop = "100px";
    document.getElementById("tableHolder").style.display = "flex";
    document.getElementById("resHolder").style.display = "flex";
    count();
    create("Subject", "input", "text");
    create("Credit", "input", "number");
    create("Point", "input", "number");
    for(let i = 1; i<=n; i++){
        const newElement = document.createElement("p");
        newElement.setAttribute("id", `cp${i}`);
        newElement.setAttribute("class", "creditPoints");
        document.getElementById(`creditPoints`).appendChild(newElement);
     };
    const newButton = document.createElement("button");
    newButton.setAttribute("id", "calcbtn");
    newButton.innerText = "Submit";
    newButton.setAttribute("onClick", "calculation()");
    document.getElementById("body").appendChild(newButton);
   
};

//function for calculations
let resgpa = "";
function calculation(){
    for(let i = 1; i<=n; i++){
        document.getElementById(`cp${i}`).innerHTML = document.getElementById(`Credit${i}`).value*document.getElementById(`Point${i}`).value;
    };
    for(i=1; i<=n; i++){
        tc = tc + parseFloat(document.getElementById(`Credit${i}`).value);
        tcp = tcp + parseFloat(document.getElementById(`cp${i}`).innerHTML);
    };
    document.getElementById("res1").innerHTML = `Total credits -> ${tc}`;
    document.getElementById("res2").innerHTML = `Total credit points -> ${tcp}`;
    resgpa = tcp/tc;
    resgpa = Math.round(resgpa*100)/100;
    document.getElementById("res3").innerHTML = `Your SGPA is -> ${resgpa}`;
    document.getElementById("calcbtn").style.display = "none";
    document.querySelectorAll(".Subject").forEach((element)=>{
        element.setAttribute("disabled", "true");
    });
    document.querySelectorAll(".Credit").forEach((element)=>{
        element.setAttribute("disabled", "true");
    });
    document.querySelectorAll(".Point").forEach((element)=>{
        element.setAttribute("disabled", "true");
    });
    const prnt = document.createElement("button");
    prnt.setAttribute("id", "print");
    prnt.setAttribute("onClick", "prnt()");
    prnt.innerHTML = "Print this page";
    document.getElementById("resHolder").appendChild(prnt);
};

//print function
function prnt(){
    const printWindow = window.open("", "", "width = 1240,height= 1754");
    printWindow.document.write(`
        <!DOCTYPE html>
<html lang="en">
<head>
    <title>SGPA Calculator by Riyan K.</title>
</head>
<style>
    body{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    table{
        width: 90%;
        border: 1px black solid;
        padding: 0;
        margin: 0;
    }
    td{
        border: 1px black solid;
        margin: 0;
        padding: 1px 1px 1px 8px;
    }
    th{
        border: 1px black solid; 
    }
    .hldr{
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        width: 90%;
        height: 32px;
        border: 1px black solid; 
        border-bottom: 0px;
    }
    #nm, #dp{
        margin: 8px 0px 0px 0px;
        padding: 0;
    }
</style>
<body>
    <h3>Marksheet</h3>
    <div class="hldr">
        <p id="nm">Name - Riyan Kundu</p>
        <p id="dp">Department - ECE</p>
    </div>
    <table id="table">
        <tr>
            <th>Subject</th>
            <th>Credit</th>
            <th>Point</th>
            <th>Credit Points</th>
        </tr>
    </table>
</body>
</html>
        `);
    for(let i=1; i<=n; i++){
        const row = printWindow.document.createElement("tr");
    const data1 = printWindow.document.createElement("td");
    const data2 = printWindow.document.createElement("td");
    const data3 = printWindow.document.createElement("td");
    const data4 = printWindow.document.createElement("td");
    data2.style.textAlign = "center";
    data3.style.textAlign = "center";
    data4.style.textAlign = "center";
    data1.innerHTML = document.getElementById(`Subject${i}`).value;
    data2.innerHTML = document.getElementById(`Credit${i}`).value;
    data3.innerHTML = document.getElementById(`Point${i}`).value;
    data4.innerHTML = document.getElementById(`cp${i}`).innerHTML;
    row.appendChild(data1);
    row.appendChild(data2);
    row.appendChild(data3);
    row.appendChild(data4);
    printWindow.document.getElementById("table").appendChild(row);
    };
    const row2 = printWindow.document.createElement("tr");
    const data5 = printWindow.document.createElement("td");
    const data6 = printWindow.document.createElement("td");
    data5.style.textAlign = "center";
    data6.style.textAlign = "center";
    data5.setAttribute("colspan","2");
    data6.setAttribute("colspan","2");
    data5.innerHTML = `Total credits are ${tc}`;
    data6.innerHTML = `Total credit points are ${tcp}`;
    row2.appendChild(data5);
    row2.appendChild(data6);
    printWindow.document.getElementById("table").appendChild(row2);
    const row3 = printWindow.document.createElement("tr");
    const data7 = printWindow.document.createElement("td");
    data7.setAttribute("colspan","4");
    data7.innerHTML = `Your SGPA is ${resgpa}`;
    data7.style.paddingLeft = "24px";
    row3.appendChild(data7);
    printWindow.document.getElementById("table").appendChild(row3);
    printWindow.print();
};