import axios from "axios";

const api = axios.create({
	baseURL: "https://world.openfoodfacts.org",
	headers: {
		"Content-Type": "application/json",
		// "User-Agent": "FoodExplorer - React Web App",
	},
});

export default api;
