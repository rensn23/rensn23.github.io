var ajaxContainer = document.getElementById("change_text");

function loadNewText() {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
        ajaxContainer.innerHTML = this.responseText;
        }
    };
    request.open('GET', "https://learnwebcode.github.io/json-example/animals-1.json");
    request.send();
}