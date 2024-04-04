

function badgeTemplate(data) {

	const {
		type,
		text
	} = data;

	function getBadgeDOM() {

		const liBadge = document.createElement("li");
        liBadge.classList.add("badge-option");
        consoleOutput(type +" / "+ text,1,1);
        liBadge.setAttribute("data-type-badge",type);
        liBadge.setAttribute("data-content-badge", text);
        liBadge.setAttribute("title",closeBadgeTitle+titleFilters[type]);
        liBadge.classList.add("badge-option__"+type);
        const liTextBadge = document.createElement("div");
        liTextBadge.classList.add("badge-option__text");
     
        liTextBadge.textContent = text;

        const liCloseBadge = document.createElement("div");
        liCloseBadge.classList.add("badge-option__close");
        liCloseBadge.textContent = "X";

		liBadge.appendChild(liTextBadge);
        liBadge.appendChild(liCloseBadge);

		

		return liBadge;
	}
	return {type, text, getBadgeDOM};
}
