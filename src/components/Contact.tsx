"use client";

import { useEffect, useRef, useState } from "react";
import { X, Mail, User, MessageSquare, Send } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactModal() {
	const [isOpen, setIsOpen] = useState(false);
	const modalRef = useRef(null);
	const overlayRef = useRef(null);
	const contentRef = useRef(null);
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		message: "",
	});

	useEffect(() => {
		if (isOpen && overlayRef.current && contentRef.current) {
			// Check if gsap is available on window
			const gsap = window.gsap;

			if (gsap) {
				const tl = gsap.timeline();
				tl.fromTo(
					overlayRef.current,
					{ opacity: 0 },
					{ opacity: 1, duration: 0.4, ease: "power2.out" },
				).fromTo(
					contentRef.current,
					{ opacity: 0, y: 60, scale: 0.95 },
					{ opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power3.out" },
					"-=0.2",
				);
			}
		}
	}, [isOpen]);

	const closeModal = () => {
		const gsap = window.gsap;

		if (gsap && modalRef.current && overlayRef.current && contentRef.current) {
			const tl = gsap.timeline({
				onComplete: () => setIsOpen(false),
			});
			tl.to(contentRef.current, {
				opacity: 0,
				y: 40,
				scale: 0.96,
				duration: 0.4,
				ease: "power2.in",
			}).to(
				overlayRef.current,
				{ opacity: 0, duration: 0.3, ease: "power1.inOut" },
				"-=0.2",
			);
		} else {
			setIsOpen(false);
		}
	};

	const handleSubmit = (e ) => {
		e.preventDefault();
		// Add your API call here
		console.log("Form submitted:", formData);

		// Reset form
		setFormData({ name: "", email: "", message: "" });
		closeModal();
	};

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	return (
		<>
			{/* Trigger Button - Simple but Clear */}
			<motion.button
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.95 }}
				onClick={() => setIsOpen(true)}
				className=" px-10 py-4 bg-linear-to-r from-amber-500 to-orange-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group relative overflow-hidden flex  justify-center items-center gap-3"
			>
				{/* Animated message icon */}
				<motion.div
					animate={{
						y: [0, -2, 0],
					}}
					transition={{
						duration: 1.5,
						repeat: Infinity,
						ease: "easeInOut",
					}}
					className="relative"
				>
					<MessageSquare size={20} />
					<motion.div
						animate={{
							scale: [0, 1.2, 0],
							opacity: [0, 0.6, 0],
						}}
						transition={{
							duration: 2,
							repeat: Infinity,
						}}
						className="absolute inset-0 bg-white rounded-full"
					/>
				</motion.div>

				<span>Send us a Message</span>

				{/* Subtle shine effect on hover */}
				<div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
			</motion.button>

			{/* Modal */}
			{isOpen && (
				<div
					ref={modalRef}
					className="fixed inset-0 z-9999 flex items-center justify-center p-4"
				>
					{/* Overlay */}
					<div
						ref={overlayRef}
						onClick={closeModal}
						className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm cursor-pointer"
					/>

					{/* Modal Content */}
					<div
						ref={contentRef}
						className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800"
						onClick={(e) => e.stopPropagation()}
					>
						{/* Close Button */}
						<button
							onClick={closeModal}
							className="absolute top-5 right-5 z-9999 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group cursor-pointer"
							aria-label="Close modal"
						>
							<X
								size={20}
								className="text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors"
							/>
						</button>

						{/* Content */}
						<div className="p-8">
							{/* Header */}
							<div className="mb-8">
								<div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-linear-to-br from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950 border border-amber-200 dark:border-amber-800 mb-4">
									<MessageSquare
										size={20}
										className="text-amber-700 dark:text-amber-400"
									/>
								</div>
								<h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-50 mb-2">
									Get in Touch
								</h2>
								<p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
									Have a question or feedback? We&#39;d love to hear from you. Fill
									out the form below and we&#39;ll get back to you shortly.
								</p>
							</div>

							{/* Form */}
							<div className="space-y-4">
								{/* Name Input */}
								<div>
									<label className="text-left block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
										Name
									</label>
									<div className="relative">
										<User
											size={16}
											className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-slate-500"
										/>
										<input
											type="text"
											name="name"
											value={formData.name}
											onChange={handleChange}
											placeholder="Your name"
											className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 dark:focus:border-amber-500 transition-all text-sm"
										/>
									</div>
								</div>

								{/* Email Input */}
								<div>
									<label className="text-left block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
										Email
									</label>
									<div className="relative">
										<Mail
											size={16}
											className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-slate-500"
										/>
										<input
											type="email"
											name="email"
											value={formData.email}
											onChange={handleChange}
											placeholder="you@example.com"
											className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 dark:focus:border-amber-500 transition-all text-sm"
										/>
									</div>
								</div>

								{/* Message Textarea */}
								<div>
									<label className="text-left block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
										Message
									</label>
									<textarea
										name="message"
										value={formData.message}
										onChange={handleChange}
										rows={4}
										placeholder="Tell us what's on your mind..."
										className="w-full px-4 py-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 dark:focus:border-amber-500 transition-all resize-none text-sm"
									/>
								</div>

								{/* Submit Button */}
								<button
									onClick={handleSubmit}
									className="w-full mt-2 px-4 py-3 bg-linear-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white rounded-lg font-medium transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2 group"
								>
									<span>Send Message</span>
									<Send
										size={16}
										className="group-hover:translate-x-0.5 transition-transform"
									/>
								</button>
							</div>

							{/* Footer Text */}
							<p className="text-xs text-slate-500 dark:text-slate-400 mt-6 text-center">
								We typically respond within 24 hours
							</p>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
