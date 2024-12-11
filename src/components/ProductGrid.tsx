"use client";
import { useEffect, useState, Suspense, useCallback } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Product, ProductsResponse } from "@/types/product";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";
import api from "@/lib/axios";
import useStore from "@/store/useStore";

// We'll create a separate component for the grid content to better manage the loading state
function ProductGridContent() {
	const [products, setProducts] = useState<Product[]>([]);
	const [page, setPage] = useState(1);
	const [hasMore, setHasMore] = useState(true);
	const [loading, setLoading] = useState(true);
	const { searchQuery, categoryFilter, sortBy } = useStore();

	const getSortedProducts = (productsToSort: Product[]): Product[] => {
		if (!productsToSort || !Array.isArray(productsToSort)) {
			return [];
		}

		const sortedProducts = productsToSort.slice();

		switch (sortBy) {
			case "name_asc":
				return sortedProducts.sort((a, b) =>
					(a?.product_name || "").localeCompare(b?.product_name || ""),
				);
			case "name_desc":
				return sortedProducts.sort((a, b) =>
					(b?.product_name || "").localeCompare(a?.product_name || ""),
				);
			case "grade_asc":
				return sortedProducts.sort((a, b) =>
					(a?.nutrition_grades || "z").localeCompare(
						b?.nutrition_grades || "z",
					),
				);
			case "grade_desc":
				return sortedProducts.sort((a, b) =>
					(b?.nutrition_grades || "z").localeCompare(
						a?.nutrition_grades || "z",
					),
				);
			default:
				return sortedProducts;
		}
	};

	const fetchProducts = useCallback(
		async (pageNumber: number) => {
			try {
				setLoading(true);
				const params = new URLSearchParams({
					page: pageNumber.toString(),
					page_size: "20",
					json: "true",
				});

				if (searchQuery) {
					params.append("search_terms", searchQuery);
				}

				if (categoryFilter) {
					params.append("categories", categoryFilter);
				}

				const response = await api.get<ProductsResponse>(
					`/cgi/search.pl?${params}`,
				);
				const newProducts = response.data.products;

				if (pageNumber === 1) {
					setProducts(newProducts);
				} else {
					setProducts((prev) => [...prev, ...newProducts]);
				}

				setHasMore(newProducts?.length > 0);
			} catch (error) {
				console.error("Error fetching products:", error);
				setHasMore(false);
			} finally {
				setLoading(false);
			}
		},
		[searchQuery, categoryFilter],
	);

	// Use useEffect with a cleanup function to avoid memory leaks
	useEffect(() => {
		let mounted = true;

		const initializeProducts = async () => {
			if (mounted) {
				setPage(1);
				await fetchProducts(1);
			}
		};

		initializeProducts();

		// Cleanup function to prevent state updates if component unmounts
		return () => {
			mounted = false;
		};
	}, [searchQuery, categoryFilter, fetchProducts]);

	const loadMore = () => {
		const nextPage = page + 1;
		setPage(nextPage);
		fetchProducts(nextPage);
	};

	const sortedProducts = getSortedProducts(products);

	// Return loading skeleton if we're loading the first page
	if (loading && page === 1) {
		return (
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
				{[...Array(8)].map((_, i) => (
					<ProductCardSkeleton key={i} />
				))}
			</div>
		);
	}

	// Show a message if no products are found
	if (!loading && sortedProducts.length === 0) {
		return (
			<div className="text-center py-8">
				<p className="text-gray-600">No products found</p>
			</div>
		);
	}

	return (
		<InfiniteScroll
			dataLength={sortedProducts.length}
			next={loadMore}
			hasMore={hasMore}
			loader={<div className="text-center py-4">Loading more products...</div>}
		>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
				{sortedProducts.map((product) => (
					<ProductCard key={product.code} product={product} />
				))}
			</div>
		</InfiniteScroll>
	);
}

// Main ProductGrid component that wraps the content with Suspense
export default function ProductGrid() {
	return (
		<Suspense
			fallback={
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
					{[...Array(8)].map((_, i) => (
						<ProductCardSkeleton key={i} />
					))}
				</div>
			}
		>
			<ProductGridContent />
		</Suspense>
	);
}
