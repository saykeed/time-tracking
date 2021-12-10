
let databox = document.querySelector("#data");
let dailybtn = document.querySelector("#daily");
let weeklybtn = document.querySelector("#weekly");
let monthlybtn = document.querySelector("#monthly");
let allBtn = document.querySelectorAll("#button p");

let showData = function (x) {

    for (let i = 0; i < allBtn.length; i++) {
        allBtn[i].style.color = "white";
     }

    let template = "";
    let timeframe = "";
    let currentHours = "";
    let prevHours = "";
    
    

    if (x === "daily") {
        dailybtn.style.color = "red";
        timeframe += 'Yesterday';
    } else if (x === "weekly") {
        weeklybtn.style.color = "red";
        timeframe += 'Last Week';  
    } else if (x === "monthly") {
        monthlybtn.style.color = "red";
        timeframe += 'Last Month';  
    }

    let req = new XMLHttpRequest();
    req.open("GET", "json/data.json");
    
    req.onload = function() {
        
        let ourData = JSON.parse(req.responseText);
        
        

        ourData.forEach( (data)  => {
            if (data.timeframes[x].current >= 2) {
                currentHours = "hrs";
            } else{
                currentHours = "hr"
            }

            if (data.timeframes[x].previous >= 2) {
                prevHours = "hrs";
            } else {
                prevHours = "hr"
            }

             template += `
                <div id="backdiv">
                    <div id="timedata">
                        <p id="firstp">${data.title} <span><img src="images/icon-ellipsis.svg"></span></p>
                        <div id="difference">
                            <h1>${data.timeframes[x].current}${currentHours}</h1>
                            <p>${timeframe} - ${data.timeframes[x].previous}${prevHours}</p>
                        </div>
                    </div>
                </div>
             `
        });
        databox.innerHTML = template;
    }
    

    req.send();
}

window.onload = showData("weekly");

/*


<div>
    <p>${data.title} <span><img src="images/icon-ellipsis.svg"></span></p>
    <h1>${data.timeframes.weekly.current}hrs</h1>
    <p>x</p>
</div>

*/