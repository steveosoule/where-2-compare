var wikipedia = require("node-wikipedia");

/*wikipedia.page.data("Clifford_Brown", { content: true }, function(response) {
	// structured information on the page for Clifford Brown (wikilinks, references, categories, etc.)
	console.log(response);
});

wikipedia.revisions.all("Miles_Davis", { comment: true }, function(response) {
	// info on each revision made to Miles Davis' page
	console.log(response);
});

wikipedia.categories.tree(
	"Philadelphia_Phillies",
	function(tree) {
		//nested data on the category page for all Phillies players
		console.log(tree);
	}
);*/


wikipedia.page.data("Clifford_Brown", { content: true }, function(response) {
	// structured information on the page for Clifford Brown (wikilinks, references, categories, etc.)
	console.log(response);
});