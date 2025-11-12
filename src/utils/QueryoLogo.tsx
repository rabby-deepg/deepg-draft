import React from "react";

interface QueryoLogoProps {
	className?: string;
	size?: number;
}

const QueryoLogo: React.FC<QueryoLogoProps> = ({
	className = "",
	size = 40,
}) => {
	const logoHeight = size;
	const logoWidth = size * 3.5; // Width to accommodate text

	return (
		<svg
			width={logoWidth}
			height={logoHeight}
			viewBox="0 0 350 100"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={className}
		>
			{/* Four overlapping circles representing different media types */}
			{/* They merge into a unified shape */}

			{/* Top circle - slightly transparent */}
			<circle cx="50" cy="35" r="18" fill="#FFB84D" opacity="0.85" />

			{/* Left circle */}
			<circle cx="35" cy="52" r="18" fill="#FF8533" opacity="0.85" />

			{/* Right circle */}
			<circle cx="65" cy="52" r="18" fill="#FF6B1A" opacity="0.85" />

			{/* Bottom circle */}
			<circle cx="50" cy="65" r="18" fill="#FF5500" opacity="0.85" />

			{/* Central highlight where all overlap - represents unified experience */}
			<circle cx="50" cy="50" r="8" fill="#FFFFFF" opacity="0.9" />

			{/* Q tail extending from the unified center */}
			<line
				x1="56"
				y1="56"
				x2="70"
				y2="75"
				stroke="#FF6B1A"
				strokeWidth="6"
				strokeLinecap="round"
			/>

			{/* Queryo text */}
			<text
				x="95"
				y="72"
				fontFamily="system-ui, -apple-system, sans-serif"
				fontSize="52"
				fontWeight="700"
				fill="#2d2d2d"
				letterSpacing="-1"
			>
				Queryo
			</text>

			<defs>
				<filter id="glow">
					<feGaussianBlur stdDeviation="2" result="coloredBlur" />
					<feMerge>
						<feMergeNode in="coloredBlur" />
						<feMergeNode in="SourceGraphic" />
					</feMerge>
				</filter>
			</defs>
		</svg>
	);
};

export default QueryoLogo;
