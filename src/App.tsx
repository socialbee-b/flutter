import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./router/AppRoutes";
import { Provider } from "react-redux";
import { store } from "./components/store/store";

function App() {
	return (
		<Provider store={store}>
			<Router>
				<AppRoutes></AppRoutes>
			</Router>
		</Provider>
	);
}

export default App;
