"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import { useState } from "react";
import ContactModal from "./Contact";

interface CTAProps {
  reducedMotion: boolean;
}

export default function CTA({ reducedMotion }: CTAProps) {
   const [isModalOpen, setIsModalOpen] = useState(false);
  return (
		<>
			<section className="relative py-24 px-6 grain overflow-hidden">
				{/* Background Effects */}
				<div className="absolute inset-0 pointer-events-none">
					<motion.div
						className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-200 to-purple-200 dark:from-blue-900 dark:to-purple-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
						animate={{
							scale: [1, 1.1, 1],
							y: [0, -20, 0],
						}}
						transition={{
							duration: 8,
							repeat: Infinity,
							ease: "easeInOut",
						}}
					/>
					<motion.div
						className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-pink-200 to-red-200 dark:from-pink-900 dark:to-red-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
						animate={{
							scale: [1.1, 1, 1.1],
							y: [0, 20, 0],
						}}
						transition={{
							duration: 8,
							repeat: Infinity,
							ease: "easeInOut",
							delay: 2,
						}}
					/>
				</div>

				<div className="max-w-4xl mx-auto relative z-10">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, margin: "-100px" }}
						transition={{ duration: 0.8 }}
						className="text-center"
					>
						{/* Main Heading */}
						<motion.h2
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, margin: "-100px" }}
							transition={{ duration: 0.8, delay: 0.1 }}
							className="text-4xl md:text-6xl font-bold mb-6 text-slate-900 dark:text-white leading-tight"
						>
							Ready to Unify Your AI?
						</motion.h2>

						{/* Subheading */}
						<motion.p
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, margin: "-100px" }}
							transition={{ duration: 0.8, delay: 0.2 }}
							className="text-xl text-slate-600 dark:text-slate-400 mb-12 max-w-2xl mx-auto"
						>
							Start your free 14-day trial today. No credit card required.
							Access all AI models and unlimited features.
						</motion.p>

						{/* CTA Buttons */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, margin: "-100px" }}
							transition={{ duration: 0.8, delay: 0.3 }}
							className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
						>
							<motion.button
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								className="px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group"
							>
								Get Started Free
								<ArrowRight
									size={20}
									className="group-hover:translate-x-1 transition-transform"
								/>
							</motion.button>

							
								<ContactModal />
							
						</motion.div>

						{/* Trust Badge */}
						<motion.div
							initial={{ opacity: 0 }}
							whileInView={{ opacity: 1 }}
							viewport={{ once: true, margin: "-100px" }}
							transition={{ duration: 0.8, delay: 0.4 }}
							className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-full"
						>
							<div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
							<span className="text-sm font-medium text-green-700 dark:text-green-400">
								No credit card required • 14-day free trial
							</span>
						</motion.div>
					</motion.div>
				</div>
			</section>
		</>
	);
}
