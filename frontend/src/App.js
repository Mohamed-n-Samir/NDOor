import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Profile from "./pages/Profile";

function App() {
	return (
		<div>
			<Routes>
				<Route path="/" element={<Home/>} exact></Route>
				<Route path="/login" element={<Login/>} exact></Route>
				<Route path="/profile" element={<Profile/>} exact></Route>
			</Routes> 
		</div>
	);
}

export default App;
