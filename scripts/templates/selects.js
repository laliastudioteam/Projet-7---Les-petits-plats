// Render selects

const selectedIngredients = new Array();
const selectedAppliances = new Array();
const selectedUstensils = new Array();

function clickOutsideSelect(){
    const selectIngredientsList2 = document.querySelectorAll(
		".filters-zone__filter__select"
	);
    selectIngredientsList2.forEach( filter => {
    document.addEventListener('click', (event) => {

        if (!filter.contains(event.target)) {
            const menuList = document.getElementById(filter.getAttribute("data-filter"));
	
            closeSelect(menuList,filter);
        }
    })
      });
}
function clickInsideSelect() {
	const titleFilters = document.querySelectorAll(".filters-zone__filter__select");

	titleFilters.forEach(filter => {
		filter.addEventListener("click", () => {
			const menuList = document.getElementById(filter.getAttribute("data-filter"));
			
				openSelect(menuList,filter);
			
		});
	});
}


function openSelect(select,filter){
	select.classList.add("select-list__active");
	filter.classList.add("filters-zone__filter__select__active");
}
function closeSelect(select,filter){
	select.classList.remove("select-list__active");
	filter.classList.remove("filters-zone__filter__select__active");
}

function setIngredientsListSelect(ingredients) {
	const selectIngredientsList = document.getElementById(
		"select-ingredients-list"
	);
	selectIngredientsList.innerHTML = "";
	ingredients.forEach(ingredient => {
		let ingredientOption = document.createElement("li");
		ingredientOption.classList.add("select-list__list__option");
		
		ingredientOption.textContent = ingredient;
		selectIngredientsList.appendChild(ingredientOption);
	
	});
}

function setUstensilsListSelect(ustensils) {
	const selectUstensilsList = document.getElementById("select-ustensils-list");

	selectUstensilsList.innerHTML = "";
	ustensils.forEach(ustensil => {
		let ustensilOption = document.createElement("li");
		ustensilOption.classList.add("select-list__list__option");
		ustensilOption.textContent = ustensil;
		selectUstensilsList.appendChild(ustensilOption);
	});
}

function setAppliancesListSelect(appliances) {
	const selectAppliancesList = document.getElementById("select-appliances-list");

	selectAppliancesList.innerHTML = "";
	appliances.forEach(appliance => {
		let applianceOption = document.createElement("li");
		applianceOption.classList.add("select-list__list__option");
		applianceOption.textContent = appliance;
		selectAppliancesList.appendChild(applianceOption);
	});
}

// Select list option
function selectOptionClick() {
	const ingredientsOptionListener = document.querySelectorAll(
		"#select-ingredients-list > .select-list__list__option"
	);
	ingredientsOptionListener.forEach(item => {
		item.addEventListener("click", () => {
			console.log("click");
			console.log(item);

			// Detect if ingredient in list
			if (selectedIngredients.indexOf(item) !== -1) {
				console.log("suppression de la classe");
				let index = selectedIngredients.indexOf(item);

				selectedIngredients.splice(index, 1);

				item.classList.remove("select-list__list__option__selected");
			} else {
				console.log("ajout de la classe");
				selectedIngredients.push(item);
				item.classList.add("select-list__list__option__selected");
			}
		});
	});

	const appliancesOptionListener = document.querySelectorAll(
		"#select-appliances-list > .select-list__list__option"
	);
	appliancesOptionListener.forEach(item => {
		item.addEventListener("click", () => {
			console.log("click");
			console.log(item);

			// Detect if ingredient in list
			if (selectedAppliances.indexOf(item) !== -1) {
				console.log("suppression de la classe");
				let index = selectedAppliances.indexOf(item);

				selectedAppliances.splice(index, 1);

				item.classList.remove("select-list__list__option__selected");
			} else {
				console.log("ajout de la classe");
				selectedAppliances.push(item);
				item.classList.add("select-list__list__option__selected");
			}
		});
	});

	const ustensilsOptionListener = document.querySelectorAll(
		"#select-ustensils-list > .select-list__list__option"
	);
	ustensilsOptionListener.forEach(item => {
		item.addEventListener("click", () => {
			console.log("click");
			console.log(item);

			// Detect if ingredient in list
			if (selectedUstensils.indexOf(item) !== -1) {
				console.log("suppression de la classe");
				let index = selectedUstensils.indexOf(item);
				selectedUstensils.splice(index, 1);
				item.classList.remove("select-list__list__option__selected");
			} else {
				console.log("ajout de la classe");
				selectedUstensils.push(item);
				item.classList.add("select-list__list__option__selected");
			}
		});
	});
}

// Funtion search into options
function searchIntoIngredientsOptions() {
	console.log("Search init");

	const inputIngredients = document.getElementById("input-ingredients");
	inputIngredients.addEventListener("input", () => {
		const inputIngredientsValue = inputIngredients.value;
		const inputIngredientsLength = inputIngredientsValue.length;

		if (inputIngredientsLength >= minSearchLength) {
			console.log(
				"Filtrage possible : " + inputIngredientsLength + " caractères entrés"
			);

			console.log("Search for : " + inputIngredientsValue);

			const filteredArr = fullRecipesComponentsListOrdered["ingredients"].filter(
				val => val.toLowerCase().includes(inputIngredientsValue)
			);
			console.log(filteredArr);
			setIngredientsListSelect(filteredArr);
			selectOptionClick();
		} else {
			setIngredientsListSelect(fullRecipesComponentsListOrdered["ingredients"]);
			selectOptionClick();
		}
	});
}

function searchIntoUstensilsOptions() {
	console.log("Search init");

	const inputUstensils = document.getElementById("input-ustensils");
	inputUstensils.addEventListener("input", () => {
		const inputUstensilsValue = inputUstensils.value;
		const inputUstensilsLength = inputUstensilsValue.length;

		if (inputUstensilsLength >= minSearchLength) {
			console.log(
				"Filtrage possible : " + inputUstensilsLength + " caractères entrés"
			);

			console.log("Search for : " + inputUstensilsValue);

			const filteredArr = fullRecipesComponentsListOrdered["ustensils"].filter(
				val => val.toLowerCase().includes(inputUstensilsValue)
			);
			console.log(filteredArr);
			setUstensilsListSelect(filteredArr);
			selectOptionClick();
		} else {
			setUstensilsListSelect(fullRecipesComponentsListOrdered["ustensils"]);
			selectOptionClick();
		}
	});
}

function searchIntoAppliancesOptions() {
	console.log("Search init");

	const inputAppliances = document.getElementById("input-appliances");
	inputAppliances.addEventListener("input", () => {
		const inputAppliancesValue = inputAppliances.value;
		const inputAppliancesLength = inputAppliancesValue.length;

		if (inputAppliancesLength >= minSearchLength) {
			console.log(
				"Filtrage possible : " + inputAppliancesLength + " caractères entrés"
			);

			console.log("Search for : " + inputAppliancesValue);

			const filteredArr = fullRecipesComponentsListOrdered["appliances"].filter(
				val => val.toLowerCase().includes(inputAppliancesValue)
			);
			console.log(filteredArr);
			setAppliancesListSelect(filteredArr);
			selectOptionClick();
		} else {
			setAppliancesListSelect(fullRecipesComponentsListOrdered["appliances"]);
			selectOptionClick();
		}
	});
}