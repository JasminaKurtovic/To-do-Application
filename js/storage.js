var data= [];
data=getTasksFromStorage();


/**
 * 
 * @param row - gets values for first and second column 
 +              and calls method to store values in array
 */
     function addRowToArray(tr) {
		 
		 let text= $(tr).find('.first').text().trim();
		 let checkboxValue=$(tr).find('.checkbox').is(":checked") ? "checked" : "";
		 	
		 
		 let indexOfElement = indexOfElementInArray(tr);
	
		 //check if task already exist,if not store task,update storage
		
		 if(indexOfElement===-1){
		
	     storeToArray(text,checkboxValue);
		 updateStorage();
	
		 return true;
		 }
		 
		 return false;

    }

function storeToArray(text,checkboxValue){
	
	 
	    data.push({
		"text":text,
		"checkboxValue": checkboxValue
	});
	
}

// after any action empty local storage and record updated array 
 
function updateStorage(){
	
	emptyStorage();
	localStorage.setItem("updateTable", JSON.stringify(data));

}


//get stored tasks	
function getTasksFromStorage() {


	let tasksFromStorage = localStorage.getItem("updateTable");
	
	if (tasksFromStorage) {
		return JSON.parse(tasksFromStorage);
	} else {
		return [];
	}

}


  //delete all tasks from local storage
   function emptyStorage(){
	
	localStorage.removeItem("updateTable");
	
 }