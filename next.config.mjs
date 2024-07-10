/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ["randomuser.me", "localhost", "0.0.0.0"],
		dangerouslyAllowSVG: true,
		unoptimized: true,
	},
};

export default nextConfig;
