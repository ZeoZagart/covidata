function firstWordOfString(str) {
	let text = str.split(/(\s+)/);
	return text[0]
}

async function fetchSite() {
	let response = await fetch("https://www.mohfw.gov.in/");
	return await response.text();
}

async function extractInfo(siteString) {
	let parser = new DOMParser();
	let items = parser.parseFromString(siteString, "text/html").getElementsByClassName("mob-hide");
	let data = []
	for (let i = 0; i < Math.min(4, items.length); i++) {
		data.push(firstWordOfString(items[i].innerText));
	}
	return data
}

export async function fetchCovidData() {
	let site = await fetchSite()
	let dataArr = await extractInfo(site)
	let data = new Map()
	for (let i = 0; i < 4; i+=2) {
		data[dataArr[i]] = dataArr[i + 1]
	}
	console.log("fetchCovidData returning: ", JSON.stringify(data))
	return data
}

