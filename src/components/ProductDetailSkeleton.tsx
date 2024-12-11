export default function ProductDetailSkeleton() {
	return (
		<div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto animate-pulse">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
				<div className="h-[400px] bg-gray-200 rounded-lg" />
				<div className="space-y-6">
					<div className="h-8 bg-gray-200 rounded w-3/4" />
					<div className="space-y-4">
						<div>
							<div className="h-6 bg-gray-200 rounded w-1/4 mb-2" />
							<div className="h-8 bg-gray-200 rounded w-16" />
						</div>
						<div>
							<div className="h-6 bg-gray-200 rounded w-1/3 mb-2" />
							<div className="h-4 bg-gray-200 rounded w-2/3" />
						</div>
						<div>
							<div className="h-6 bg-gray-200 rounded w-1/3 mb-2" />
							<div className="h-24 bg-gray-200 rounded w-full" />
						</div>
						<div>
							<div className="h-6 bg-gray-200 rounded w-1/2 mb-2" />
							<div className="grid grid-cols-2 gap-4">
								{[...Array(4)].map((_, i) => (
									<div key={i}>
										<div className="h-5 bg-gray-200 rounded w-2/3 mb-1" />
										<div className="h-4 bg-gray-200 rounded w-1/2" />
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
