import Filters from "@/components/Filters";
import ProductViewManager from "@/components/ProductViewManager";

export default function Home() {
	return (
		<>
			<div className="space-y-6">
				<Filters />
				<ProductViewManager />
			</div>
		</>
	);
}
