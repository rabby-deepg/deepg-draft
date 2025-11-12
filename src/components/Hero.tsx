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

gsap.registerPlugin(ScrollTrigger);

interface Position {
	x: number;
	y: number;
}

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
		const connectionLines: THREE.Line[] = [];
		let centralHub: THREE.Group;
		let animationFrameId: number;
		let mouseX = 0,
			mouseY = 0;
		let scrollY = 0;
		let targetCameraZ = 15;

		// Responsive scaling factors based on screen size
		const getResponsiveScale = () => {
			const width = window.innerWidth;
			if (width < 640) return 0.8; // mobile
			if (width < 1024) return 0.8; // tablet
			return 1; // desktop
		};

		const getCentralHubScale = () => {
			const width = window.innerWidth;
			if (width < 640) return 0.27; // mobile
			if (width < 1024) return 0.8; // tablet
			return 1; // desktop
		};

		const getHubPosition = () => {
			const width = window.innerWidth;
			if (width < 640) {
				return { x: 0, y: -2.5, z: 0 }; // Mobile - small adjustment
			}
			if (width < 1024) {
				return { x: -1.7, y: -1.4, z: 0 }; // Tablet - medium adjustment
			}
			return { x: 3, y: 3, z: 0 }; // Desktop - larger adjustment
		};

		// Add movement boundaries based on device size
		const getMovementBoundaries = () => {
			const width = window.innerWidth;
			if (width < 640) {
				return { x: 1.0, y: 0.2, z: 0.2 }; // Mobile - moderate movement
			}
			if (width < 1024) {
				return { x: 0.2, y: 0.2, z: 0.2 }; // Tablet - less movement
			}
			return { x: 0.2, y: 0.2, z: 0.2 }; // Desktop - minimal movement
		};

		// Add safe zones to avoid text areas (adjust based on your layout)
		const getSafeZones = () => {
			const width = window.innerWidth;
			// These values represent how close clusters can get to screen edges
			// Adjust based on where your text is positioned
			if (width < 640) {
				return { right: 3, left: 3, top: 2, bottom: 2 };
			}
			if (width < 1024) {
				return { right: 4, left: 4, top: 3, bottom: 3 };
			}
			return { right: 8, left: 6, top: 3, bottom: 4 }; // Desktop - more restriction on right where text might be
		};

		const getResponsiveCameraZ = () => {
			const width = window.innerWidth;
			if (width < 640) return 22; // mobile - pull back more
			if (width < 1024) return 18; // tablet
			return 15; // desktop
		};

		const getResponsiveParticleCount = () => {
			const width = window.innerWidth;
			if (width < 640) return { cluster: 8, ambient: 200, hub: 100 }; // mobile - reduce particles
			if (width < 1024) return { cluster: 12, ambient: 400, hub: 200 }; // tablet
			return { cluster: 6, ambient: 700, hub: 400 }; // desktop
		};

		let responsiveScale = getResponsiveScale();
		let responsiveCameraZ = getResponsiveCameraZ();
		let particleCounts = getResponsiveParticleCount();

		// Function to create circular particle texture
		const createParticleTexture = () => {
			const canvas = document.createElement("canvas");
			canvas.width = 32;
			canvas.height = 32;
			const context = canvas.getContext("2d")!;

			// Create circular gradient for smooth circular particles
			const gradient = context.createRadialGradient(16, 16, 0, 16, 16, 16);
			gradient.addColorStop(0, "rgba(255,255,255,1)");
			gradient.addColorStop(0.4, "rgba(255,255,255,0.8)");
			gradient.addColorStop(1, "rgba(255,255,255,0)");

			context.fillStyle = gradient;
			context.fillRect(0, 0, 32, 32);

			const texture = new THREE.CanvasTexture(canvas);
			return texture;
		};

		const init = () => {
			scene = new THREE.Scene();

			camera = new THREE.PerspectiveCamera(
				70,
				canvas.offsetWidth / canvas.offsetHeight,
				0.1,
				1000,
			);
			// Add responsive camera X offset to shift view right on desktop
			const getCameraXOffset = () => {
				const width = window.innerWidth;
				if (width < 768) return 0; // mobile - keep centered
				if (width < 1024) return 10; // tablet - slight shift
				return -10; // desktop - shift right (increase to move hub more left visually)
			};

			camera.position.set(getCameraXOffset(), 0, responsiveCameraZ);
			targetCameraZ = responsiveCameraZ;

			renderer = new THREE.WebGLRenderer({
				canvas,
				alpha: true,
				antialias: window.innerWidth > 640, // Disable antialiasing on mobile for performance
			});
			renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
			renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
			renderer.setClearColor(0x000000, 0);

			// Create particle texture once for reuse
			const particleTexture = createParticleTexture();

			// AI Categories with specific models - scaled positions
			const aiCategories = [
				{
					name: "Chat AI",
					color: 0x3b82f6,
					position: {
						x: -3 * responsiveScale, // Reduced from -6
						y: 3 * responsiveScale, // Reduced from 4
						z: -2 * responsiveScale,
					},
					models: ["GPT-4", "Claude", "Gemini", "LLaMA"],
					icon: MessageSquare,
				},
				{
					name: "Image AI",
					color: 0x10b981,
					position: { x: 9 * responsiveScale, y: 5 * responsiveScale, z: -0.5 },
					models: ["DALL-E", "Midjourney", "Stable Diff", "Flux"],
					icon: Image,
				},
				{
					name: "Audio AI",
					color: 0x8b5cf6,
					position: {
						x: -1 * responsiveScale,
						y: -1 * responsiveScale,
						z: 1 * responsiveScale,
					},
					models: ["ElevenLabs", "Whisper", "Suno", "MusicGen"],
					icon: Volume2,
				},
				{
					name: "Video AI",
					color: 0xec4899,
					position: {
						x: 7 * responsiveScale,
						y: -2 * responsiveScale,
						z: -1 * responsiveScale,
					},
					models: ["Sora", "Runway", "Pika", "Luma"],
					icon: Video,
				},
				
			];

			// Create AI Clusters with floating particles
			aiCategories.forEach((category) => {
				const clusterGroup = new THREE.Group();
				clusterGroup.position.set(
					category.position.x,
					category.position.y,
					category.position.z,
				);
				clusterGroup.userData = {
					basePosition: { ...category.position },
					targetPosition: { ...category.position },
					chaosOffset: { x: 0, y: 0, z: 0 },
				};

				// Main cluster sphere (represents the category) - scaled size
				const sphereGeometry = new THREE.SphereGeometry(
					0.6 * responsiveScale,
					32,
					32,
				);
				const sphereMaterial = new THREE.MeshBasicMaterial({
					color: category.color,
					transparent: true,
					opacity: 0.7,
					wireframe: true,
				});
				const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
				clusterGroup.add(sphere);

				// Inner solid sphere for depth
				const innerSphereGeo = new THREE.SphereGeometry(
					0.3 * responsiveScale,
					16,
					16,
				);
				const innerSphereMat = new THREE.MeshBasicMaterial({
					color: category.color,
					transparent: true,
					opacity: 0.4,
				});
				const innerSphere = new THREE.Mesh(innerSphereGeo, innerSphereMat);
				clusterGroup.add(innerSphere);

				// Glow effect - larger and more visible
				const glowGeometry = new THREE.SphereGeometry(
					0.7 * responsiveScale,
					32,
					32,
				);
				const glowMaterial = new THREE.MeshBasicMaterial({
					color: category.color,
					transparent: true,
					opacity: 0.3,
				});
				const glow = new THREE.Mesh(glowGeometry, glowMaterial);
				clusterGroup.add(glow);

				// Orbiting particles (individual AI models) - responsive count
				const particleCount = category.models.length * particleCounts.cluster;
				const positions = new Float32Array(particleCount * 3);
				const velocities = new Float32Array(particleCount * 3);
				const colors = new Float32Array(particleCount * 3);
				const color = new THREE.Color(category.color);

				for (let i = 0; i < particleCount; i++) {
					const radius = (1.5 + Math.random() * 2) * responsiveScale;
					const theta = Math.random() * Math.PI * 2;
					const phi = Math.random() * Math.PI;

					positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
					positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
					positions[i * 3 + 2] = radius * Math.cos(phi);

					// Random velocities for chaotic motion - scaled
					velocities[i * 3] = (Math.random() - 0.5) * 0.02 * responsiveScale;
					velocities[i * 3 + 1] =
						(Math.random() - 0.5) * 0.02 * responsiveScale;
					velocities[i * 3 + 2] =
						(Math.random() - 0.5) * 0.02 * responsiveScale;

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
					size: 0.06 * responsiveScale,
					vertexColors: true,
					transparent: true,
					opacity: 0.9,
					blending: THREE.AdditiveBlending,
					map: particleTexture, // ADDED: Circular texture for particles
					alphaTest: 0.1, // ADDED: Better transparency handling
				});

				const particles = new THREE.Points(particleGeometry, particleMaterial);
				particles.userData = { velocities };
				clusterGroup.add(particles);

				scene.add(clusterGroup);

				const movementBoundaries = getMovementBoundaries();

				aiClusters.push({
					group: clusterGroup,
					sphere,
					innerSphere,
					glow,
					particles,
					color: category.color,
					basePosition: { ...category.position },
					rotationSpeed: 0.003 + Math.random() * 0.005,
					// SIGNIFICANTLY REDUCED movement for all devices, especially desktop
					chaosAmplitude:
						(0.3 + Math.random() * 0.2) *
						responsiveScale *
						movementBoundaries.x,
					movementBounds: movementBoundaries, // Add bounds to each cluster
				});
			});

			// Create chaotic connection lines between all clusters - animated
			const lineMaterial = new THREE.LineBasicMaterial({
				color: 0xff6b35,
				transparent: true,
				opacity: 0.2,
				linewidth: 2,
			});

			// Store hub reference for connections
			let hubReference: THREE.Group;

			for (let i = 0; i < aiClusters.length; i++) {
				for (let j = i + 1; j < aiClusters.length; j++) {
					const points = [
						aiClusters[i].group.position.clone(),
						aiClusters[j].group.position.clone(),
					];
					const geometry = new THREE.BufferGeometry().setFromPoints(points);
					const line = new THREE.Line(geometry, lineMaterial);
					line.userData = {
						start: i,
						end: j,
						pulseOffset: Math.random() * Math.PI * 2,
					};
					scene.add(line);
					connectionLines.push(line);
				}
			}

			// Central Queryo Hub (unified solution) - scaled
			centralHub = new THREE.Group();

			// CHANGED: Use responsive hub position
			const hubPosition = getHubPosition();
			const centralHubScale = getCentralHubScale();

			centralHub.position.set(
				hubPosition.x * responsiveScale,
				hubPosition.y * responsiveScale,
				hubPosition.z,
			);

			// Main hub sphere - larger
			const hubGeometry = new THREE.SphereGeometry(
				2.5 * centralHubScale,
				64,
				64,
			);

			const hubMaterial = new THREE.MeshBasicMaterial({
				color: 0xff6b35,
				transparent: true,
				opacity: 0.8,
				wireframe: true,
			});

			const hubSphere = new THREE.Mesh(hubGeometry, hubMaterial);

			centralHub.add(hubSphere);

			// Inner solid hub
			const hubInnerGeo = new THREE.SphereGeometry(
				3.3 * centralHubScale,
				32,
				32,
			);
			const hubInnerMat = new THREE.MeshBasicMaterial({
				color: 0xff6b35,
				transparent: true,
				opacity: 0.3,
			});
			const hubInner = new THREE.Mesh(hubInnerGeo, hubInnerMat);
			centralHub.add(hubInner);

			// Hub glow - more prominent
			const hubGlowGeometry = new THREE.SphereGeometry(
				2.6 * centralHubScale,
				32,
				32,
			);
			const hubGlowMaterial = new THREE.MeshBasicMaterial({
				color: 0xffa500,
				transparent: true,
				opacity: 0.25,
			});
			const hubGlow = new THREE.Mesh(hubGlowGeometry, hubGlowMaterial);
			centralHub.add(hubGlow);

			// Orbiting rings around hub - more dynamic, scaled
			const ringCount = window.innerWidth < 640 ? 3 : 4; // Fewer rings on mobile
			for (let i = 0; i < ringCount; i++) {
				const ringGeometry = new THREE.TorusGeometry(
					(2 + i * 0.9) * centralHubScale,
					0.05 * centralHubScale,
					16,
					100,
				);
				const ringMaterial = new THREE.MeshBasicMaterial({
					color: i % 2 === 0 ? 0xffa500 : 0xff6b35,
					transparent: true,
					opacity: 0.5,
				});
				const ring = new THREE.Mesh(ringGeometry, ringMaterial);
				ring.rotation.x = Math.PI / 2 + (i * Math.PI) / 8;
				ring.rotation.y = (i * Math.PI) / 5;
				ring.userData = { rotationSpeed: 0.001 * (i + 1) };
				centralHub.add(ring);
			}

			// Hub particles - concentrated around center - responsive count
			const hubParticleCount = particleCounts.hub;
			const hubParticlePos = new Float32Array(hubParticleCount * 3);
			const hubParticleColors = new Float32Array(hubParticleCount * 3);

			for (let i = 0; i < hubParticleCount; i++) {
				const radius = (2 + Math.random() * 2) * responsiveScale;
				const theta = Math.random() * Math.PI * 2;
				const phi = Math.random() * Math.PI;

				hubParticlePos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
				hubParticlePos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
				hubParticlePos[i * 3 + 2] = radius * Math.cos(phi);

				const color = new THREE.Color(
					Math.random() > 0.5 ? 0xff6b35 : 0xffa500,
				);
				hubParticleColors[i * 3] = color.r;
				hubParticleColors[i * 3 + 1] = color.g;
				hubParticleColors[i * 3 + 2] = color.b;
			}

			const hubParticleGeo = new THREE.BufferGeometry();
			hubParticleGeo.setAttribute(
				"position",
				new THREE.BufferAttribute(hubParticlePos, 3),
			);
			hubParticleGeo.setAttribute(
				"color",
				new THREE.BufferAttribute(hubParticleColors, 3),
			);

			const hubParticleMat = new THREE.PointsMaterial({
				size: 0.04 * responsiveScale,
				vertexColors: true,
				transparent: true,
				opacity: 0.8,
				blending: THREE.AdditiveBlending,
				map: particleTexture, // ADDED: Circular texture for particles
				alphaTest: 0.1, // ADDED: Better transparency handling
			});

			const hubParticles = new THREE.Points(hubParticleGeo, hubParticleMat);
			centralHub.add(hubParticles);
			centralHub.userData = { hubParticles };

			scene.add(centralHub);

			// Ambient floating particles (chaos) - responsive count
			const ambientCount = particleCounts.ambient;
			const ambientPositions = new Float32Array(ambientCount * 3);
			const ambientColors = new Float32Array(ambientCount * 3);
			const ambientVelocities = new Float32Array(ambientCount * 3);

			for (let i = 0; i < ambientCount; i++) {
				ambientPositions[i * 3] = (Math.random() - 0.5) * 40 * responsiveScale;
				ambientPositions[i * 3 + 1] =
					(Math.random() - 0.5) * 40 * responsiveScale;
				ambientPositions[i * 3 + 2] =
					(Math.random() - 0.5) * 30 * responsiveScale;

				ambientVelocities[i * 3] = (Math.random() - 0.5) * 0.02;
				ambientVelocities[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
				ambientVelocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02;

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
				size: 0.03 * responsiveScale,
				vertexColors: true,
				transparent: true,
				opacity: 0.6,
				blending: THREE.AdditiveBlending,
				map: particleTexture, // ADDED: Circular texture for particles
				alphaTest: 0.1, // ADDED: Better transparency handling
			});

			const ambientParticles = new THREE.Points(
				ambientGeometry,
				ambientMaterial,
			);
			ambientParticles.userData = { velocities: ambientVelocities };
			scene.add(ambientParticles);
		};

		// NEW: Create connections from central hub to each cluster
		const createHubConnections = () => {
			aiClusters.forEach((cluster, index) => {
				const points = [
					centralHub.position.clone(), // Hub position
					cluster.group.position.clone(), // Cluster position
				];
				const geometry = new THREE.BufferGeometry().setFromPoints(points);
				const line = new THREE.Line(geometry, lineMaterial);
				line.userData = {
					start: "hub", // Mark as hub connection
					end: index, // Cluster index
					pulseOffset: Math.random() * Math.PI * 2,
				};
				scene.add(line);
				connectionLines.push(line);
			});
		};

		// Call this after central hub is fully created
		createHubConnections();

		const animate = () => {
			const time = Date.now() * 0.001;

			// Animate AI clusters with chaotic motion
			aiClusters.forEach((cluster, index) => {
				// Chaotic rotation - different speeds for each component
				cluster.particles.rotation.y += cluster.rotationSpeed;
				cluster.particles.rotation.x += cluster.rotationSpeed * 0.1;
				cluster.sphere.rotation.y -= cluster.rotationSpeed * 0.1;
				cluster.sphere.rotation.z += cluster.rotationSpeed * 0.1;

				// Update particle positions for chaotic movement
				const positions = cluster.particles.geometry.attributes.position.array;
				const velocities = cluster.particles.userData.velocities;

				

				// Enhanced pulsing effect with chaos
				const pulse = Math.sin(time * 2 + index) * 0.15 + 1;
				const chaosScale = Math.sin(time * 3 + index * 0.5) * 0.1;
				cluster.sphere.scale.setScalar(pulse + chaosScale);
				cluster.innerSphere.scale.setScalar((pulse + chaosScale) * 0.8);
				cluster.glow.scale.setScalar(pulse * 1.3);

				const safeZones = getSafeZones();
				const movementBounds = cluster.movementBounds;

				

				/// Apply mouse influence - significantly reduced on desktop
				const mouseInfluenceMultiplier =
					window.innerWidth < 640 ? 0.8 : window.innerWidth < 1024 ? 1.2 : 0.6;

				const mouseInfluenceX =
					mouseX * mouseInfluenceMultiplier * (index % 2 === 0 ? 1 : -1);
				const mouseInfluenceY =
					mouseY *
					(mouseInfluenceMultiplier * 0.66) *
					(index % 2 === 0 ? 1 : -1);

				// Calculate new position
				
			});

			// Update connection lines - dynamic positioning and pulsing opacity
			connectionLines.forEach((line) => {
				// Check if this is a hub connection or cluster-to-cluster connection
				if (line.userData.start === "hub") {
					// Hub to cluster connection
					const cluster = aiClusters[line.userData.end];
					const positions = line.geometry.attributes.position.array;

					// Start point: hub position
					positions[0] = centralHub.position.x;
					positions[1] = centralHub.position.y;
					positions[2] = centralHub.position.z;

					// End point: cluster position
					positions[3] = cluster.group.position.x;
					positions[4] = cluster.group.position.y;
					positions[5] = cluster.group.position.z;
				} else {
					// Cluster to cluster connection (existing logic)
					const startCluster = aiClusters[line.userData.start];
					const endCluster = aiClusters[line.userData.end];

					const positions = line.geometry.attributes.position.array;
					positions[0] = startCluster.group.position.x;
					positions[1] = startCluster.group.position.y;
					positions[2] = startCluster.group.position.z;
					positions[3] = endCluster.group.position.x;
					positions[4] = endCluster.group.position.y;
					positions[5] = endCluster.group.position.z;
				}

				line.geometry.attributes.position.needsUpdate = true;

				// Pulsing opacity
				const pulse =
					Math.sin(time * 2 + line.userData.pulseOffset) * 0.5 + 0.5;
				(line.material as THREE.LineBasicMaterial).opacity = 0.1 + pulse * 0.2;
			});

			// Rotate central hub with multiple axis rotation
			centralHub.rotation.y += 0.004;
			centralHub.rotation.x += 0.002;
			centralHub.rotation.z += 0.001;

			// Rotate individual rings independently
			centralHub.children.forEach((child, i) => {
				if (i > 2 && child.userData.rotationSpeed) {
					child.rotation.z +=
						child.userData.rotationSpeed * (i % 2 === 0 ? 1 : -1);
				}
			});

			// Hub particle rotation
			if (centralHub.userData.hubParticles) {
				centralHub.userData.hubParticles.rotation.y += 0.002;
				centralHub.userData.hubParticles.rotation.x -= 0.001;
			}

			// Reduced hub pulse, especially on desktop
			const pulseReduction = window.innerWidth >= 1024 ? 0.5 : 1;
			const hubPulse = (Math.sin(time * 1.5) * 0.08 + 1) * pulseReduction; // Reduced amplitude
			const scrollInfluence = 1 + scrollY * 0.00005; // Reduced scroll influence
			centralHub.scale.setScalar(hubPulse * scrollInfluence);

			// Animate ambient particles with chaotic motion
			scene.children.forEach((child) => {
				if (child instanceof THREE.Points && child.userData.velocities) {
					const positions = child.geometry.attributes.position.array;
					const velocities = child.userData.velocities;

					for (let i = 0; i < positions.length; i += 3) {
						positions[i] += velocities[i];
						positions[i + 1] += velocities[i + 1];
						positions[i + 2] += velocities[i + 2];

						// Wrap around boundaries - scaled
						if (Math.abs(positions[i]) > 20 * responsiveScale)
							velocities[i] *= -1;
						if (Math.abs(positions[i + 1]) > 20 * responsiveScale)
							velocities[i + 1] *= -1;
						if (Math.abs(positions[i + 2]) > 15 * responsiveScale)
							velocities[i + 2] *= -1;
					}
					child.geometry.attributes.position.needsUpdate = true;
				}
			});

			// Enhanced camera movement with smooth easing and scroll - adjusted for mobile
			const cameraMultiplier = window.innerWidth < 640 ? 1 : 2;
			const targetX = mouseX * cameraMultiplier;
			const targetY = -mouseY * cameraMultiplier;
			camera.position.x += (targetX - camera.position.x) * 0.05;
			camera.position.y += (targetY - camera.position.y) * 0.05;

			// Zoom based on scroll
			camera.position.z += (targetCameraZ - camera.position.z) * 0.05;

			const getLookAtOffset = () => {
				const width = window.innerWidth;
				if (width < 768) return 0; // mobile - look at center
				if (width < 1024) return -1.5; // tablet - slight offset
				return -3; // desktop - look left (negative = left, positive = right)
			};

			camera.lookAt(getLookAtOffset(), 0, 0);

			// Dynamic scene rotation - significantly reduced on desktop
			const rotationMultiplier =
				window.innerWidth < 640 ? 0.5 : window.innerWidth < 1024 ? 0.8 : 0.3;
			scene.rotation.y += (0.0005 + mouseX * 0.0003) * rotationMultiplier; // Reduced base rotation
			scene.rotation.x += mouseY * 0.0002 * rotationMultiplier; // Reduced mouse influence

			renderer.render(scene, camera);
			animationFrameId = requestAnimationFrame(animate);
		};

		const handleMouseMove = (event: MouseEvent) => {
			mouseX = (event.clientX / window.innerWidth) * 2 - 1;
			mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
		};

		// Touch support for mobile
		const handleTouchMove = (event: TouchEvent) => {
			if (event.touches.length > 0) {
				mouseX = (event.touches[0].clientX / window.innerWidth) * 2 - 1;
				mouseY = -(event.touches[0].clientY / window.innerHeight) * 2 + 1;
			}
		};

		const handleScroll = () => {
			scrollY = window.scrollY;
			// Zoom in/out based on scroll (subtle effect)
			const baseZ = getResponsiveCameraZ();
			targetCameraZ = baseZ - scrollY * 0.005;
			targetCameraZ = Math.max(baseZ - 5, Math.min(baseZ + 5, targetCameraZ));
		};

		const handleResize = () => {
			if (!canvas || !canvas.offsetWidth) return;

			// Update responsive values
			responsiveScale = getResponsiveScale();
			responsiveCameraZ = getResponsiveCameraZ();
			particleCounts = getResponsiveParticleCount();

			// Update camera
			camera.aspect = canvas.offsetWidth / canvas.offsetHeight;
			camera.updateProjectionMatrix();
			camera.position.z = responsiveCameraZ;
			targetCameraZ = responsiveCameraZ;

			// Update renderer
			renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);

			// Update antialiasing setting
			if (window.innerWidth <= 640 && renderer.capabilities.maxSamples > 0) {
				// Mobile - consider disabling for performance
			}
		};

		window.addEventListener("mousemove", handleMouseMove);
		window.addEventListener("touchmove", handleTouchMove, { passive: true });
		window.addEventListener("scroll", handleScroll, { passive: true });
		window.addEventListener("resize", handleResize);

		try {
			init();
			animate();
		} catch (error) {
			console.error("Three.js error:", error);
		}

		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
			window.addEventListener("touchmove", handleTouchMove);
			window.removeEventListener("scroll", handleScroll);
			window.removeEventListener("resize", handleResize);
			if (animationFrameId) cancelAnimationFrame(animationFrameId);
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
																className={`feature-cta group px-5 sm:px-6 lg:px-5 xl:px-6 py-2 sm:py-2.5 lg:py-2 xl:py-2.5 bg-linear-to-r ${feature.gradient} hover:shadow-2xl text-white rounded-lg font-semibold text-sm sm:text-base lg:text-sm xl:text-base transition-all duration-300 flex items-center gap-2 shadow-lg min-h-[36px] lg:min-h-[34px] xl:min-h-[38px] transform-gpu`}
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
