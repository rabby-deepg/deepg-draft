import { useEffect, useRef } from "react";
import gsap from "gsap";
import QueryoLogo from "@/utils/QueryoLogo";

interface LoaderProps {
	onComplete: () => void;
}

// Loader Component
const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
	const loaderRef = useRef<HTMLDivElement>(null);
	const progressRef = useRef<HTMLDivElement>(null);
	const progressNumberRef = useRef<HTMLSpanElement>(null);
	const logoRef = useRef<HTMLDivElement>(null);
	const particlesRef = useRef<HTMLDivElement[]>([]);

	useEffect(() => {
		const ctx = gsap.context(() => {
			// Create floating particles
			const container = loaderRef.current;
			if (!container) return;

			particlesRef.current = [];

			for (let i = 0; i < 12; i++) {
				const particle = document.createElement("div");
				particle.className = "loader-particle";
				container.appendChild(particle);
				particlesRef.current.push(particle);

				gsap.set(particle, {
					x: gsap.utils.random(-100, 100),
					y: gsap.utils.random(-100, 100),
					scale: 0,
					opacity: 0,
				});
			}

			// Main loading timeline
			const tl = gsap.timeline();

			// Initial entrance animation
			tl.to(logoRef.current, {
				scale: 1,
				rotation: 360,
				duration: 1.5,
				ease: "back.out(1.7)",
			})
				.to(
					particlesRef.current,
					{
						scale: 1,
						opacity: 0.6,
						duration: 1,
						stagger: 0.1,
						ease: "power2.out",
					},
					"-=1",
				)
				.to(progressRef.current, {
					width: "100%",
					duration: 2.5,
					ease: "power2.inOut",
				})
				.to(
					progressNumberRef.current,
					{
						innerText: 100,
						duration: 2.5,
						snap: { innerText: 1 },
						ease: "power2.inOut",
					},
					"-=2.5",
				)
				.to(particlesRef.current, {
					scale: 1.5,
					opacity: 0,
					duration: 0.8,
					stagger: 0.05,
					ease: "power2.in",
				})
				.to(logoRef.current, {
					scale: 1.2,
					opacity: 0,
					duration: 0.8,
					ease: "power2.in",
				})
				.to(loaderRef.current, {
					opacity: 0,
					duration: 0.5,
					ease: "power2.out",
					onComplete: () => {
						onComplete();
					},
				});
		}, loaderRef);

		return () => ctx.revert();
	}, [onComplete]);

	return (
		<div ref={loaderRef} className="loader-container">
			<div className="loader-content">
				{/* Animated Logo/Text */}
				<div ref={logoRef} className="loader-logo">
					<div className="logo-wrapper">
						
						<QueryoLogo size={64} className="logo-text" />
					</div>
				</div>

				{/* Progress Bar */}
				<div className="progress-container">
					<div className="progress-bar">
						<div ref={progressRef} className="progress-fill"></div>
					</div>
					<div className="progress-info">
						<span ref={progressNumberRef} className="progress-number">
							0%
						</span>
						<span className="progress-label">Loading</span>
					</div>
				</div>

				{/* Loading Text */}
				<div className="loading-text">
					<span>Initializing AI Universe</span>
					<div className="loading-dots">
						<span>.</span>
						<span>.</span>
						<span>.</span>
					</div>
				</div>
			</div>

			<style jsx>{`
				.loader-container {
					position: fixed;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					background: linear-gradient(
						135deg,
						#f8fafc 0%,
						#f1f5f9 30%,
						#e2e8f0 100%
					);
					display: flex;
					align-items: center;
					justify-content: center;
					z-index: 9999;
					color: #334155;
					font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
						sans-serif;
					backdrop-filter: blur(10px);
				}

				.loader-content {
					text-align: center;
					z-index: 10;
					
					padding: 3rem 2.5rem;
					border-radius: 24px;
					box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1),
						0 0 0 1px rgba(255, 255, 255, 0.8),
						inset 0 1px 0 rgba(255, 255, 255, 0.6);
					backdrop-filter: blur(20px);
					border: 1px solid rgba(255, 255, 255, 0.9);
				}

				.loader-logo {
					margin-bottom: 2.5rem;
					transform: scale(0);
				}

				.logo-wrapper {
					display: flex;
					flex-direction: column;
					align-items: center;
					gap: 1rem;
				}

				.logo-text {
					color: #1e293b;
					font-weight: 600;
					letter-spacing: -0.025em;
				}

				.progress-container {
					width: 320px;
					margin: 0 auto 2rem;
				}

				.progress-bar {
					width: 100%;
					height: 6px;
					background: rgba(203, 213, 225, 0.6);
					border-radius: 3px;
					overflow: hidden;
					margin-bottom: 0.75rem;
					box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
				}

				.progress-fill {
					width: 0%;
					height: 100%;
					background: linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899);
					border-radius: 3px;
					box-shadow: 0 0 10px rgba(59, 130, 246, 0.4),
						0 0 20px rgba(139, 92, 246, 0.3);
				}

				.progress-info {
					display: flex;
					justify-content: space-between;
					align-items: center;
				}

				.progress-number {
					font-size: 1.1rem;
					font-weight: 700;
					color: #3b82f6;
					font-feature-settings: "tnum";
				}

				.progress-label {
					font-size: 0.9rem;
					color: #64748b;
					font-weight: 500;
				}

				.loading-text {
					display: flex;
					align-items: center;
					justify-content: center;
					gap: 0.5rem;
					font-size: 1rem;
					color: #475569;
					font-weight: 500;
				}

				.loading-dots span {
					opacity: 0;
					animation: dotPulse 1.5s infinite;
					color: #3b82f6;
					font-weight: bold;
				}

				.loading-dots span:nth-child(2) {
					animation-delay: 0.2s;
				}

				.loading-dots span:nth-child(3) {
					animation-delay: 0.4s;
				}

				.loader-particle {
					position: absolute;
					width: 8px;
					height: 8px;
					background: linear-gradient(45deg, #3b82f6, #8b5cf6);
					border-radius: 50%;
					pointer-events: none;
					box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
				}

				@keyframes dotPulse {
					0%,
					20% {
						opacity: 0;
						transform: translateY(0);
					}
					50% {
						opacity: 1;
						transform: translateY(-2px);
					}
					100% {
						opacity: 0;
						transform: translateY(0);
					}
				}

				/* Subtle floating animation for the container */
				.loader-content {
					animation: gentleFloat 6s ease-in-out infinite;
				}

				@keyframes gentleFloat {
					0%,
					100% {
						transform: translateY(0px);
					}
					50% {
						transform: translateY(-8px);
					}
				}

				@media (max-width: 768px) {
					.loader-content {
						padding: 2rem 1.5rem;
						margin: 1rem;
						border-radius: 20px;
					}

					.progress-container {
						width: 280px;
					}

					.loading-text {
						font-size: 0.95rem;
					}

					.logo-wrapper {
						gap: 0.75rem;
					}
				}

				@media (max-width: 480px) {
					.loader-content {
						padding: 1.5rem 1rem;
						border-radius: 16px;
					}

					.progress-container {
						width: 250px;
					}
				}
			`}</style>
		</div>
	);
};

export default Loader;
