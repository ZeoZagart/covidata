import React, { Component } from 'react'
import DateChart from './dateChart'
import { getCovidData } from '../dataStore/store'
import Spin from 'antd/es/spin';
import 'antd/dist/antd.css';

class HomePage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			unableToFetchData: false,
			dataFetched: false,
			dataActive: [],
			dataRecovered: []
		}
	}

	async componentDidMount() {
		try {
			let data = await getCovidData()
			let parsedData = this.parseCoviData(data)
			console.log("data in componentDidMount: ", parsedData)
			this.setState({
				dataActive: parsedData.active,
				dataRecovered: parsedData.recovered,
				dataFetched: true
			})
		} catch {
			this.setState({
				unableToFetchData: true
			})
		}
	}

	parseCoviData(coviData) {
		let activeData = []
		let recoveredData = []
		for (const dataIdx in coviData) {
			let data = coviData[dataIdx]
			activeData.push({ date: this.getDay(data.day), value: data.numbers.Active })
			recoveredData.push({date: this.getDay(data.day), value: data.numbers.Discharged})
		}
		return {active: activeData, recovered: recoveredData}
	}

	getDay(timeInMs) {
		let date = new Date(timeInMs)
		return date.toDateString()
	}
	
	render() {
		if (this.state.dataFetched) {
			return (
				<div style={{display: 'flex', flexWrap: 'wrap', alignItems: 'center'}}>
					<DateChart xAxis="date" yAxis="value" title="Active" data={this.state.dataActive} />
					<DateChart xAxis="date" yAxis="value" title="Recovered" data={this.state.dataRecovered} />
				</div>
			)	
		} else if (this.state.unableToFetchData) {
			return (
				<Spin size="large"/>
			)
		} else {
			return <p>"Unable to fetch data"</p>
		}
	}
}

export default HomePage;