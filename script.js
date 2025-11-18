const quoteContainer = document.getElementById('quote-container');
const loader = document.getElementById('loader');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');

let apiQuotes = [];

function showLoadingSpinner() {
	loader.hidden = false;
	quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
	quoteContainer.hidden = false;
	loader.hidden = true;
}

function newQuotes() {
	// Show loading spinner when randomly selecting new quote
	showLoadingSpinner();

	const newQuote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

	// Check if there is a value for the author field. If not, return 'Unknown'
	if (!newQuote.author) {
		authorText.textContent = 'Unknown';
	} else {
		authorText.textContent = newQuote.author;
	}

	// Check quote length to determine styling
	if (newQuote.text.length > 100) {
		quoteText.classList.add('long-quote');
	} else {
		quoteText.classList.remove('long-quote');
	}

	quoteText.textContent = newQuote.text;

	// Quote successfully loaded. Remove loading spinner and show quote container.
	removeLoadingSpinner();
}

// Get Quotes From API
async function getQuotes() {
	// Show loading spinner when fetching from API
	showLoadingSpinner();
	const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
	try {
		var response = await fetch(apiUrl);

		apiQuotes = await response.json();

		newQuotes();
	}
	catch (error) {
		console.log('Something went wrong: ', error);
	}
}

// Tweet Quote
function tweetQuote() {
	const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText} - -${authorText}`;
	window.open(twitterUrl, '_blank');
}

// Event Listeners
twitterBtn.addEventListener('click', tweetQuote);
newQuoteBtn.addEventListener('click', newQuotes);

// Load Quotes on start
getQuotes();