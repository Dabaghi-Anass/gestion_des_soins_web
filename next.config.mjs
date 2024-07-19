/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: ["randomuser.me", "localhost", "0.0.0.0"],
		dangerouslyAllowSVG: true,
		remotePatterns: [
			{
				protocol: "http",
				hostname: "*",
			},
		],
	},
};

export default nextConfig;
