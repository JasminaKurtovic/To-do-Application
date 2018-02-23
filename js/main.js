const tbody = $("tbody");

//button for exporting data
var exportBtn=$("#btnExport");

$(document).ready(function () {

	let deleteBtn = $(".delete");
	let completeBtn = $(".complete");

	deleteBtn.on('click', deleteRow);
	completeBtn.on('change', completeTask);



	refreshTable();


	//create new row on submit
	$("#form-input").on('submit', (e) => {


		e.preventDefault();

		let text = $("#input").val();
		$("#input").val("");
		const newRow = createRow(text, "", deleteRow, completeTask);
		let indexOfElement = indexOfElementInArray(newRow);

		//append row if doesn't exist
		if (indexOfElement === -1) {
			tbody.append(newRow);
			addRowToArray(newRow);
		}
	});

});


//event on delet button,delets row
function deleteRow() {

	let btn = $(this);
	let td = $(btn.parent());
	let rowForDelete = td.parent();

	//update array
	removeFromDataArray(rowForDelete);

	//update page
	rowForDelete.remove();

	//update local storage
	updateStorage();

}

//event on checkbox,if checked sets color of the row to green
function completeTask() {


	let checkbox = $(this);
	let td = $(checkbox.parent());
	let rowComplete = $(td.parent());


	let isCheck = checkbox.is(":checked");

	//set row color based on status of the checkbox
	setRowBackground(isCheck, rowComplete);

	//update checckbox status in array
	setChangeToDataArray(rowComplete, isCheck);

	updateStorage();

}

//event on clear button,removes all datas from page,local storage and array
$("#clearList").on('click', function () {

	emptyStorage();

	//clear page
	$(".table tr").each(function (row, tr) {

		$(tr).find('.delete').trigger('click');

	});

});


