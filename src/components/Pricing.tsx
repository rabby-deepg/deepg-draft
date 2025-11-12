"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Star, Zap, Crown, ArrowRight } from "lucide-react";
import Image from "next/image";

interface PricingProps {
	reducedMotion: boolean;
}

export default function Pricing({reducedMotion} : PricingProps) {
	const [isYearly, setIsYearly] = useState(false);

	const plans = [
		{
			name: "Starter",
			icon: Zap,
			description:
				"Perfect for individuals and small teams getting started with AI",
			monthlyPrice: 29,
			yearlyPrice: 290,
			popular: false,
			features: [
				"Access to 5 AI models (GPT-4, Claude, Gemini)",
				"10,000 queries per month",
				"Basic analytics dashboard",
				"Standard support",
				"API access",
				"Team collaboration (up to 3 members)",
			],
			gradient: "from-[#667eea] to-[#764ba2]",
			bgGradient:
				"from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10",
			borderColor: "border-gray-200 dark:border-gray-700",
		},
		{
			name: "Professional",
			icon: Star,
			description: "Advanced features for growing teams and businesses",
			monthlyPrice: 99,
			yearlyPrice: 990,
			popular: true,
			features: [
				"Access to all 10+ AI models",
				"100,000 queries per month",
				"Advanced analytics & reporting",
				"Priority support",
				"Full API access with webhooks",
				"Unlimited team members",
				"Custom model routing",
				"Usage monitoring & alerts",
			],
			gradient: "from-[#f093fb] to-[#f5576c]",
			bgGradient:
				"from-pink-50 to-red-50 dark:from-pink-900/10 dark:to-red-900/10",
			borderColor: "border-pink-200 dark:border-pink-700",
		},
		{
			name: "Enterprise",
			icon: Crown,
			description: "Comprehensive solution for large organizations",
			monthlyPrice: 299,
			yearlyPrice: 2990,
			popular: false,
			features: [
				"Unlimited AI model access",
				"Unlimited queries",
				"Enterprise analytics suite",
				"Dedicated support manager",
				"Custom integrations",
				"SSO & advanced security",
				"SLA guarantee (99.99% uptime)",
				"Custom model fine-tuning",
				"On-premise deployment options",
			],
			gradient: "from-[#4facfe] to-[#00f2fe]",
			bgGradient:
				"from-cyan-50 to-blue-50 dark:from-cyan-900/10 dark:to-blue-900/10",
			borderColor: "border-cyan-200 dark:border-cyan-700",
		},
	];

	const calculateSavings = (monthly, yearly) => {
		const monthlyCost = monthly * 12;
		const savings = monthlyCost - yearly;
		const percentage = Math.round((savings / monthlyCost) * 100);
		return { amount: savings, percentage };
	};

	return (
		<>
			<section
				id="pricing"
				className="py-20 px-6 grain"
				style={{ fontFamily: "Inter, sans-serif" }}
			>
				<div className="max-w-7xl mx-auto">
					{/* Header */}
					<div className="text-center mb-16">
						<motion.h2
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6 }}
							className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6"
						>
							Simple, Transparent
							<span className="block bg-linear-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent mt-2">
								Pricing
							</span>
						</motion.h2>

						<motion.p
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.2 }}
							className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8"
						>
							Choose the perfect plan for your team. Start with a free trial and
							scale as you grow.
						</motion.p>

						{/* Billing Toggle */}
						<motion.div
							initial={{ opacity: 0, scale: 0.9 }}
							whileInView={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.6, delay: 0.3 }}
							className="inline-flex items-center p-1 bg-gray-100 dark:bg-gray-800 rounded-2xl"
						>
							<button
								onClick={() => setIsYearly(false)}
								className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
									!isYearly
										? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
										: "text-gray-600 dark:text-gray-400"
								}`}
							>
								Monthly
							</button>
							<button
								onClick={() => setIsYearly(true)}
								className={`relative px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
									isYearly
										? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
										: "text-gray-600 dark:text-gray-400"
								}`}
							>
								Yearly
								{isYearly && (
									<motion.span
										initial={{ opacity: 0, scale: 0 }}
										animate={{ opacity: 1, scale: 1 }}
										className="absolute -top-2 -right-2 bg-linear-to-r from-[#667eea] to-[#764ba2] text-white text-xs px-2 py-1 rounded-full"
									>
										Save 20%
									</motion.span>
								)}
							</button>
						</motion.div>
					</div>

					{/* Pricing Cards */}
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-18 sm:gap-16 lg:gap-8  w-[95%] sm:w-4/5 mx-auto lg:w-full mb-18">
						{plans.map((plan, index) => {
							const IconComponent = plan.icon;
							const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
							const savings = calculateSavings(
								plan.monthlyPrice,
								plan.yearlyPrice,
							);

							return (
								<motion.div
									key={plan.name}
									initial={{ opacity: 0, y: 40 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6, delay: index * 0.1 }}
									className={`relative bg-linear-to-br ${
										plan.bgGradient
									} rounded-3xl border-2 ${
										plan.popular
											? "border-pink-200 dark:border-pink-700 scale-105"
											: plan.borderColor
									} p-8 hover:shadow-2xl transition-all duration-300 ${
										plan.popular ? "shadow-xl" : "shadow-lg"
									}`}
									whileHover={{ y: -5 }}
								>
									{/* Popular Badge */}
									{plan.popular && (
										<div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
											<div className="bg-linear-to-r from-[#f093fb] to-[#f5576c] text-white px-6 py-2 rounded-full text-sm font-semibold">
												Most Popular
											</div>
										</div>
									)}

									{/* Plan Header */}
									<div className="text-center mb-8">
										<div
											className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-r ${plan.gradient} mb-4`}
										>
											<IconComponent className="w-8 h-8 text-white" />
										</div>

										<h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
											{plan.name}
										</h3>

										<p className="text-gray-600 dark:text-gray-400 mb-6">
											{plan.description}
										</p>

										{/* Pricing */}
										<div className="mb-4">
											<div className="flex items-baseline justify-center">
												<span className="text-5xl font-bold text-gray-900 dark:text-white">
													${price}
												</span>
												<span className="text-gray-600 dark:text-gray-400 ml-2">
													/{isYearly ? "year" : "month"}
												</span>
											</div>

											{isYearly && (
												<motion.p
													initial={{ opacity: 0, height: 0 }}
													animate={{ opacity: 1, height: "auto" }}
													className="text-sm text-green-600 dark:text-green-400 mt-2"
												>
													Save ${savings.amount} ({savings.percentage}% off)
												</motion.p>
											)}
										</div>
									</div>

									{/* Features */}
									<div className="space-y-3 mb-8">
										{plan.features.map((feature, featureIndex) => (
											<motion.div
												key={featureIndex}
												initial={{ opacity: 0, x: -20 }}
												whileInView={{ opacity: 1, x: 0 }}
												transition={{
													duration: 0.4,
													delay: featureIndex * 0.05,
												}}
												className="flex items-start space-x-3"
											>
												<Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
												<span className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
													{feature}
												</span>
											</motion.div>
										))}
									</div>

									{/* CTA Button */}
									<motion.button
										className={`w-full py-4 px-6 rounded-2xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2 ${
											plan.popular
												? "bg-linear-to-r from-[#f093fb] to-[#f5576c] text-white hover:shadow-lg"
												: "bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white hover:border-gray-300 dark:hover:border-gray-600"
										}`}
										whileHover={{ scale: 1.02 }}
										whileTap={{ scale: 0.98 }}
									>
										<span>Start Free Trial</span>
										<ArrowRight className="w-5 h-5" />
									</motion.button>
								</motion.div>
							);
						})}
					</div>

					{/* Payment Partner Section */}
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						viewport={{ once: true }}
						className="text-center bg-linear-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-10 flex flex-col items-center justify-center "
					>
						<h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
							Trusted Payment Partner
						</h3>
						<p className="text-gray-600 dark:text-gray-400 mb-6 max-w-xl mx-auto">
							We’ve partnered with{" "}
							<span className="font-semibold text-[#E2136E]">bKash</span> —
							Bangladesh’s leading digital financial service — to offer secure
							and seamless payments for all your subscriptions.
						</p>

						{/* Payment Card */}
						<div className="relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg p-6 flex items-center justify-center gap-4 w-full max-w-md mx-auto hover:shadow-xl transition-all duration-300">
							<Image
								src="/logos/bkash.svg"
								alt="bKash Logo"
								width={56}
								height={56}
								className="object-contain"
							/>
							<div className="text-left">
								<h4 className="text-lg font-bold text-gray-900 dark:text-white">
									bKash Payments
								</h4>
								<p className="text-sm text-gray-600 dark:text-gray-400">
									Fast, reliable, and secure transactions
								</p>
							</div>
						</div>

						{/* CTA Button */}
						<motion.button
							className="mt-8 inline-flex items-center space-x-2 px-8 py-3 bg-linear-to-r from-[#E2136E] to-[#FF66B2] text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-200"
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
						>
							<span>Pay with bKash</span>
							<ArrowRight className="w-5 h-5" />
						</motion.button>
					</motion.div>
				</div>
			</section>
		</>
	);
}
