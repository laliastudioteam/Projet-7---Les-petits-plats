informationBlock = document.getElementById("display-informations");



function changeInformations(text){
    informationBlock.classList.remove("display-change-animation");
    informationBlock.textContent=text;
    void informationBlock.offsetWidth;
    informationBlock.classList.add("display-change-animation");
}
