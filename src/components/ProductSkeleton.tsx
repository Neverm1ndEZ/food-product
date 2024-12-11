export default function ProductCardSkeleton() {
	return (
		<div className="bg-white rounded-lg shadow-md animate-pulse">
			<div className="h-48 w-full bg-gray-200 rounded-t-lg" />
			<div className="p-4 space-y-3">
				<div className="h-6 bg-gray-200 rounded w-3/4" />
				<div className="h-4 bg-gray-200 rounded w-1/2" />
				<div className="space-y-2">
					<div className="h-4 bg-gray-200 rounded w-full" />
					<div className="h-4 bg-gray-200 rounded w-5/6" />
				</div>
			</div>
		</div>
	);
}
