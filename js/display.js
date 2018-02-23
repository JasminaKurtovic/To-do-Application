//function for creating row with new task
function createRow(text, checkboxStatus, funcDel, funcCompl) {

	//create new row 
	let row = $("<tr></tr>");


	//create first column and append to row
	row.append(createElement('<td>', 'first', text));


	//create secon column
	let secondCol = createElement('<td>', 'actions', "");
	let input = createElement('<input>', 'complete').attr(
		'type',
		'checkbox'
	);


	if (checkboxStatus === "checked") {
		input.prop(checkboxStatus, true);
	}
	//bind event to new rows
	$(input).on('change', funcCompl);


	secondCol.append(input);
	row.append(secondCol);

	//create third column
	let thirdCol = createElement('<td>', 'actions');
	let delBtn = createElement('<button>', 'delete').attr('type', 'button');
	let trash = createElement('<i>', 'fas fa-trash-alt');


	//bind event to new rows
	delBtn.on('click', funcDel);


	delBtn.append(trash);
	thirdCol.append(delBtn);
	row.append(thirdCol);

	setRowBackground(checkboxStatus, row);


	//add new row to the table
	return row;

}




function createElement(elem, className, text) {

	let newElement = $(elem).addClass(className).text(text);

	return newElement;
}

//change color for finished task
function setRowBackground(isCheck, changedRow) {


	if (isCheck) {
		changedRow.addClass('table-success');
	} else {
		changedRow.removeClass('table-success');
	}
}

//refresh
function refreshTable() {

	fillTable();

}


//fill table
function fillTable() {


	for (let i = 0; i < data.length; i++) {

		let firstTd = data[i]["text"];

		let secondTd = data[i]["checkboxValue"];


		let newRow = createRow(firstTd, secondTd, deleteRow, completeTask);
		tbody.append(newRow);

	}

}


//returns row index from data array

function indexOfElementInArray(row) {


	let text = $(row).find('.first').text().trim();


	for (let i = 0; i < data.length; i++) {

		if (data[i]["text"].toLowerCase() === text.toLowerCase()) {
			return i;
		}
	}

	return -1;

}


//deletes row from data array and calls method to update local storage
function removeFromDataArray(row) {


	let indexOfElement = indexOfElementInArray(row);

	if (indexOfElement !== -1) {
		data.splice(indexOfElement, 1);

	}

	updateStorage();

}

//if checkbox is changed,updates array and local storage
function setChangeToDataArray(row, isCheck) {


	let indexOfElement = indexOfElementInArray(row);

	if (indexOfElement !== -1) {

		data[indexOfElement]["checkboxValue"] = (isCheck) ? "checked" : "";


		updateStorage();


	}

}
