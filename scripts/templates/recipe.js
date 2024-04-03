function recipeTemplate(data) {
	const {
		appliance,
		description,
		id,
		image,
		ingredients,
		name,
		serving,
		time,
		ustensils,
	} = data;

	function getRecipeCardDOM() {
		const articleRecipe = document.createElement("article");
		articleRecipe.classList.add("card-recipe");

		/* Recipe Header Bloc */
		const headerRecipe = document.createElement("div");
		headerRecipe.classList.add("card-recipe__header");
		articleRecipe.appendChild(headerRecipe);

		/* Recipe Header Picture Bloc */
		const pictureRecipe = document.createElement("div");
		pictureRecipe.classList.add("card-recipe__header__picture");
		pictureRecipe.setAttribute(
			"style",
			"background-image:url('assets/img/recipes/" + image + "')"
		);
		headerRecipe.appendChild(pictureRecipe);

		/* Recipe Time Bloc */
		const timeRecipe = document.createElement("div");
		timeRecipe.classList.add("card-recipe__time");
		timeRecipe.textContent = time + extensionTime;
		articleRecipe.appendChild(timeRecipe);

		/* Recipe Content Bloc */
		const contentRecipe = document.createElement("div");
		contentRecipe.classList.add("card-recipe__content");
		articleRecipe.appendChild(contentRecipe);

		/* Recipe Title Content Bloc */
		const titleRecipe = document.createElement("div");
		titleRecipe.classList.add("card-recipe__content__title");
		if (inputMainSearch.value.length >= minSearchLength) {
			const regTitle = new RegExp("(" + inputMainSearch.value + ")", "gi");
			titleRecipe.innerHTML = name.replace(regTitle, "<mark>$1</mark>");
		} else {
			titleRecipe.textContent = name;
		}
		contentRecipe.appendChild(titleRecipe);

		/* Recipe conbtent recipe Bloc */
		const contentRecipeRecipe = document.createElement("div");
		contentRecipeRecipe.classList.add("card-recipe__content__recipe");
		contentRecipe.appendChild(contentRecipeRecipe);

		/* Recipe Content Recipe Title Bloc */
		const contentRecipeTitleRecipe = document.createElement("div");
		contentRecipeTitleRecipe.classList.add("card-recipe__content__recipe__title");
		contentRecipeTitleRecipe.textContent = valueTitleRecipe;
		contentRecipeRecipe.appendChild(contentRecipeTitleRecipe);

		/* Recipe Content Recipe Text Bloc */
		const contentRecipeTextRecipe = document.createElement("p");
		contentRecipeTextRecipe.classList.add("card-recipe__content__recipe__text");

		if (inputMainSearch.value.length >= minSearchLength) {
			const regDescription = new RegExp("(" + inputMainSearch.value + ")", "gi");
			contentRecipeTextRecipe.innerHTML = description.replace(
				regDescription,
				"<mark>$1</mark>"
			);
		} else {
			contentRecipeTextRecipe.innerHTML = description;
		}
		contentRecipeRecipe.appendChild(contentRecipeTextRecipe);

		/* Recipe Ingredients Recipe Bloc */
		const contentIngredientsRecipe = document.createElement("div");
		contentIngredientsRecipe.classList.add("card-recipe__content__ingredients");
		contentRecipe.appendChild(contentIngredientsRecipe);

		/* Recipe Ingredients Recipe Title Bloc */
		const contentIngredientsTitleRecipe = document.createElement("div");
		contentIngredientsTitleRecipe.classList.add(
			"card-recipe__content__ingredients__title"
		);
		contentIngredientsTitleRecipe.textContent = valueTitleIngredients;
		contentIngredientsRecipe.appendChild(contentIngredientsTitleRecipe);

		/* Recipe Ingredients Recipe List Bloc */
		const contentIngredientsListRecipe = document.createElement("ul");
		contentIngredientsListRecipe.classList.add(
			"card-recipe__content__ingredients__list"
		);
		contentIngredientsRecipe.appendChild(contentIngredientsListRecipe);

		ingredients.forEach(ingredient => {
			/* Recipe Ingredients Recipe List Ingredient Bloc */
			let contentIngredientIngredientsRecipe = ingredient;
			contentIngredientIngredientsRecipe = document.createElement("li");
			contentIngredientIngredientsRecipe.classList.add(
				"card-recipe__content__ingredients__list__ingredient"
			);

			contentIngredientsListRecipe.appendChild(contentIngredientIngredientsRecipe);

			/* Recipe Ingredients Recipe List Ingredient Title Bloc */
			let contentIngredientTitleIngredientsRecipe = document.createElement("div");
			contentIngredientTitleIngredientsRecipe.classList.add(
				"card-recipe__content__ingredients__list__ingredient__title"
			);
			if (inputMainSearch.value.length >= minSearchLength) {
				let regIngredient = new RegExp("(" + inputMainSearch.value + ")", "gi");
				contentIngredientTitleIngredientsRecipe.innerHTML =
					ingredient.ingredient.replace(regIngredient, "<mark>$1</mark>");
			} else {
				contentIngredientTitleIngredientsRecipe.textContent = ingredient.ingredient;
			}

			contentIngredientIngredientsRecipe.appendChild(
				contentIngredientTitleIngredientsRecipe
			);

			/* Recipe Ingredients Recipe List Ingredient Text Bloc */
			let contentIngredientTextIngredientsRecipe = document.createElement("div");
			contentIngredientTextIngredientsRecipe.classList.add(
				"card-recipe__content__ingredients__list__ingredient__text"
			);
		
				contentIngredientTextIngredientsRecipe.textContent = ingredient.quantity;
				contentIngredientTextIngredientsRecipe.textContent +=
					typeof ingredient.unit != "undefined" ? " " + ingredient.unit : "";
			

			contentIngredientIngredientsRecipe.appendChild(
				contentIngredientTextIngredientsRecipe
			);
		});

		return articleRecipe;
	}
	return {name, image, getRecipeCardDOM};
}
