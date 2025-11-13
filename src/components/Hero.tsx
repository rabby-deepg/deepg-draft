"use client";

import React, {
	useState,
	useEffect,
	useRef,
	useMemo,
	useCallback,
} from "react";
import * as THREE from "three";
import {
	ArrowRight,
	Sparkles,
	MessageSquare,
	Image,
	Volume2,
	Video,
	Zap,
	Check,
	Star,
	Code,
} from "lucide-react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Loader from "./Loader";
import { log } from "console";

gsap.registerPlugin(ScrollTrigger);

interface Position {
	x: number;
	y: number;
}

const AI_LOGOS = {
	chat: {
		gpt4: "/logos/chat/gpt4.png", // or use: "https://cdn.openai.com/..."
		claude: "/logos/chat/claude.png",
		gemini: "/logos/chat/gemini.png",
		llama: "/logos/deepseek-ai.svg",
		mistral: "/logos/mistral-ai.png",
	},
	image: {
		dalle: "/logos/image/dalle.png",
		midjourney: "/logos/image/midjourney.png",
		stablediff: "/logos/image/stable-diffusion.png",
		flux: "/logos/image/flux.png",
	},
	audio: {
		elevenlabs: "/logos/audio/elevenlabs.png",
		whisper: "/logos/audio/whisper.png",
		suno: "/logos/audio/suno.png",
		musicgen: "/logos/audio/musicgen.png",
	},
	video: {
		sora: "/logos/video/sora.png",
		runway: "/logos/video/runway.png",
		pika: "/logos/video/pika.png",
		luma: "/logos/video/luma.png",
	},
	code: {
		copilot: "/logos/code/copilot.png",
		cursor: "/logos/code/cursor.png",
		cody: "/logos/code/cody.png",
		tabnine: "/logos/code/tabnine.png",
	},
	hub: "/logos/queryo-logo.png",
};

const features = [
	{
		title: "Multi-Model AI Conversations",
		subtitle: "Chat with Every Major AI",
		description:
			"Switch seamlessly between GPT-4, Claude, Gemini, and more. Compare responses, leverage model strengths, and never be limited by a single AI again.",
		features: [
			{ text: "GPT-4o, Claude 3.5, Gemini Pro access", icon: Check },
			{ text: "Real-time model switching", icon: Check },
			{ text: "Conversation history sync", icon: Check },
			{ text: "Side-by-side model comparison", icon: Check },
		],
		icon: MessageSquare,
		gradient: "from-blue-500 via-purple-500 to-pink-500",
		bgGradient: "from-blue-50 via-purple-50 to-pink-50",
		iconColor: "text-blue-600",
		status: "Live",
		statusColor: "bg-green-500",
	},
	{
		title: "Advanced Conversation Intelligence",
		subtitle: "Contextual AI Mastery",
		description:
			"Experience AI that truly understands context. Our intelligent routing automatically selects the best model for your task, ensuring optimal responses every time.",
		features: [
			{ text: "Smart model recommendation engine", icon: Star },
			{ text: "Cross-conversation memory", icon: Star },
			{ text: "Context-aware responses", icon: Star },
			{ text: "Multi-turn dialogue optimization", icon: Star },
		],
		icon: Zap,
		gradient: "from-violet-500 via-purple-500 to-fuchsia-500",
		bgGradient: "from-violet-50 via-purple-50 to-fuchsia-50",
		iconColor: "text-violet-600",
		status: "Live",
		statusColor: "bg-green-500",
	},
	{
		title: "Professional Image Studio",
		subtitle: "Transform Your Visuals",
		description:
			"Upscale images to 4K, restore old photos with AI precision, and generate stunning visuals. Professional-grade image tools powered by cutting-edge AI.",
		features: [
			{ text: "AI-powered 4K upscaling", icon: Check },
			{ text: "Photo restoration & enhancement", icon: Check },
			{ text: "Background removal & editing", icon: Check },
			{ text: "AI image generation", icon: Sparkles },
		],
		icon: Image,
		gradient: "from-emerald-500 via-teal-500 to-cyan-500",
		bgGradient: "from-emerald-50 via-teal-50 to-cyan-50",
		iconColor: "text-emerald-600",
		status: "Coming Soon",
		statusColor: "bg-amber-500",
	},
	{
		title: "Voice & Audio Suite",
		subtitle: "Natural Voice Synthesis",
		description:
			"Transform text into lifelike speech with multiple voice options. Perfect for podcasts, audiobooks, accessibility, and content creation.",
		features: [
			{ text: "Natural text-to-speech engine", icon: Sparkles },
			{ text: "Multiple voice personalities", icon: Sparkles },
			{ text: "Multi-language support", icon: Sparkles },
			{ text: "Custom voice training", icon: Sparkles },
		],
		icon: Volume2,
		gradient: "from-teal-500 via-cyan-500 to-sky-500",
		bgGradient: "from-teal-50 via-cyan-50 to-sky-50",
		iconColor: "text-orange-600",
		status: "Coming Soon",
		statusColor: "bg-amber-500",
	},
	{
		title: "Next-Gen Video Creation",
		subtitle: "AI-Powered Video Studio",
		description:
			"Generate professional videos from text prompts. Create explainer videos, animations, and visual content with the power of generative AI.",
		features: [
			{ text: "Text-to-video generation", icon: Sparkles },
			{ text: "Scene composition & editing", icon: Sparkles },
			{ text: "Multiple style presets", icon: Sparkles },
			{ text: "HD export options", icon: Sparkles },
		],
		icon: Video,
		gradient: "from-rose-500 via-pink-500 to-fuchsia-500",
		bgGradient: "from-rose-50 via-pink-50 to-fuchsia-50",
		iconColor: "text-rose-600",
		status: "Coming Soon",
		statusColor: "bg-amber-500",
	},
];
interface HeroSectionProps {
	setShowVideoModal: (show: boolean) => void;
	reducedMotion?: boolean; // optional callback for chevron
}

