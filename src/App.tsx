import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./router/AppRoutes";
import { Provider } from "react-redux";
import { store } from "./components/store/store";
import ToggleColorMode from "./Theme2";

function App() {
	return (
		<ToggleColorMode>
			<Provider store={store}>
				<Router>
					<AppRoutes></AppRoutes>
				</Router>
			</Provider>
		</ToggleColorMode>
	);
}

export default App;
