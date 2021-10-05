import './App.css';
import axios from 'axios'
import { DataManager, ODataV4Adaptor } from '@syncfusion/ej2-data';

const api = axios.create({
	BaseURL : `http://localhost:5000/api/posts/`
})

class App extends React.Component,ODataV4Adaptor {
	state = {
		post : []
	}
	constructor() {
		super(...arguments);
		this.dataManager = new DataManager({
			url: 'https://ej2services.syncfusion.com/production/web-services/api/Schedule',
			adaptor: new ODataV4Adaptor
		});
	}
	
	render() {
		return <div> </div>
	}
}
export default App;
