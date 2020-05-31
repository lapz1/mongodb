/*
[
	{
		id: auto,
		content: string,
		user: number,
		date: string
	}
]
*/
const tweetsArray = [];

const newTweet = (tweet) => {
	tweetsArray.push(tweet);
}

const loadTweets = () => {
	return tweetsArray;
}

module.exports = { newTweet, loadTweets, tweetsArray };