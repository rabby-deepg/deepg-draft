import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

interface AgentProps{
	reducedMotion: boolean;
}

const agents = [
	// Currently Supported
	{
		name: "GPT-4.1",
		provider: "OpenAI",
		description: "Enhanced version with improved reasoning and accuracy",
		color: "from-emerald-500 to-teal-500",
		icon: "/logos/chatgpt-ai.svg",
		stats: { accuracy: "96%", speed: "Fast", costEfficiency: "High" },
		status: "available",
	},
	{
		name: "GPT-5 Nano",
		provider: "OpenAI",
		description: "Lightning-fast and cost-effective for everyday tasks",
		color: "from-green-500 to-emerald-500",
		icon: "/logos/chatgpt-ai.svg",
		stats: { accuracy: "92%", speed: "Very Fast", costEfficiency: "Very High" },
		status: "available",
	},
	{
		name: "GPT-5 Mini",
		provider: "OpenAI",
		description: "Balanced performance for a wide range of applications",
		color: "from-teal-500 to-cyan-500",
		icon: "/logos/chatgpt-ai.svg",

		status: "available",
	},
	{
		name: "Claude Sonnet 3.7",
		provider: "Anthropic",
		description: "Advanced reasoning with enhanced mathematical capabilities",
		color: "from-purple-500 to-pink-500",
		icon: "/logos/claude-ai.png",

		status: "available",
	},
	{
		name: "Claude Opus 4",
		provider: "Anthropic",
		description: "Most capable model for complex analysis and research",
		color: "from-violet-500 to-purple-500",
		icon: "/logos/claude-ai.png",

		status: "available",
	},
	// Upcoming Models
	{
		name: "Gemini Pro",
		provider: "Google",
		description: "Multimodal AI with strong visual understanding",
		color: "from-blue-500 to-cyan-500",
		icon: "/logos/gemini-ai.png",

		status: "upcoming",
	},
	{
		name: "Gemini Ultra",
		provider: "Google",
		description: "Most advanced multimodal AI model",
		color: "from-blue-600 to-indigo-500",
		icon: "/logos/gemini-ai.png",

		status: "upcoming",
	},
	{
		name: "DeepSeek",
		provider: "DeepSeek",
		description: "Cost-effective with impressive reasoning capabilities",
		color: "from-orange-500 to-red-500",
		icon: "/logos/deepseek-ai.svg",

		status: "upcoming",
	},

	{
		name: "Mistral",
		provider: "Mistral AI",
		description: "European excellence in efficient AI processing",
		color: "from-rose-500 to-orange-500",
		icon: "/logos/mistral-ai.png",

		status: "upcoming",
	},
];

const AgentsSection = ({reducedMotion} : AgentProps) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const cardsRef = useRef<HTMLDivElement[]>([]);

	useEffect(() => {
		if (!containerRef.current) return;

		const cards = cardsRef.current.filter(Boolean);

		cards.forEach((card, index) => {
			gsap.fromTo(
				card,
				{
					opacity: 0,
					scale: 0.8,
					rotation: -10,
				},
				{
					opacity: 1,
					scale: 1,
					rotation: 0,
					scrollTrigger: {
						trigger: card,
						start: "top bottom-=100",
						end: "top center",
						scrub: 1,
					},
				},
			);
		});
	}, []);

	return (
		<section
			ref={containerRef}
			className="relative py-32 grain overflow-hidden"
			id="agents"
		>
			<div className="absolute inset-0 bg-linear-mesh opacity-50" />

			<div className="container mx-auto px-4 relative z-10">
				<motion.div
					className="text-center mb-20"
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
				>
					<h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
						Supported
						<span className="gradient-text"> AI Models</span>
					</h2>
					<p className="text-xl text-muted-foreground max-w-2xl mx-auto">
						Access the world&apos;s most advanced AI models from a single
						platform
					</p>
				</motion.div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
					{agents.map((agent, index) => (
						<motion.div
							key={agent.name}
							ref={(el) => {
								if (el) cardsRef.current[index] = el;
							}}
							className="group relative"
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: index * 0.1 }}
						>
							{/* Upcoming Badge */}
							{agent.status === "upcoming" && (
								<div className="absolute -top-2 -right-2 z-20">
									<span className="bg-linear-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
										Coming Soon
									</span>
								</div>
							)}

							<div
								className={`relative bg-card rounded-2xl p-8 border border-border hover:border-primary/50 transition-all hover-lift h-full ${
									agent.status === "upcoming"
										? "opacity-80 grayscale hover:grayscale-0 hover:opacity-100"
										: ""
								}`}
							>
								<div
									className={`absolute inset-0 bg-linear-to-br ${agent.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity`}
								/>

								<div className="flex gap-3 z-10">
									<div
										className={`text-5xl mb-4 bg-linear-to-br ${agent.color} bg-clip-text text-transparent`}
									>
										<Image
											src={agent.icon}
											alt={agent.name}
											width={46}
											height={46}
										/>
									</div>

									<div className="mb-4">
										<h3 className="text-2xl font-bold mb-1">{agent.name}</h3>
										<p className="text-sm text-primary font-medium">
											{agent.provider}
										</p>
									</div>
								</div>
							</div>
						</motion.div>
					))}
				</div>

				<motion.div
					className="text-center mt-16"
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					transition={{ duration: 0.8, delay: 0.5 }}
				>
					<p className="text-muted-foreground mb-4">
						More models added regularly
					</p>
					<div className="flex items-center justify-center gap-2 text-sm">
						<span className="relative flex h-2 w-2">
							<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
							<span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
						</span>
						<span className="text-accent font-medium">
							New models available
						</span>
					</div>
				</motion.div>
			</div>
		</section>
	);
};

export default AgentsSection;
