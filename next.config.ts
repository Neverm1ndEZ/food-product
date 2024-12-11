import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		domains: ["images.openfoodfacts.org", "static.openfoodfacts.org"],
	},
	// async rewrites() {
	// 	return [
	// 		{
	// 			source: "/api/food/:path*",
	// 			destination: "https://world.openfoodfacts.org/:path*",
	// 		},
	// 	];
	// },
};

export default nextConfig;
