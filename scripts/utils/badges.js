// Scripts badges

function closeBadge(badge) {
	consoleOutput(badge, 1, 1);
	const {type, text} = badge;

	badgeToClose = document.querySelector(
		"[data-type-badge='" + type + "'][data-content-badge='" + text + "']"
	);

	// Remove addEventListener
	removeBadgeListener({type: type, text: text});
	badgeToClose.remove();

	const selectedOptionToClose =
		document.querySelector(
			"[data-type='" + type + "'][data-content='" + text + "']"
		)
		console.log(selectedOptionToClose);
	if (selectedOptionToClose) {
		consoleOutput("maintenant on supprime l'option selectionnée", 1, 1);

		consoleOutput("Fermeture de l'option", 1, 1);
		consoleOutput(selectedOptionToClose, 1, 1);

		selectedOptionToClose.classList.remove("select-list__list__option__selected");
	}
	if (type == "ingredient") {
		let index = selectedIngredients.indexOf(text);
		selectedIngredients.splice(index, 1);
		changeInformations(text + " supprimé des filtres d'ingredients");
	} else if (type == "appliance") {
		let index = selectedAppliances.indexOf(text);
		selectedAppliances.splice(index, 1);
		changeInformations(text + " supprimé des filtres d'accessoires");
	} else if (type == "ustensil") {
		let index = selectedUstensils.indexOf(text);
		selectedUstensils.splice(index, 1);

		changeInformations(text + " supprimé des filtres d'ustensils");
	}

	selectOptionClick();

	// Refresh and launch search
	search();
}

function createBadge(badge) {
	const badgesSection = document.getElementById("zone-badges");
	const badgeModel = badgeTemplate(badge);
	const badgeDOM = badgeModel.getBadgeDOM();
	badgesSection.appendChild(badgeDOM);

	// Create addEventListener
	consoleOutput(badge, 1, 1);
	addBadgeListener(badge);
	checkAllSelectList();

	// Refresh and launch search
	// search();
}

function badgeCrossClickToClose() {
	consoleOutput("fermeture", 1, 1);

	consoleOutput(this, 1, 1);

	const type = this.getAttribute("data-type-badge");
	const content = this.getAttribute("data-content-badge");

	consoleOutput(type + "/" + content, 1, 1);

	closeBadge({type: type, text: content});
}

function addBadgeListener(badge) {
	badgeToListen = document.querySelector(
		"[data-type-badge='" +
			badge.type +
			"'][data-content-badge='" +
			badge.text +
			"']"
	);

	consoleOutput("Add listener : ");
	consoleOutput(badgeToListen);

	badgeToListen.addEventListener("click", badgeCrossClickToClose, false);
}
function removeBadgeListener(badge) {
	consoleOutput(badge);
	badgeToRemove = document.querySelector(
		"[data-type-badge='" +
			badge.type +
			"'][data-content-badge='" +
			badge.text +
			"']"
	);

	consoleOutput("Remove listener : ");
	consoleOutput(badgeToRemove);

	badgeToRemove.removeEventListener("click", badgeCrossClickToClose);
	checkAllSelectList();
}
