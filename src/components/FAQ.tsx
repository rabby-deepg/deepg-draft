"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle } from "lucide-react";

const FAQS = [
	{
		question: "What AI models are currently supported?",
		answer:
			"Queryo currently supports Claude, GPT-4, Gemini, Deepseek, Llama, and Mistral. We regularly add new models as they become available. You can also integrate custom models via our API.",
		category: "General",
	},
	{
		question: "Is my data secure and private?",
		answer:
			"Yes, we take security seriously. All conversations are encrypted end-to-end, and we never store or train on your data. We comply with GDPR, SOC 2, and other security standards.",
		category: "Security",
	},
	{
		question: "What happens to my conversations if I switch models?",
		answer:
			"Your conversation context is preserved and maintained across all models. You can switch between different AI models mid-conversation without losing any context.",
		category: "Features",
	},
	{
		question: "Can I use Queryo for my team?",
		answer:
			"Absolutely! Our Professional and Enterprise plans support team collaboration. You can manage permissions, share conversations, and work together in real-time.",
		category: "Pricing",
	},
	{
		question: "What is included in the free trial?",
		answer:
			"The free trial gives you full access to all features for 14 days. You can access all supported AI models, use unlimited messages, and explore our advanced features.",
		category: "Pricing",
	},
	{
		question: "How can I integrate Queryo with my existing tools?",
		answer:
			"We provide a REST API and webhooks for integrations. Check our API documentation for detailed guides on connecting with your favorite tools.",
		category: "Integration",
	},
	{
		question: "Can I self-host Queryo?",
		answer:
			"Enterprise customers can request self-hosted or on-premise deployments. Contact our sales team for more information about private deployment options.",
		category: "Deployment",
	},
	{
		question: "What are the rate limits?",
		answer:
			"Rate limits depend on your plan. Starter has 100 messages/month, Professional has unlimited, and Enterprise has custom limits. All plans support concurrent connections.",
		category: "Technical",
	},
];

export default function FAQ({ reducedMotion }) {
	const [activeIndex, setActiveIndex] = useState(0);
	const [selectedCategory, setSelectedCategory] = useState("General");

	const categories = Array.from(new Set(FAQS.map((faq) => faq.category)));
	const filteredFAQs = FAQS.filter((faq) => faq.category === selectedCategory);

	return (
		<section id="faq" className="relative py-24 px-6 grain overflow-hidden">
			<div className="max-w-4xl mx-auto">
				{/* Section Header */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: "-100px" }}
					transition={{ duration: 0.6 }}
					className="text-center mb-16"
				>
					<h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">
						Frequently Asked Questions
					</h2>
					<p className="text-lg text-slate-600 dark:text-slate-400">
						Find answers to common questions about Queryo
					</p>
				</motion.div>

				{/* Category Filter */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: "-100px" }}
					className="flex flex-wrap justify-center gap-3 mb-12"
				>
					{categories.map((category) => (
						<motion.button
							key={category}
							onClick={() => {
								setSelectedCategory(category);
								setActiveIndex(0);
							}}
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							className={`px-6 py-2 rounded-full font-medium transition-all ${
								selectedCategory === category
									? "bg-blue-600 text-white shadow-lg"
									: "bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
							}`}
						>
							{category}
						</motion.button>
					))}
				</motion.div>

				{/* FAQ Accordion */}
				<motion.div
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true, margin: "-100px" }}
					className="space-y-3"
				>
					<AnimatePresence mode="popLayout">
						{filteredFAQs.map((faq, index) => (
							<motion.div
								key={faq.question}
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -10 }}
								transition={{ delay: index * 0.05 }}
								className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden bg-white dark:bg-slate-800"
							>
								<motion.button
									onClick={() =>
										setActiveIndex(activeIndex === index ? -1 : index)
									}
									className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-left"
									whileHover={{ backgroundColor: "rgba(0, 0, 0, 0.02)" }}
								>
									<span className="font-semibold text-slate-900 dark:text-white pr-4">
										{faq.question}
									</span>
									<motion.div
										animate={{
											rotate: activeIndex === index ? 180 : 0,
										}}
										transition={{ duration: 0.3 }}
										className="flex-shrink-0"
									>
										{activeIndex === index ? (
											<Minus
												size={20}
												className="text-blue-600 dark:text-blue-400"
											/>
										) : (
											<Plus
												size={20}
												className="text-slate-600 dark:text-slate-400"
											/>
										)}
									</motion.div>
								</motion.button>

								<AnimatePresence>
									{activeIndex === index && (
										<motion.div
											initial={{ opacity: 0, height: 0 }}
											animate={{ opacity: 1, height: "auto" }}
											exit={{ opacity: 0, height: 0 }}
											transition={{ duration: 0.3 }}
											className="border-t border-slate-200 dark:border-slate-700 overflow-hidden"
										>
											<motion.p
												initial={{ opacity: 0 }}
												animate={{ opacity: 1 }}
												transition={{ delay: 0.1 }}
												className="px-6 py-4 text-slate-600 dark:text-slate-400 leading-relaxed"
											>
												{faq.answer}
											</motion.p>
										</motion.div>
									)}
								</AnimatePresence>
							</motion.div>
						))}
					</AnimatePresence>
				</motion.div>

				{/* Still Have Questions */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					viewport={{ once: true }}
					className="text-center mt-16 p-8 bg-gradient-to-r from-[#667eea]/10 to-[#764ba2]/10 rounded-2xl border border-[#667eea]/20"
				>
					<h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
						Still have questions?
					</h3>
					<p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
						Can't find what you're looking for? Our support team is here to help
						you get the most out of Queryo.
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<motion.button
							className="px-8 py-3 bg-[#667eea] text-white rounded-xl font-semibold hover:bg-[#5a6fd8] transition-all duration-200 flex items-center justify-center space-x-2"
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
						>
							<HelpCircle className="w-5 h-5" />
							<span>Contact Support</span>
						</motion.button>
						<motion.button
							className="px-8 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
						>
							View Documentation
						</motion.button>
					</div>
				</motion.div>
			</div>
		</section>
	);
}
