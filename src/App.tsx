import { Route, Routes } from "react-router-dom";
import "./App.css";
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
			<h1 className='text-indigo-700 hover:text-green-500'>
				hello world
			</h1>
			<p className='text-red-700'>hello anass</p>
		</div>
	);
}
export default App;
