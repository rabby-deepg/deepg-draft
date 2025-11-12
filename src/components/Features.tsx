"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Zap, Shield, Brain, BarChart3, Workflow, Lock } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Features Section with Horizontal Scroll
const features = [
	{
		title: "Unified AI Interface",
		subtitle: "One Platform, Infinite Possibilities",
		description:
			"Access multiple AI models from a single, intuitive interface. No more switching between platforms or managing multiple subscriptions.",
		features: [
			"Single sign-on across all AI models",
			"Unified conversation history",
			"Cross-model context sharing",
			"Seamless model switching mid-conversation",
		],
		icon: "🎯",
		gradient: "from-primary to-primary-glow",
	},
	{
		title: "Enterprise-Grade Security",
		subtitle: "Your Data, Protected",
		description:
			"Bank-level encryption, SOC 2 Type II compliance, and complete data sovereignty. Built for enterprises that take security seriously.",
		features: [
			"End-to-end encryption",
			"SSO and SAML integration",
			"Role-based access control",
			"Audit logs and compliance reports",
		],
		icon: "🔒",
		gradient: "from-accent to-primary",
	},
	{
		title: "Smart Context Management",
		subtitle: "Conversations That Remember",
		description:
			"Our AI understands context across conversations and models. Get more relevant responses by maintaining conversation history intelligently.",
		features: [
			"Persistent conversation memory",
			"Cross-session context retention",
			"Smart summarization",
			"Project-based organization",
		],
		icon: "🧠",
		gradient: "from-primary-glow to-accent",
	},
	{
		title: "Real-Time Collaboration",
		subtitle: "Work Together, Achieve More",
		description:
			"Share conversations, collaborate on prompts, and build a knowledge base together. Perfect for teams that value collective intelligence.",
		features: [
			"Shared workspaces",
			"Real-time co-editing",
			"Comment and annotation tools",
			"Team analytics and insights",
		],
		icon: "👥",
		gradient: "from-accent to-primary-glow",
	},
	{
		title: "Advanced Analytics",
		subtitle: "Data-Driven Decisions",
		description:
			"Track usage patterns, measure productivity gains, and optimize your AI strategy with comprehensive analytics and insights.",
		features: [
			"Usage analytics and metrics",
			"Cost optimization insights",
			"Performance benchmarking",
			"Custom reporting dashboards",
		],
		icon: "📊",
		gradient: "from-primary to-accent",
	},
	{
		title: "API & Integrations",
		subtitle: "Seamless Workflow Integration",
		description:
			"Integrate Queryo into your existing workflows with our powerful API and pre-built integrations for popular tools.",
		features: [
			"RESTful API access",
			"Slack and Teams integration",
			"Zapier and Make.com support",
			"Custom webhook integrations",
		],
		icon: "⚡",
		gradient: "from-primary-glow to-primary",
	},
];

 const Features = () => {
	const sectionRef = useRef<HTMLDivElement>(null);
	const horizontalContainerRef = useRef<HTMLDivElement>(null);
	const cardsContainerRef = useRef<HTMLDivElement>(null);

	useGSAP(() => {
		if (!horizontalContainerRef.current || !cardsContainerRef.current) return;

		const cards = cardsContainerRef.current.children;
		const totalWidth = (cards.length - 1) * window.innerWidth; // -1 because last card scrolls normally

		// Horizontal scroll animation for first 5 cards
		gsap.to(cardsContainerRef.current, {
			x: () => -totalWidth,
			ease: "none",
			scrollTrigger: {
				trigger: horizontalContainerRef.current,
				start: "top top",
				end: () => `+=${totalWidth}`,
				scrub: 1,
				pin: true,
				anticipatePin: 1,
			},
		});

		// Individual card animations
		gsap.utils.toArray(cards).forEach((card: any, index) => {
			if (index < cards.length - 1) {
				// Horizontal cards - fade in as they enter
				gsap.fromTo(
					card,
					{
						opacity: 0,
						x: 100,
					},
					{
						opacity: 1,
						x: 0,
						scrollTrigger: {
							trigger: card,
							containerAnimation: ScrollTrigger.getById(
								"horizontal-scroll",
							) as any,
							start: "left center",
							end: "right center",
							scrub: true,
						},
					},
				);
			}
		});
	}, []);

	return (
		<section ref={sectionRef} className="relative bg-muted/30" id="features">
			{/* Horizontal Scroll Section */}
			<div ref={horizontalContainerRef} className="h-screen overflow-hidden">
				<div
					ref={cardsContainerRef}
					className="flex h-screen"
					style={{ width: `${features.length * 100}vw` }}
				>
					{features.map((feature, index) => (
						<div
							key={index}
							className="flex-shrink-0 w-screen h-screen flex items-center justify-center px-4"
							style={{
								minWidth: "100vw",
								// Last card gets normal vertical flow
								position: index === features.length - 1 ? "relative" : "static",
							}}
						>
							<div
								className={`max-w-6xl w-full bg-card rounded-3xl p-8 md:p-12 lg:p-16 shadow-lg border border-border backdrop-blur-sm ${
									index === features.length - 1 ? "mx-auto" : "ml-8 mr-4"
								}`}
							>
								<div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12">
									<div
										className={`text-6xl md:text-7xl lg:text-8xl flex-shrink-0 bg-gradient-to-br ${feature.gradient} bg-clip-text text-transparent`}
									>
										{feature.icon}
									</div>

									<div className="flex-1 space-y-6">
										<div>
											<p className="text-sm font-semibold text-primary mb-2">
												{feature.subtitle}
											</p>
											<h3 className="text-3xl md:text-4xl font-bold mb-4">
												{feature.title}
											</h3>
											<p className="text-lg text-muted-foreground">
												{feature.description}
											</p>
										</div>

										<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
											{feature.features.map((item, idx) => (
												<div key={idx} className="flex items-start gap-3">
													<svg
														className="w-5 h-5 text-accent flex-shrink-0 mt-1"
														fill="currentColor"
														viewBox="0 0 20 20"
													>
														<path
															fillRule="evenodd"
															d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
															clipRule="evenodd"
														/>
													</svg>
													<span className="text-sm text-foreground">
														{item}
													</span>
												</div>
											))}
										</div>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Features;