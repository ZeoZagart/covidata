import { fetchCovidData } from "../dataFetcher/fetcher";

const COVID_DATA_KEY = "covid-data"

export async function getCovidData() {
	let localData = getCovidDataFromStore()
	if (isDataInStore(localData)) {
		console.log("Found latest data in cache")
		return localData;
	} else {
		let newData = await fetchCovidData();
		return addData(newData)
	}
}

function isDataInStore(localData) {
	let day = timeToDateEpoch(new Date().getTime())
	for (const dataIdx in localData) {
		var data = localData[dataIdx]
		if (timeToDateEpoch(data.day) >= day) return true;
	}
	return false;
}

function getCovidDataFromStore() {
	let data = localStorage.getItem(COVID_DATA_KEY)
	console.log("StoreData: ", data)
	if (data) return JSON.parse(data)
	return []
}

function putCovidData(data) {
	localStorage.setItem(COVID_DATA_KEY, JSON.stringify(data))
}

function addData(dataMap) {
	let data = {
		'day': new Date().getTime(),
		'numbers': dataMap, 
	}
	let prevData = getCovidDataFromStore()
	prevData.push(data)
	putCovidData(prevData)
	return prevData
}

// https://stackoverflow.com/questions/25445377/how-to-get-current-date-without-time/25445633
function timeToDateEpoch(time) {
    return time - (time % 86400000);
}
