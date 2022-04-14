//Modals and Buttons
const modal_add_room = document.getElementById("modal_add_room");
const btn_open_add_room_modal = document.getElementById("btn_open_add_room_modal");
const dropdown_room_type_to_add = document.getElementById("dropdown_room_type_to_add");

const modal_choose_template = document.getElementById("modal_choose_template");
const btn_choose_a_template = document.getElementById("btn_choose_a_template");

//Activate
btn_open_add_room_modal.onclick = function() {
  modal_add_room.style.display = "flex";
}

btn_choose_a_template.onclick = function() {
  modal_choose_template.style.display = "flex";
}

//Closing
window.onclick = function(event) {
  if (event.target == modal_add_room) {
    modal_add_room.style.display = "none";
  }
  else if (event.target == modal_choose_template) {
    modal_choose_template.style.display = "none";
  }
}