const MultiLLMHero = ({
	setShowVideoModal,
	reducedMotion,
}: HeroSectionProps) => {
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [scrollProgress, setScrollProgress] = useState(0);

	const canvasRef = useRef<HTMLCanvasElement>(null);
	const heroRef = useRef<HTMLDivElement>(null);
	const leftContentRef = useRef<HTMLDivElement>(null);
	const rightVisualizationRef = useRef<HTMLDivElement>(null);
	const horizontalSectionRef = useRef<HTMLDivElement>(null);
	const horizontalContainerRef = useRef<HTMLDivElement>(null);

	// Add state to track viewport size, around line 133
	const [viewportWidth, setViewportWidth] = useState(
		typeof window !== "undefined" ? window.innerWidth : 1024,
	);

	// Handle loader completion
	const handleLoaderComplete = () => {
		setIsLoading(false);
	};

	// Replace the entire GSAP useEffect with this:

	useEffect(() => {
		if (
			!horizontalSectionRef.current ||
			!horizontalContainerRef.current ||
			isLoading
		)
			return;

		const section = horizontalSectionRef.current;
		const container = horizontalContainerRef.current;

		// Function to setup ScrollTrigger
		const setupScrollTrigger = () => {
			// Kill existing triggers
			ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

			const isDesktop = window.innerWidth >= 1024;
			const scrollDistance = isDesktop
				? container.scrollWidth - window.innerWidth // Changed: subtract 2 viewports for desktop
				: container.scrollWidth - window.innerWidth;

			// Set initial position to show last card first (rightmost)
			gsap.set(container, { x: -scrollDistance });

			// Responsive end calculation based on screen size
			const getScrollEnd = () => {
				const isMobile = window.innerWidth < 640;
				const isTablet = window.innerWidth >= 640 && window.innerWidth < 1024;
				const isDesktop = window.innerWidth >= 1024;

				if (isMobile) {
					return window.innerHeight * features.length * 0.4;
				} else if (isTablet) {
					return window.innerHeight * features.length * 0.5;
				} else {
					// Desktop: reduce scroll distance since showing 2 cards at once
					return window.innerHeight * (features.length / 2) * 0.6;
				}
			};

			// Create the horizontal scroll animation (right to left)
			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: section,
					start: "top top",
					end: () => `+=${getScrollEnd()}`,
					scrub: 0.3,
					pin: true,
					anticipatePin: 1,
					invalidateOnRefresh: true,
				},
			});

			tl.to(container, {
				x: 0,
				ease: "none",
			});
		};

		setupScrollTrigger();

		// Re-setup on resize
		const handleResize = () => {
			setupScrollTrigger();
			setViewportWidth(window.innerWidth); // Add this line
		};

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
			ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
		};
	}, [isLoading]);

	// Replace the problematic card animation useEffect with this fixed version
	useEffect(() => {
		if (!horizontalContainerRef.current || isLoading) return;

		const cards =
			horizontalContainerRef.current.querySelectorAll(".feature-card");

		// Reset all cards to initial state
		gsap.set(cards, { opacity: 1 });

		cards.forEach((card, index) => {
			const icon = card.querySelector(".feature-icon");
			const badge = card.querySelector(".feature-badge");
			const title = card.querySelector(".feature-title");
			const description = card.querySelector(".feature-description");
			const featureItems = card.querySelectorAll(".feature-item");
			const cta = card.querySelector(".feature-cta");

			// Initial hidden state
			gsap.set([icon, badge, title, description, featureItems, cta], {
				opacity: 0,
				y: 20,
			});

			gsap.set(icon, { scale: 0.8, rotation: -10 });
			gsap.set(featureItems, { x: -20 });
			gsap.set(cta, { scale: 0.9 });

			// Create timeline for each card with simpler scroll trigger
			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: card,
					start: "top 80%",
					end: "top 30%",
					toggleActions: "play none none reverse",
					markers: false,
				},
			});

			// Staggered animations
			tl.to(icon, {
				opacity: 1,
				scale: 1,
				rotation: 0,
				duration: 0.6,
				ease: "back.out(1.4)",
			})
				.to(
					badge,
					{
						opacity: 1,
						y: 0,
						duration: 0.4,
						ease: "power2.out",
					},
					"-=0.4",
				)
				.to(
					title,
					{
						opacity: 1,
						y: 0,
						duration: 0.5,
						ease: "power2.out",
					},
					"-=0.3",
				)
				.to(
					description,
					{
						opacity: 1,
						y: 0,
						duration: 0.4,
						ease: "power2.out",
					},
					"-=0.2",
				)
				.to(
					featureItems,
					{
						opacity: 1,
						x: 0,
						stagger: 0.08,
						duration: 0.4,
						ease: "power2.out",
					},
					"-=0.2",
				)
				.to(
					cta,
					{
						opacity: 1,
						scale: 1,
						duration: 0.4,
						ease: "back.out(1.4)",
					},
					"-=0.1",
				);

			// Enhanced hover animations
			card.addEventListener("mouseenter", () => {
				gsap.to(card, {
					y: -8,
					scale: 1.02,
					duration: 0.3,
					ease: "power2.out",
				});

				gsap.to(icon, {
					scale: 1.15,
					rotation: 5,
					duration: 0.3,
					ease: "power2.out",
				});

				// Pulse animation for badge
				gsap.to(badge, {
					scale: 1.05,
					duration: 0.3,
					ease: "power2.out",
				});
			});

			card.addEventListener("mouseleave", () => {
				gsap.to(card, {
					y: 0,
					scale: 1,
					duration: 0.3,
					ease: "power2.out",
				});

				gsap.to(icon, {
					scale: 1,
					rotation: 0,
					duration: 0.3,
					ease: "power2.out",
				});

				gsap.to(badge, {
					scale: 1,
					duration: 0.3,
					ease: "power2.out",
				});
			});

			// Add click animation for feature items
			featureItems.forEach((item) => {
				item.addEventListener("click", () => {
					gsap.to(item, {
						scale: 0.95,
						duration: 0.1,
						yoyo: true,
						repeat: 1,
						ease: "power2.inOut",
					});
				});
			});

			// CTA button hover effects
			cta.addEventListener("mouseenter", () => {
				gsap.to(cta, {
					scale: 1.05,
					duration: 0.2,
					ease: "power2.out",
				});
			});

			cta.addEventListener("mouseleave", () => {
				gsap.to(cta, {
					scale: 1,
					duration: 0.2,
					ease: "power2.out",
				});
			});
		});

		return () => {
			// Cleanup ScrollTriggers
			ScrollTrigger.getAll().forEach((trigger) => {
				if (
					trigger.trigger &&
					trigger.trigger.classList.contains("feature-card")
				) {
					trigger.kill();
				}
			});
		};
	}, [isLoading]);

	useEffect(() => {
		if (isLoading) return;

		const canvas = canvasRef.current;
		if (!canvas || !canvas.offsetWidth) return;

		let scene: THREE.Scene,
			camera: THREE.PerspectiveCamera,
			renderer: THREE.WebGLRenderer;
		const aiClusters: any[] = [];
		let centralHub: THREE.Group;
		let solarSystemGroup: THREE.Group;
		let animationFrameId: number;

		// ============ RESPONSIVE SCALE ============
		const getResponsiveScale = () => {
			const width = window.innerWidth;
			if (width < 640) return 0.3;
			if (width < 1024) return 0.4;
			return 0.5;
		};

		const getCentralHubScale = () => {
			const width = window.innerWidth;
			if (width < 640) return 0.5;
			if (width < 1024) return 0.6;
			return 0.7;
		};

		const getResponsiveParticleCount = () => {
			const width = window.innerWidth;
			if (width < 640) return { cluster: 3, ambient: 30, hub: 20 };
			if (width < 1024) return { cluster: 4, ambient: 45, hub: 30 };
			return { cluster: 6, ambient: 60, hub: 40 };
		};

		const getSolarSystemPosition = () => {
			const width = window.innerWidth;
			if (width < 1024) return { x: 0, y: 0, z: 0 };
			return { x: 1.5, y: -3, z: -0.8 };
		};

		let responsiveScale = getResponsiveScale();
		let particleCounts = getResponsiveParticleCount();

		const createParticleTexture = () => {
			const canvas = document.createElement("canvas");
			canvas.width = 32;
			canvas.height = 32;
			const context = canvas.getContext("2d")!;

			const gradient = context.createRadialGradient(16, 16, 0, 16, 16, 16);
			gradient.addColorStop(0, "rgba(255,255,255,1)");
			gradient.addColorStop(0.4, "rgba(255,255,255,0.8)");
			gradient.addColorStop(1, "rgba(255,255,255,0)");

			context.fillStyle = gradient;
			context.fillRect(0, 0, 32, 32);

			const texture = new THREE.CanvasTexture(canvas);
			return texture;
		};

		// ============ LOGO LOADING UTILITIES ============
		const logoTextures = new Map<string, THREE.Texture>();
		const textureLoader = new THREE.TextureLoader();

		const createTextTexture = (text: string, color: number): THREE.Texture => {
			const canvas = document.createElement("canvas");
			const context = canvas.getContext("2d")!;
			canvas.width = 256;
			canvas.height = 256;

			// Background circle
			context.fillStyle = `#${color.toString(16).padStart(6, "0")}`;
			context.beginPath();
			context.arc(128, 128, 100, 0, 2 * Math.PI);
			context.fill();

			// Text
			context.fillStyle = "#000000";
			context.font = "bold 48px Arial";
			context.textAlign = "center";
			context.textBaseline = "middle";
			context.fillText(text.substring(0, 4), 128, 128);

			return new THREE.CanvasTexture(canvas);
		};

		const loadLogoTexture = (path: string): Promise<THREE.Texture> => {
			return new Promise((resolve, reject) => {
				if (logoTextures.has(path)) {
					resolve(logoTextures.get(path)!);
					return;
				}

				textureLoader.load(
					path,
					(texture) => {
						texture.minFilter = THREE.LinearMipmapLinearFilter;
						texture.magFilter = THREE.LinearFilter;
						texture.anisotropy = renderer.capabilities.getMaxAnisotropy();

						// Handle both old and new Three.js versions
						// @ts-ignore - Handle version differences
						if (texture.colorSpace !== undefined) {
							texture.colorSpace = THREE.SRGBColorSpace;
						} else if ((texture as any).encoding !== undefined) {
							(texture as any).encoding = (THREE as any).sRGBEncoding;
						}

						logoTextures.set(path, texture);
						resolve(texture);
					},
					undefined,
					(error) => {
						console.warn(`Failed to load logo: ${path}`, error);
						const fallbackTexture = createTextTexture(
							path.split("/").pop()?.split(".")[0]?.toUpperCase() || "AI",
							0xffffff,
						);
						logoTextures.set(path, fallbackTexture);
						resolve(fallbackTexture);
					},
				);
			});
		};

		const createLogoSprite = (
			texture: THREE.Texture,
			scale: number = 0.8,
			isGlow: boolean = false,
		): THREE.Sprite => {
			const spriteMaterial = new THREE.SpriteMaterial({
				map: texture,
				transparent: true,
				opacity: isGlow ? 0.06 : 1.0,
				alphaTest: 0.01,
				depthWrite: !isGlow,
				depthTest: true,
				sizeAttenuation: true,
			});

			const sprite = new THREE.Sprite(spriteMaterial);
			sprite.scale.set(scale * responsiveScale, scale * responsiveScale, 1);
			sprite.renderOrder = isGlow ? 0 : 10;

			return sprite;
		};

		const init = async () => {
			scene = new THREE.Scene();

			camera = new THREE.PerspectiveCamera(
				45,
				canvas.offsetWidth / canvas.offsetHeight,
				0.1,
				1000,
			);

			camera.position.set(0, 3.5, 0);
			camera.lookAt(0, 0, 0);

			renderer = new THREE.WebGLRenderer({
				canvas,
				alpha: true,
				antialias: window.innerWidth > 640,
			});
			renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
			renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
			renderer.setClearColor(0x000000, 0);

			// Add ambient light for better visibility
			const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
			scene.add(ambientLight);

			const particleTexture = createParticleTexture();

			// Create parent group
			solarSystemGroup = new THREE.Group();
			const systemPosition = getSolarSystemPosition();
			solarSystemGroup.position.set(
				systemPosition.x,
				systemPosition.y,
				systemPosition.z,
			);
			scene.add(solarSystemGroup);

			// ============ EQUALLY SPACED ORBITS ============
			// Starting from 0.6 and incrementing by 0.25 for each orbit
			const baseRadiusX = 0.6;
			const baseRadiusZ = 0.5;
			const radiusIncrement = 0.25;

			const aiCategories = [
				{
					name: "Chat AI",
					color: 0x3b82f6,
					orbit: {
						radiusX: baseRadiusX + radiusIncrement * 0,
						radiusZ: baseRadiusZ + radiusIncrement * 0 * 0.833,
						speed: 0.2 + Math.random() * 0.2,
						initialAngle: 0,
					},
					logo: AI_LOGOS.chat.gpt4,
					displayName: "GPT-4",
					icon: MessageSquare,
				},
				{
					name: "Image AI",
					color: 0x10b981,
					orbit: {
						radiusX: baseRadiusX + radiusIncrement * 1,
						radiusZ: baseRadiusZ + radiusIncrement * 1 * 0.833,
						speed: 0.2 + Math.random() * 0.2,
						initialAngle: (Math.PI * 2) / 5,
					},
					logo: AI_LOGOS.chat.gemini,
					displayName: "Midjourney",
					icon: Image,
				},
				{
					name: "Audio AI",
					color: 0x8b5cf6,
					orbit: {
						radiusX: baseRadiusX + radiusIncrement * 2,
						radiusZ: baseRadiusZ + radiusIncrement * 2 * 0.833,
						speed: 0.2 + Math.random() * 0.2,
						initialAngle: (Math.PI * 4) / 5,
					},
					logo: AI_LOGOS.chat.claude,
					displayName: "ElevenLabs",
					icon: Volume2,
				},
				{
					name: "Video AI",
					color: 0xec4899,
					orbit: {
						radiusX: baseRadiusX + radiusIncrement * 3,
						radiusZ: baseRadiusZ + radiusIncrement * 3 * 0.833,
						speed: 0.2 + Math.random() * 0.2,
						initialAngle: (Math.PI * 6) / 5,
					},
					logo: AI_LOGOS.chat.llama,
					displayName: "Sora",
					icon: Video,
				},
				{
					name: "Code AI",
					color: 0xf59e0b,
					orbit: {
						radiusX: baseRadiusX + radiusIncrement * 4,
						radiusZ: baseRadiusZ + radiusIncrement * 4 * 0.833,
						speed: 0.2 + Math.random() * 0.2,
						initialAngle: (Math.PI * 8) / 5,
					},
					logo: AI_LOGOS.chat.mistral,
					displayName: "Copilot",
					icon: Code,
				},
			];

			const createClustersWithLogos = async () => {
				// Pre-load all logos
				const logoLoadPromises: Promise<THREE.Texture>[] = [];

				aiCategories.forEach((category) => {
					logoLoadPromises.push(
						loadLogoTexture(category.logo).catch((error) => {
							console.warn(`Fallback for ${category.displayName}`, error);
							return createTextTexture(
								category.displayName.substring(0, 4),
								category.color,
							);
						}),
					);
				});

				await Promise.allSettled(logoLoadPromises);

				// Create clusters - LOGO ONLY, NO SPHERES
				aiCategories.forEach((category, categoryIndex) => {
					const clusterGroup = new THREE.Group();

					const angle = category.orbit.initialAngle;
					const x = category.orbit.radiusX * Math.cos(angle);
					const z = category.orbit.radiusZ * Math.sin(angle);
					clusterGroup.position.set(x, 0, z);

					clusterGroup.userData = {
						orbit: category.orbit,
						currentAngle: angle,
					};

					// Main Logo
					const logoTexture = logoTextures.get(category.logo);
					if (logoTexture) {
						// Very subtle background glow - same size as logo
						const glowSprite = createLogoSprite(logoTexture, 0.42, true);
						glowSprite.position.set(0, 0, -0.01);
						clusterGroup.add(glowSprite);

						// Main logo with better settings
						const logoSprite = createLogoSprite(logoTexture, 0.4, false);
						logoSprite.position.set(0, 0, 0);
						clusterGroup.add(logoSprite);
						clusterGroup.userData.mainLogo = logoSprite;
						clusterGroup.userData.glow = glowSprite;
					}

					// Colored ring BEHIND and LARGER for separation
					const ringGeometry = new THREE.RingGeometry(
						0.24 * responsiveScale,
						0.28 * responsiveScale,
						32,
					);
					const ringMaterial = new THREE.MeshBasicMaterial({
						color: category.color,
						transparent: true,
						opacity: 0.4,
						side: THREE.DoubleSide,
					});
					const ring = new THREE.Mesh(ringGeometry, ringMaterial);
					ring.position.set(0, 0, -0.03);
					ring.renderOrder = 1;
					clusterGroup.add(ring);
					clusterGroup.userData.ring = ring;

					// Minimal particles with better colors
					const particleCount = 8;
					const positions = new Float32Array(particleCount * 3);
					const velocities = new Float32Array(particleCount * 3);
					const colors = new Float32Array(particleCount * 3);
					const color = new THREE.Color(category.color);

					for (let i = 0; i < particleCount; i++) {
						const radius = (0.3 + Math.random() * 0.2) * responsiveScale;
						const theta = Math.random() * Math.PI * 2;
						const phi = Math.random() * Math.PI;

						positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
						positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
						positions[i * 3 + 2] = radius * Math.cos(phi);

						velocities[i * 3] = (Math.random() - 0.5) * 0.001 * responsiveScale;
						velocities[i * 3 + 1] =
							(Math.random() - 0.5) * 0.001 * responsiveScale;
						velocities[i * 3 + 2] =
							(Math.random() - 0.5) * 0.001 * responsiveScale;

						colors[i * 3] = color.r;
						colors[i * 3 + 1] = color.g;
						colors[i * 3 + 2] = color.b;
					}

					const particleGeometry = new THREE.BufferGeometry();
					particleGeometry.setAttribute(
						"position",
						new THREE.BufferAttribute(positions, 3),
					);
					particleGeometry.setAttribute(
						"color",
						new THREE.BufferAttribute(colors, 3),
					);

					const particleMaterial = new THREE.PointsMaterial({
						size: 0.006 * responsiveScale,
						vertexColors: true,
						transparent: true,
						opacity: 0.6,
						blending: THREE.AdditiveBlending,
						depthWrite: false,
					});

					const particles = new THREE.Points(
						particleGeometry,
						particleMaterial,
					);
					particles.userData = { velocities };
					clusterGroup.add(particles);

					solarSystemGroup.add(clusterGroup);

					aiClusters.push({
						group: clusterGroup,
						mainLogo: clusterGroup.userData.mainLogo,
						glow: clusterGroup.userData.glow,
						ring: clusterGroup.userData.ring,
						particles,
						color: category.color,
						orbit: category.orbit,
					});
				});

				// Clean orbit paths with better visibility
				aiClusters.forEach((cluster) => {
					const orbitGeometry = new THREE.EllipseCurve(
						0,
						0,
						cluster.orbit.radiusX,
						cluster.orbit.radiusZ,
						0,
						2 * Math.PI,
						false,
						0,
					);

					const points = orbitGeometry.getPoints(64);
					const orbitPoints = points.map(
						(point) => new THREE.Vector3(point.x, 0, point.y),
					);

					const curve = new THREE.CatmullRomCurve3(orbitPoints);
					const tubeGeometry = new THREE.TubeGeometry(
						curve,
						64,
						0.02 * responsiveScale,
						6,
						false,
					);

					const orbitMaterial = new THREE.MeshBasicMaterial({
						color: cluster.color,
						transparent: true,
						opacity: 0.1,
						side: THREE.DoubleSide,
						depthWrite: false,
					});

					const orbitTube = new THREE.Mesh(tubeGeometry, orbitMaterial);
					orbitTube.renderOrder = -1;
					solarSystemGroup.add(orbitTube);
				});
			};

			// ============ IMPROVED CENTRAL HUB ============
			const createCentralHubWithLogo = async () => {
				centralHub = new THREE.Group();
				centralHub.position.set(0.03, 0, 0);

				// Large central Queryo logo - BIGGER and CLEARER
				try {
					const queryoTexture = await loadLogoTexture(AI_LOGOS.hub);

					// Minimal glow - SAME SIZE as main logo
					const glowSprite = createLogoSprite(queryoTexture, 1.1, true);
					glowSprite.position.set(0, 0, -0.01);
					centralHub.add(glowSprite);

					// Main logo - LARGER and CRISP
					const queryoLogo = createLogoSprite(queryoTexture, 1.0, false);
					queryoLogo.position.set(0, 0, 0);
					queryoLogo.renderOrder = 100;
					centralHub.add(queryoLogo);
					centralHub.userData.logo = queryoLogo;
					centralHub.userData.glow = glowSprite;

					console.log("✅ Central hub logo loaded");
				} catch (error) {
					console.warn("⚠️ Using fallback hub logo");
					const fallbackTexture = createTextTexture("QUERYO", 0xff6b35);

					const glowSprite = createLogoSprite(fallbackTexture, 1.1, true);
					centralHub.add(glowSprite);

					const fallbackLogo = createLogoSprite(fallbackTexture, 1.0, false);
					fallbackLogo.renderOrder = 100;
					centralHub.add(fallbackLogo);
					centralHub.userData.logo = fallbackLogo;
					centralHub.userData.glow = glowSprite;
				}

				solarSystemGroup.add(centralHub);
			};

			// Await both async functions
			await createClustersWithLogos();
			await createCentralHubWithLogo();

			// Ambient particles
			const ambientCount = particleCounts.ambient;
			const ambientPositions = new Float32Array(ambientCount * 3);
			const ambientColors = new Float32Array(ambientCount * 3);
			const ambientVelocities = new Float32Array(ambientCount * 3);

			for (let i = 0; i < ambientCount; i++) {
				ambientPositions[i * 3] = (Math.random() - 0.5) * 9 * responsiveScale;
				ambientPositions[i * 3 + 1] =
					(Math.random() - 0.5) * 9 * responsiveScale;
				ambientPositions[i * 3 + 2] =
					(Math.random() - 0.5) * 7 * responsiveScale;

				ambientVelocities[i * 3] = (Math.random() - 0.5) * 0.006;
				ambientVelocities[i * 3 + 1] = (Math.random() - 0.5) * 0.006;
				ambientVelocities[i * 3 + 2] = (Math.random() - 0.5) * 0.006;

				const color = new THREE.Color();
				color.setHSL(0.05 + Math.random() * 0.15, 0.8, 0.6);
				ambientColors[i * 3] = color.r;
				ambientColors[i * 3 + 1] = color.g;
				ambientColors[i * 3 + 2] = color.b;
			}

			const ambientGeometry = new THREE.BufferGeometry();
			ambientGeometry.setAttribute(
				"position",
				new THREE.BufferAttribute(ambientPositions, 3),
			);
			ambientGeometry.setAttribute(
				"color",
				new THREE.BufferAttribute(ambientColors, 3),
			);

			const ambientMaterial = new THREE.PointsMaterial({
				size: 0.01 * responsiveScale,
				vertexColors: true,
				transparent: true,
				opacity: 0.5,
				blending: THREE.AdditiveBlending,
				map: particleTexture,
				alphaTest: 0.1,
			});

			const ambientParticles = new THREE.Points(
				ambientGeometry,
				ambientMaterial,
			);
			ambientParticles.userData = { velocities: ambientVelocities };
			scene.add(ambientParticles);
		};

		// Animate function
		const animate = () => {
			const time = Date.now() * 0.001;

			// Orbital motion
			aiClusters.forEach((cluster, index) => {
				cluster.group.userData.currentAngle += cluster.orbit.speed * 0.01;
				const angle = cluster.group.userData.currentAngle;

				const x = cluster.orbit.radiusX * Math.cos(angle);
				const z = cluster.orbit.radiusZ * Math.sin(angle);

				cluster.group.position.set(x, 0, z);

				// Make logos always face camera
				if (cluster.mainLogo) {
					cluster.mainLogo.quaternion.copy(camera.quaternion);
				}
				if (cluster.glow) {
					cluster.glow.quaternion.copy(camera.quaternion);
				}

				// More subtle pulse on main logo
				if (cluster.mainLogo) {
					const pulse = Math.sin(time * 2 + index) * 0.03 + 1;
					cluster.mainLogo.scale.set(
						0.6 * responsiveScale * pulse,
						0.6 * responsiveScale * pulse,
						1,
					);
				}

				// Rotate ring
				if (cluster.ring) {
					cluster.ring.rotation.z += 0.01;
				}

				// Update particles
				if (cluster.particles) {
					cluster.particles.rotation.y += 0.005;

					const positions =
						cluster.particles.geometry.attributes.position.array;
					const velocities = cluster.particles.userData.velocities;

					for (let i = 0; i < positions.length; i += 3) {
						positions[i] += velocities[i];
						positions[i + 1] += velocities[i + 1];
						positions[i + 2] += velocities[i + 2];

						const distance = Math.sqrt(
							positions[i] ** 2 + positions[i + 1] ** 2 + positions[i + 2] ** 2,
						);

						if (
							distance > 0.5 * responsiveScale ||
							distance < 0.25 * responsiveScale
						) {
							velocities[i] *= -1;
							velocities[i + 1] *= -1;
							velocities[i + 2] *= -1;
						}
					}
					cluster.particles.geometry.attributes.position.needsUpdate = true;
				}
			});

			// Central hub animation
			centralHub.rotation.y += 0.002;

			// Make central logo always face camera
			if (centralHub.userData.logo) {
				centralHub.userData.logo.quaternion.copy(camera.quaternion);
			}
			if (centralHub.userData.glow) {
				centralHub.userData.glow.quaternion.copy(camera.quaternion);
			}

			// Rotate ring
			centralHub.children.forEach((child) => {
				if (child.userData.rotationSpeed) {
					child.rotation.z += child.userData.rotationSpeed;
				}
			});

			// Very gentle pulse on central logo
			const hubPulse = Math.sin(time * 1.5) * 0.015 + 1;
			if (centralHub.userData.logo) {
				centralHub.userData.logo.scale.set(
					1.2 * getCentralHubScale() * hubPulse,
					1.2 * getCentralHubScale() * hubPulse,
					1,
				);
			}

			// Animate ambient particles
			scene.children.forEach((child) => {
				if (child instanceof THREE.Points && child.userData.velocities) {
					const positions = child.geometry.attributes.position.array;
					const velocities = child.userData.velocities;

					for (let i = 0; i < positions.length; i += 3) {
						positions[i] += velocities[i];
						positions[i + 1] += velocities[i + 1];
						positions[i + 2] += velocities[i + 2];

						if (Math.abs(positions[i]) > 4.5 * responsiveScale)
							velocities[i] *= -1;
						if (Math.abs(positions[i + 1]) > 4.5 * responsiveScale)
							velocities[i + 1] *= -1;
						if (Math.abs(positions[i + 2]) > 3.5 * responsiveScale)
							velocities[i + 2] *= -1;
					}
					child.geometry.attributes.position.needsUpdate = true;
				}
			});

			camera.lookAt(0, 0, 0);
			renderer.render(scene, camera);
			animationFrameId = requestAnimationFrame(animate);
		};

		const handleResize = () => {
			if (!canvas || !canvas.offsetWidth) return;

			responsiveScale = getResponsiveScale();
			particleCounts = getResponsiveParticleCount();

			camera.aspect = canvas.offsetWidth / canvas.offsetHeight;
			camera.updateProjectionMatrix();

			renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
		};

		window.addEventListener("resize", handleResize);

		// Call async init and handle it properly
		try {
			init()
				.then(() => {
					animate();
				})
				.catch((error) => {
					console.error("Three.js initialization error:", error);
				});
		} catch (error) {
			console.error("Three.js error:", error);
		}

		return () => {
			window.removeEventListener("resize", handleResize);
			if (animationFrameId) cancelAnimationFrame(animationFrameId);

			// Dispose textures
			logoTextures.forEach((texture) => texture.dispose());
			logoTextures.clear();

			if (renderer) renderer.dispose();
		};
	}, [isLoading]);

	return (
		<div className="grain">
			{/* Loader */}
			{isLoading && <Loader onComplete={handleLoaderComplete} />}
			{/* Hero Section */}
			<div ref={heroRef} className="relative min-h-screen overflow-hidden ">
				<canvas
					ref={canvasRef}
					className="absolute inset-0 w-full h-full rounded-2xl "
				/>
				<div className="relative max-w-7xl mx-auto px-6 pt-16 pb-24 bg-transparent">
					<div className="grid lg:grid-cols-2 gap-16 items-center min-h-[85vh] bg-transparent">
						<div
							ref={leftContentRef}
							className="space-y-10 z-10 transition-all duration-100 bg-transparent"
						>
							<div className="space-y-6">
								<div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-100 rounded-full shadow-sm">
									<div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></div>
									<span className="text-sm font-medium text-amber-900">
										One Platform, Infinite Intelligence
									</span>
								</div>

								<h1 className="text-6xl lg:text-7xl xl:text-8xl font-bold text-[#1a1a1a] leading-[1.05] tracking-tight">
									Every AI.
									<span className="block mt-2 text-transparent bg-clip-text bg-linear-to-r from-amber-600 via-orange-600 to-amber-700">
										Your Choice.
									</span>
								</h1>

								<p className="text-xl lg:text-2xl text-[#4a4a4a] leading-relaxed max-w-xl">
									Stop juggling between 20+ different AI tools. Queryo unifies
									chat, image, audio, video, and code AI—all in one seamless
									platform.
								</p>
							</div>

							<div className="flex flex-col sm:flex-row gap-4">
								<button className="group px-8 py-4 bg-linear-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl hover:scale-[1.02]">
									<span>Start Free Trial</span>
									<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
								</button>
								<button
									onClick={() => setShowVideoModal(true)}
									className="px-8 py-4 bg-white hover:bg-amber-50 text-[#1a1a1a] rounded-xl font-semibold border-2 border-[#e0e0e0] hover:border-amber-300 transition-all duration-300 shadow-sm hover:shadow-md"
								>
									Watch Demo
								</button>
							</div>
						</div>

						<div
							ref={rightVisualizationRef}
							className="relative  h-[600px] lg:h-[700px] transition-all duration-100 overflow-visible"
						>
							<div className="absolute bottom-2 lg:bottom-16 flex justify-end gap-3 flex-wrap-reverse">
								{/* Floating labels for context */}
								<div className="  px-4 py-2 bg-blue-500/10 backdrop-blur-sm border border-blue-500/30 rounded-lg">
									<p className="text-sm font-semibold text-blue-700">
										Chat Models
									</p>
								</div>
								<div className="  px-4 py-2 bg-green-500/10 backdrop-blur-sm border border-green-500/30 rounded-lg">
									<p className="text-sm font-semibold text-green-700">
										Image AI
									</p>
								</div>
								<div className=" px-6 py-3 bg-orange-500/50 backdrop-blur-md border-2 border-orange-500/50 rounded-xl shadow-lg">
									<p className="text-sm font-bold text-orange-800">QUERYO</p>
								</div>
								<div className="  px-4 py-2 bg-purple-500/10 backdrop-blur-sm border border-purple-500/30 rounded-lg">
									<p className="text-sm font-semibold text-purple-700">
										Audio AI
									</p>
								</div>
								<div className="  px-4 py-2 bg-pink-500/10 backdrop-blur-sm border border-pink-500/30 rounded-lg">
									<p className="text-sm font-semibold text-pink-700">
										Video AI
									</p>
								</div>
							</div>
						</div>
					</div>

					<div className="mt-20 pt-12 border-t border-[#e0e0e0]/50">
						<div className="grid grid-cols-2 md:grid-cols-4 gap-8">
							{[
								{ metric: "20+", label: "AI Models" },
								{ metric: "5", label: "Categories" },
								{ metric: "Real-time", label: "Switching" },
								{ metric: "99.9%", label: "Uptime" },
							].map((stat, idx) => (
								<div key={idx} className="text-center space-y-2">
									<div className="text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-linear-to-r from-amber-600 to-orange-600">
										{stat.metric}
									</div>
									<div className="text-sm text-[#666] font-medium">
										{stat.label}
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>

			{/* Horizontal Features */}
			<section
				ref={horizontalSectionRef}
				className="relative grain overflow-hidden"
				id="features"
			>
				<div className="h-screen flex items-center">
					<div
						ref={horizontalContainerRef}
						className="flex"
						style={{
							width:
								viewportWidth >= 1024
									? `${features.length * 50}vw`
									: `${features.length * 100}vw`,
						}}
					>
						{features
							.slice()
							.reverse()
							.map((feature, index) => {
								const Icon = feature.icon;
								return (
									<div
										key={index}
										className="w-screen lg:w-[50vw] h-screen shrink-0 flex items-center justify-center px-4 sm:px-6 md:px-8 py-8 sm:py-10 md:py-12"
									>
										<div className="w-full max-w-6xl lg:max-w-2xl xl:max-w-3xl sm:pt-12 ">
											<div
												className={`feature-card relative bg-linear-to-br ${feature.bgGradient} rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-8 xl:p-10 shadow-2xl border border-white/60 backdrop-blur-sm overflow-hidden w-full h-[500px] sm:h-[520px] md:h-[540px] lg:h-[480px] xl:h-[480px] flex flex-col transition-all duration-300 cursor-pointer transform-gpu`}
											>
												{/* Background decoration */}
												<div className="absolute top-0 right-0 w-32 sm:w-48 md:w-64 h-32 sm:h-48 md:h-64 bg-linear-to-br from-white/40 to-transparent rounded-full blur-xl sm:blur-2xl -mr-16 sm:-mr-24 md:-mr-32 -mt-16 sm:-mt-24 md:-mt-32"></div>
												<div className="absolute bottom-0 left-0 w-32 sm:w-48 md:w-64 h-32 sm:h-48 md:h-64 bg-linear-to-tr from-white/40 to-transparent rounded-full blur-xl sm:blur-2xl -ml-16 sm:-ml-24 md:-ml-32 -mb-16 sm:-mb-24 md:-mb-32"></div>

												<div className="relative z-10 flex flex-col lg:flex-row items-start gap-4 sm:gap-6 md:gap-8 h-full">
													{/* Icon Section */}
													<div className="shrink-0 w-full lg:w-auto flex justify-center lg:justify-start">
														<div className="relative feature-icon transform-gpu">
															<div
																className={`absolute inset-0 bg-linear-to-br ${feature.gradient} rounded-xl sm:rounded-2xl blur-lg sm:blur-xl opacity-20`}
															></div>
															<div
																className={`relative w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 lg:w-16 lg:h-16 xl:w-20 xl:h-20 bg-linear-to-br ${feature.gradient} rounded-xl sm:rounded-2xl flex items-center justify-center shadow-2xl transition-transform duration-300`}
															>
																<Icon
																	className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-8 lg:h-8 xl:w-10  text-white transition-transform duration-300"
																	strokeWidth={1.5}
																/>
															</div>
														</div>
													</div>

													{/* Content Section */}
													<div className="flex-1 space-y-2.5 sm:space-y-3 md:space-y-4 lg:space-y-3 flex flex-col justify-between min-h-0">
														<div className="space-y-1.5 sm:space-y-2 lg:space-y-1.5">
															<div className="flex items-center gap-3 justify-center lg:justify-start">
																<span
																	className={`feature-badge inline-flex items-center gap-2 px-2.5 py-1 ${feature.statusColor} text-white text-xs font-bold rounded-full h-5 transition-transform duration-300`}
																>
																	<span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
																	{feature.status}
																</span>
															</div>

															<p
																className={`text-xs sm:text-sm font-bold ${feature.iconColor} uppercase tracking-wider text-center lg:text-left`}
															>
																{feature.subtitle}
															</p>

															<h3 className="feature-title text-xl sm:text-2xl md:text-2xl lg:text-2xl xl:text-3xl font-bold text-gray-900 leading-tight line-clamp-2 text-center lg:text-left">
																{feature.title}
															</h3>

															<div className="h-10 sm:h-12 md:h-14 lg:h-14 overflow-hidden">
																<p className="feature-description text-sm sm:text-base md:text-base lg:text-base xl:text-lg text-gray-600 leading-relaxed text-center lg:text-left">
																	{feature.description}
																</p>
															</div>
														</div>

														{/* Features Grid */}
														<div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 flex-1 min-h-0">
															{feature.features.slice(0, 4).map((item, idx) => {
																const ItemIcon = item.icon;
																return (
																	<div
																		key={idx}
																		className="feature-item flex items-start gap-2 sm:gap-2.5 p-2 sm:p-2.5 bg-white/60 backdrop-blur-sm rounded-lg border border-white/80 shadow-sm hover:shadow-md transition-all duration-300 h-10 sm:h-13 lg:h-15 cursor-pointer transform-gpu"
																	>
																		<div
																			className={`shrink-0 w-4 h-4 sm:w-4.5 sm:h-4.5 lg:w-4 lg:h-4 rounded-md bg-linear-to-br ${feature.gradient} flex items-center justify-center transition-transform duration-300`}
																		>
																			<ItemIcon
																				className="w-2.5 h-2.5 sm:w-2.5 sm:h-2.5 lg:w-2.5 lg:h-2.5 text-white"
																				strokeWidth={3}
																			/>
																		</div>
																		<span className="text-xs sm:text-sm lg:text-xs xl:text-sm font-medium text-gray-900 leading-snug line-clamp-2">
																			{item.text}
																		</span>
																	</div>
																);
															})}
														</div>

														{/* CTA Button */}
														<div className="pt-1 sm:pt-2 flex justify-center lg:justify-start">
															<button
																className={`feature-cta group px-5 sm:px-6 lg:px-5 xl:px-6 py-2 sm:py-2.5 lg:py-2 xl:py-2.5 bg-linear-to-r ${feature.gradient} hover:shadow-2xl text-white rounded-lg font-semibold text-sm sm:text-base lg:text-sm xl:text-base transition-all duration-300 flex items-center gap-2 shadow-lg min-h-9 lg:min-h-[34px] xl:min-h-[38px] transform-gpu`}
															>
																<span>
																	{feature.status === "Live"
																		? "Try Now"
																		: feature.status === "Beta"
																		? "Join Beta"
																		: "Join Waitlist"}
																</span>
																<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
															</button>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								);
							})}
					</div>
				</div>
			</section>

			{/* Final CTA - Unified Experience */}
			<section className="relative rounded-2xl sm:rounded-3xl py-16 md:py-20 bg-linear-to-br from-amber-50 via-orange-50 to-amber-50 overflow-hidden mt-12 mx-auto max-w-7xl">
				<div className="absolute inset-0 opacity-20">
					<div className="absolute top-1/4 left-1/4 w-72 h-72 bg-amber-200 rounded-full blur-3xl animate-pulse"></div>
					<div
						className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-orange-200 rounded-full blur-3xl animate-pulse"
						style={{ animationDelay: "1s" }}
					></div>
				</div>

				<div className="relative container mx-auto px-6 md:px-8">
					<div className="max-w-5xl mx-auto text-center space-y-8">
						<div className="inline-flex items-center gap-2 px-5 py-2 bg-white/80 backdrop-blur-sm border border-amber-200 rounded-full shadow-sm">
							<Sparkles className="w-4 h-4 text-amber-600" />
							<span className="text-sm font-semibold text-amber-900">
								The Ultimate Unified Experience
							</span>
						</div>

						<div className="space-y-4">
							<h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1a1a1a] leading-tight">
								One Platform.
								<span className="block mt-2 text-transparent bg-clip-text bg-linear-to-r from-amber-600 via-orange-600 to-amber-700">
									Limitless Possibilities.
								</span>
							</h2>
							<p className="text-lg md:text-xl text-[#4a4a4a] max-w-3xl mx-auto leading-relaxed">
								Stop juggling multiple tools. Queryo unifies AI conversations,
								image processing, voice synthesis, and video generation in one
								seamless workspace.
							</p>
						</div>

						<div className="flex flex-wrap justify-center gap-3 pt-2">
							{[
								"Unified Dashboard",
								"Single Sign-On",
								"Cross-Feature Workflows",
								"Centralized Billing",
								"24/7 Support",
								"API Access",
							].map((pill, idx) => (
								<div
									key={idx}
									className="px-4 py-2 bg-white/80 backdrop-blur-sm border border-amber-100 rounded-lg shadow-sm"
								>
									<span className="text-sm font-medium text-[#1a1a1a]">
										{pill}
									</span>
								</div>
							))}
						</div>

						<div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 pt-6">
							{[
								{ value: "20+", label: "AI Models" },
								{ value: "50+", label: "Features" },
								{ value: "100K+", label: "Users" },
								{ value: "4.9/5", label: "Rating" },
							].map((stat, idx) => (
								<div key={idx} className="space-y-1">
									<div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-linear-to-r from-amber-600 to-orange-600">
										{stat.value}
									</div>
									<div className="text-sm text-[#666] font-medium">
										{stat.label}
									</div>
								</div>
							))}
						</div>

						<div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
							<button className="group px-10 py-4 bg-linear-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl hover:scale-[1.02]">
								<span>Get Started Free</span>
								<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
							</button>
							<button className="px-10 py-4 bg-white hover:bg-amber-50 text-[#1a1a1a] rounded-xl font-bold text-lg border-2 border-amber-200 hover:border-amber-300 transition-all duration-300 shadow-sm">
								Schedule a Demo
							</button>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default MultiLLMHero;
