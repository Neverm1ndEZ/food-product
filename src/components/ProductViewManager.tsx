// src/components/ProductViewManager.tsx
"use client";
import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import ProductGrid from "./ProductGrid";
import ProductDetail from "@/app/product/[code]/page";
import useStore from "@/store/useStore";

export default function ProductViewManager() {
	const params = useParams();
	const router = useRouter();
	const { isGridView, setIsGridView } = useStore();

	// When viewing a product detail, set isGridView to false
	useEffect(() => {
		if (params?.code) {
			setIsGridView(false);
		}
	}, [params?.code, setIsGridView]);

	// When switching to grid view, update the URL to remove the product code
	useEffect(() => {
		if (isGridView && params?.code) {
			router.push("/");
		}
	}, [isGridView, params?.code, router]);

	// Return either the grid or the product detail based on our state
	if (!isGridView && params?.code) {
		return <ProductDetail />;
	}

	return <ProductGrid />;
}
