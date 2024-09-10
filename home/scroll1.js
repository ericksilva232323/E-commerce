// scroll view

let count1 = 5;
document.getElementById("radio5").checked = true;

setInterval( function(){
    nextImage();
}, 5000)

function nextImage(){
    count1++;
    if(count1>8){
        count1 = 5;
    }

    document.getElementById("radio"+count1).checked = true;

}