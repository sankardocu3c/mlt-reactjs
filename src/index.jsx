import axios from "axios";
import * as React from "react";
import * as ReactDOM from "react-dom";
// import nextId from "react-id-generator";
import {
	ScheduleComponent,
	Day,
	Week,
	WorkWeek,
	Month,
	Agenda,
	Inject,
} from "@syncfusion/ej2-react-schedule";

const api = axios.create({
	baseURL: `https://sankarcal.azurewebsites.net/api/posts`,
});

class App extends React.Component {
	state = {
		posts: [],
	};
	constructor() {
		super(...arguments);
		//get api method
		api.get("/").then((res) => {
			console.log(res.data);
			this.setState({ posts: res.data });
			// console.log(res.data)
		});
	}
	//post api method
	createevent = async (data) => {
		let res = await api.post("/", data);
		// console.log(res)
	};
	deleteevent = async (id) => {
		// console.log(id);
		// console.log(`/${id.Id}`);
		var idValue = id.map((value) => {
			return value.Id;
		});
		let data = await api.delete(`/${idValue}`);
		// let data = await api.delete('/' + id.Id);
	};
	onActionBegin(args) {
		var data;
		if (args.requestType === "eventRemove") {
			// console.log('inside ....' + args.data._id)
			data = args.data.map((number) => {
				// console.log('number is :' + number)
				return number;
			});
			console.log(data);
			this.deleteevent(data);
		}

		if (args.requestType === "eventCreate") {
			if (args.data != undefined) {
				data = args.data.map((number) => {
					const crypto = require("crypto");
					const id = crypto.randomBytes(16).toString("hex");
					number.Id = id;
					return number;
				});
				console.log(data);
				this.createevent(data);
			}
		}
	}
	render() {
		return (
			<div>
				<ScheduleComponent
					currentView="Month"
					height="550px"
					width="100%"
					timezone="America/New_York"
					selectedDate={new Date()}
					eventSettings={{
						dataSource: this.state.posts.map((post) => {
							return post.text;
						}),
					}}
					actionBegin={this.onActionBegin.bind(this)}
				>
					<Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
				</ScheduleComponent>
				{/* {this.state.posts.map((post) => (
					<h2 key={post.text.Id}>{post.text.Subject}</h2>
				))} */}
			</div>
		);
	}
}
ReactDOM.render(<App />, document.getElementById("schedule"));
