
let databox = document.querySelector("#data");


let showData = function (x) {
    let template = "";
    let timeframe = "";
    let req = new XMLHttpRequest();
    req.open("GET", "json/data.json");
    
    req.onload = function() {
        
        let ourData = JSON.parse(req.responseText);
        
        ourData.forEach( (data)  => {
            if (x === "daily") {
                timeframe += 'Yesterday';
            } else if (x === "weekly") {
                timeframe += 'Last Week';  
            } else if (x === "monthly") {
                timeframe += 'Last Month';  
            }
            
             template += `
                <div id="backdiv">
                    <div id="timedata">
                        <p id="firstp">${data.title} <span><img src="images/icon-ellipsis.svg"></span></p>
                        <div id="difference">
                            <h1>${data.timeframes[x].current}hrs</h1>
                            <p>${timeframe} - ${data.timeframes[x].previous}hrs</p>
                        </div>
                    </div>
                </div>
             `
        });
        databox.innerHTML = template;
    }
    

    req.send();
}

window.onload = showData("monthly");

/*


<div>
    <p>${data.title} <span><img src="images/icon-ellipsis.svg"></span></p>
    <h1>${data.timeframes.weekly.current}hrs</h1>
    <p>x</p>
</div>

*/