import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Button } from "./components/ui/button";
function App() {
	return (
		<Routes>
			<Route index path='/' element={<Page />} />
		</Routes>
	);
}

function Page() {
	return (
		<div>
			<Button>click me</Button>
		</div>
	);
}
export default App;
