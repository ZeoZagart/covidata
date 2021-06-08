import { Card } from 'antd';
import { Component } from 'react'
import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts'

class DateChart extends Component {
	render() {
		return (
			<Card title={this.props.title} style={{ width: 620, margin: 20, borderRadius: 15, padding: 10, color: 'brown', textAlign: 'center', fontFamily: 'sans-serif', alignContent: 'center', backgroundColor: 'wheat' }}>
			<AreaChart width={570} height={250} data = {this.props.data}
				margin={{ top: 10, right: 70, left: 30, bottom: 0 }}>
				<defs>
					<linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
						<stop offset="5%" stopColor="#3484d8" stopOpacity={1}/>
						<stop offset="95%" stopColor="#3484d8" stopOpacity={1}/>
					</linearGradient>	
				</defs>
				<XAxis dataKey={this.props.xAxis}/>
				<YAxis/>
				<CartesianGrid strokeDasharray="3 3"/>
				<Tooltip />
				<Area type="monotone" dataKey={ this.props.yAxis } stroke="#118428" fillOpacity={1} fill="url(#colorUv)"/>
			</AreaChart>
		</Card>
	)}
}

export default DateChart;