// Render selects

const selectedIngredients = new Array();
const selectedAppliances = new Array();
const selectedUstensils = new Array();

const titleSelectIngredients = "Ingredients";
const titleSelectAppliances = "Appareils";
const titleSelectUstensils = "Ustensiles";

function clickOutsideSelect() {
	const selectIngredientsList2 = document.querySelectorAll(
		".filters-zone__filter__select"
	);
	selectIngredientsList2.forEach(filter => {
		document.addEventListener("click", event => {
			if (!filter.contains(event.target)) {
				const menuList = document.getElementById(filter.getAttribute("data-filter"));

				closeSelect(menuList, filter);
			}
		});
	});
}

function clickInsideSelect() {
	const titleFilters = document.querySelectorAll(".filters-zone__filter__select");

	titleFilters.forEach(filter => {
		filter.addEventListener("click", () => {
			const menuList = document.getElementById(filter.getAttribute("data-filter"));

			openSelect(menuList, filter);
		});
	});
}

function openSelect(select, filter) {
	select.classList.add("select-list__active");
	filter.classList.add("filters-zone__filter__select__active");
}
function closeSelect(select, filter) {
	select.classList.remove("select-list__active");
	filter.classList.remove("filters-zone__filter__select__active");
}

function setIngredientsListSelect(ingredients) {
	const selectIngredientsList = document.getElementById(
		"select-ingredients-list"
	);
	const selectIngredientsListTitle = document.getElementById(
		"title-ingredients-filter"
	);

	selectIngredientsList.innerHTML = "";
	ingredients.forEach(ingredient => {
		let ingredientOption = document.createElement("li");
		ingredientOption.classList.add("select-list__list__option");

		if (selectedIngredients.indexOf(ingredient) !== -1) {
			ingredientOption.classList.add("select-list__list__option__selected");
		}
		ingredientOption.setAttribute("data-type", "ingredient");
		ingredientOption.setAttribute("data-content", ingredient);

		ingredientOption.textContent = ingredient;
		selectIngredientsList.appendChild(ingredientOption);
	});

	selectIngredientsListTitle.textContent=titleSelectIngredients+" ("+ingredients.length+")";
}

function setUstensilsListSelect(ustensils) {
	const selectUstensilsList = document.getElementById("select-ustensils-list");

	const selectUstentsilsListTitle = document.getElementById(
		"title-ustensils-filter"
	);

	selectUstensilsList.innerHTML = "";
	ustensils.forEach(ustensil => {
		let ustensilOption = document.createElement("li");
		ustensilOption.classList.add("select-list__list__option");

		if (selectedUstensils.indexOf(ustensil) !== -1) {
			ustensilOption.classList.add("select-list__list__option__selected");
		}

		ustensilOption.setAttribute("data-type", "ustensil");
		ustensilOption.setAttribute("data-content", ustensil);
		ustensilOption.textContent = ustensil;
		selectUstensilsList.appendChild(ustensilOption);
	});

	selectUstentsilsListTitle.textContent=titleSelectUstensils+" ("+ustensils.length+")";
}

function setAppliancesListSelect(appliances) {
	const selectAppliancesList = document.getElementById("select-appliances-list");

	const selectAppliancesListTitle = document.getElementById(
		"title-appliances-filter"
	);

	selectAppliancesList.innerHTML = "";
	appliances.forEach(appliance => {
		let applianceOption = document.createElement("li");
		applianceOption.classList.add("select-list__list__option");
		if (selectedAppliances.indexOf(appliance) !== -1) {
			applianceOption.classList.add("select-list__list__option__selected");
		}
		applianceOption.setAttribute("data-type", "appliance");
		applianceOption.setAttribute("data-content", appliance);

		applianceOption.textContent = appliance;
		selectAppliancesList.appendChild(applianceOption);
	});

	selectAppliancesListTitle.textContent=titleSelectAppliances+" ("+appliances.length+")";

}

// Select list option
function selectOptionClick() {
	const ingredientsOptionListener = document.querySelectorAll(
		"#select-ingredients-list > .select-list__list__option"
	);

	// Ingredient Listener
	ingredientsOptionListener.forEach(item => {
		item.addEventListener("click", optionClickAction, false);
	});
	// Appliances listener
	const appliancesOptionListener = document.querySelectorAll(
		"#select-appliances-list > .select-list__list__option"
	);

	appliancesOptionListener.forEach(item => {
		item.addEventListener("click", optionClickAction, false);
	});

	const ustensilsOptionListener = document.querySelectorAll(
		"#select-ustensils-list > .select-list__list__option"
	);
	ustensilsOptionListener.forEach(item => {
		item.addEventListener("click", optionClickAction, false);
	});
}

// Funtion search into options
function searchIntoIngredientsOptions() {
	consoleOutput("Ingredient Search listener init",1,1);

	const inputIngredients = document.getElementById("input-ingredients");
	inputIngredients.addEventListener("input", () => {
		const inputIngredientsValue = inputIngredients.value;
		const inputIngredientsLength = inputIngredientsValue.length;

		if (inputIngredientsLength >= minSearchLength) {
			consoleOutput(
				"Filtrage possible : " + inputIngredientsLength + " caractères entrés"
				,1,1
			);

			consoleOutput("Search for : " + inputIngredientsValue);

			const filteredArr = fullRecipesComponentsListOrdered["ingredients"].filter(
				val => val.toLowerCase().includes(inputIngredientsValue)
			);
			consoleOutput(filteredArr);
			setIngredientsListSelect(filteredArr);
			selectOptionClick();
		} else {
			setIngredientsListSelect(fullRecipesComponentsListOrdered["ingredients"]);
			selectOptionClick();
		}
	});
}

