// First Letter in Capital
function capitalizeWord(word) {
	return word.charAt(0).toUpperCase() + word.slice(1);
}
function dateToUse() {
	let date = new Date().toLocaleString("fr-FR", {
		weekday: "short",
		day: "numeric",
		month: "short",
		year: "2-digit",
		hour: "numeric",
		minute: "numeric",
		second: "numeric",
	});
	return date;
}

function consoleOutput(data, date = 0, line = 0) {
	if (consoleOutputable == 1) {
		if (date == 1) {
			console.log(" *° " + dateToUse() + " °* ");
		}

		if (line == 1) {
			console.log(console.trace());
		}
		console.log(data);
	}

}
