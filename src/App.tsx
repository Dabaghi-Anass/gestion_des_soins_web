import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import AppInput from "./components/AppInput";
import RegisterPage from "./pages/register-page";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
function App() {
	return (
		<Routes>
			<Route index path='/' element={<Page />} />
			<Route path='/register' element={<RegisterPage />} />
		</Routes>
	);
}

function Page() {
	return (
		<div className='p-8 bg-red-300 w-80 h-80 cont'>
			<AppInput className='w-full' placeholder='placeholder' />
			<Button>click me</Button>
			<Calendar fromYear={2024} toYear={2026} />
			<Select>
				<SelectTrigger className="w-[180px]">
					<SelectValue placeholder="Select a fruit" />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
					<SelectLabel>Fruits</SelectLabel>
					<SelectItem value="apple">Apple</SelectItem>
					<SelectItem value="banana">Banana</SelectItem>
					<SelectItem value="blueberry">Blueberry</SelectItem>
					<SelectItem value="grapes">Grapes</SelectItem>
					<SelectItem value="pineapple">Pineapple</SelectItem>
					</SelectGroup>
				</SelectContent>
			</Select>
		</div>
	);
}
export default App;