function optionClickAction() {
	consoleOutput(this,1,1);

	const type = this.getAttribute("data-type");
	const content = this.getAttribute("data-content");

	if (type == "ingredient") {
		// Detect if ingredient in list
		if (selectedIngredients.indexOf(content) !== -1) {
			let index = selectedIngredients.indexOf(content);
			selectedIngredients.splice(index, 1);
			this.classList.remove("select-list__list__option__selected");
		
			changeInformations(content+ " supprimé des filtres d'ingredients");
			closeBadge({type: type, text: content});
		} else {
			selectedIngredients.push(content);
			this.classList.add("select-list__list__option__selected");
			changeInformations(content+ " ajouté aux filtres d'ingredients");
			createBadge({type: type, text: content});
		}
	} else if (type == "appliance") {
		// Detect if appliance in list
		if (selectedAppliances.indexOf(content) !== -1) {
			let index = selectedAppliances.indexOf(content);
			selectedAppliances.splice(index, 1);
			this.classList.remove("select-list__list__option__selected");
			changeInformations(content+ " supprimé des filtres d'appareils");
			closeBadge({type: type, text: content});
		} else {
			selectedAppliances.push(content);
			this.classList.add("select-list__list__option__selected");
			changeInformations(content+ " ajouté aux filtres d'appareils");
			createBadge({type: type, text: content});
		}
	} else if (type == "ustensil") {
		// Detect if ustensil in list
		if (selectedUstensils.indexOf(content) !== -1) {
			let index = selectedUstensils.indexOf(content);
			selectedUstensils.splice(index, 1);
			this.classList.remove("select-list__list__option__selected");
			changeInformations(content+ " supprimé des filtres d'ustensils");
			closeBadge({type: type, text: content});
		} else {
			selectedUstensils.push(content);
			this.classList.add("select-list__list__option__selected");
			changeInformations(content+ " ajouté aux filtres d'ustensils");
			createBadge({type: type, text: content});
		}
	}
	search();
}

function clearSelectOptionsListeners(){
consoleOutput('remove all the listeners',1,1);
	const ingredientsOptionListener = document.querySelectorAll(
		"#select-ingredients-list > .select-list__list__option"
	);

	// Ingredient Listener REmover
	ingredientsOptionListener.forEach(item => {
		consoleOutput("item",1,1);
		item.removeEventListener("click", optionClickAction);
	});
	// Appliances listener
	const appliancesOptionListener = document.querySelectorAll(
		"#select-appliances-list > .select-list__list__option"
	);

	appliancesOptionListener.forEach(item => {
		item.removeEventListener("click", optionClickAction);
	});

	const ustensilsOptionListener = document.querySelectorAll(
		"#select-ustensils-list > .select-list__list__option"
	);
	ustensilsOptionListener.forEach(item => {
		item.removeEventListener("click", optionClickAction);
	});

}

function searchIntoUstensilsOptions() {
	consoleOutput("Search init",1,1);

	const inputUstensils = document.getElementById("input-ustensils");
	inputUstensils.addEventListener("input", () => {
		const inputUstensilsValue = inputUstensils.value;
		const inputUstensilsLength = inputUstensilsValue.length;

		if (inputUstensilsLength >= minSearchLength) {
			consoleOutput(
				"Filtrage possible : " + inputUstensilsLength + " caractères entrés"
				,1,1
			);

			consoleOutput("Search for : " + inputUstensilsValue,1,1);

			const filteredArr = fullRecipesComponentsListOrdered["ustensils"].filter(val =>
				val.toLowerCase().includes(inputUstensilsValue)
			);
			consoleOutput(filteredArr,1,1);
			setUstensilsListSelect(filteredArr);
			selectOptionClick();
		} else {
			setUstensilsListSelect(fullRecipesComponentsListOrdered["ustensils"]);
			selectOptionClick();
		}
	});
}

function searchIntoAppliancesOptions() {
	consoleOutput("Search init",1,1);

	const inputAppliances = document.getElementById("input-appliances");
	inputAppliances.addEventListener("input", () => {
		const inputAppliancesValue = inputAppliances.value;
		const inputAppliancesLength = inputAppliancesValue.length;

		if (inputAppliancesLength >= minSearchLength) {
			consoleOutput(
				"Filtrage possible : " + inputAppliancesLength + " caractères entrés"
				,1,1
			);

			consoleOutput("Search for : " + inputAppliancesValue,1,1);

			const filteredArr = fullRecipesComponentsListOrdered["appliances"].filter(val =>
				val.toLowerCase().includes(inputAppliancesValue)
			);
			consoleOutput(filteredArr,1,1);
			setAppliancesListSelect(filteredArr);
			selectOptionClick();
		} else {
			setAppliancesListSelect(fullRecipesComponentsListOrdered["appliances"]);
			selectOptionClick();
		}
	});
}

function checkAllSelectList() {
	consoleOutput(selectedIngredients,1,1);
	consoleOutput(selectedAppliances,1,1);
	consoleOutput(selectedUstensils,1,1);
}
