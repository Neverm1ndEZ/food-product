// src/components/ProductCardSkeleton.tsx
export default function ProductCardSkeleton() {
	return (
		<div className="bg-white rounded-lg shadow-md overflow-hidden">
			{/* Image placeholder with aspect ratio matching the product image */}
			<div className="relative h-48 w-full bg-gray-200 animate-pulse">
				{/* Nutrition grade badge placeholder */}
				<div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-gray-300 animate-pulse" />
			</div>

			{/* Content section with spacing matching the product card */}
			<div className="p-4 space-y-3">
				{/* Product title placeholder - two lines */}
				<div className="space-y-2">
					<div className="h-5 bg-gray-200 rounded w-3/4 animate-pulse" />
					<div className="h-5 bg-gray-200 rounded w-1/2 animate-pulse" />
				</div>

				{/* Category placeholder - one line */}
				<div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse" />

				{/* Ingredients placeholder - two lines */}
				<div className="space-y-2">
					<div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
					<div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse" />
				</div>
			</div>
		</div>
	);
}
