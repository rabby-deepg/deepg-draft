import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import QueryoLogo from "@/utils/QueryoLogo";

interface HeaderProps {
	reducedMotion: boolean;
}

export default function Header({ reducedMotion } : HeaderProps) {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		const handleScroll = () => setIsScrolled(window.scrollY > 20);
		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const navLinks = [
		{ label: "Features", href: "#features" },
		{ label: "Pricing", href: "#pricing" },
		{ label: "Agents", href: "#agents" },
		{ label: "FAQ", href: "#faq" },
	];

	return (
		<motion.header
			className={`fixed top-0 left-0 right-0 z-40 ${isScrolled? "pointer-events-none" : ""}  transition-all duration-500 
					 bg-transparent
			`}
			initial={{ y: -100 }}
			animate={{ y: 0 }}
			transition={{ duration: 0.6, ease: "easeOut" }}
		>
			<div
				className={`max-w-7xl mx-auto px-6 py-4 md:py-4 flex items-center  justify-between
				transition-all duration-500`}
			>
				{/* Logo — hides on scroll */}

				<motion.div
					className="flex items-center gap-2"
					initial={{ opacity: 0, x: -20 }}
					animate={{ opacity: 1, x: 0 }}
					exit={{ opacity: 0, x: -20 }}
					transition={{ duration: 0.4 }}
				>
					<QueryoLogo size={50} />
				</motion.div>

				{/* Desktop Navigation */}
				<AnimatePresence>
					{!isScrolled && (
				<nav className="hidden md:flex items-center gap-8 bg-white/70 dark:bg-slate-900/40 backdrop-blur-md px-6 py-3 rounded-full border border-slate-200/20">
					{navLinks.map((link, i) => (
						<motion.a
							key={link.href}
							href={link.href}
							initial={{ opacity: 0, y: -10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: i * 0.1 }}
							className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white transition-colors"
						>
							{link.label}
						</motion.a>
					))}
				</nav>
					)}

				</AnimatePresence>

				{/* CTA Buttons — hide on scroll */}
				<AnimatePresence>
					{!isScrolled && (
						<motion.div
							className="hidden md:flex items-center gap-3"
							initial={{ opacity: 0, x: 20 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: 20 }}
							transition={{ duration: 0.4 }}
						>
							<Button variant="ghost" className="text-sm font-medium">
								Sign In
							</Button>
							<Button className="text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90">
								Get Started
							</Button>
						</motion.div>
					)}
				</AnimatePresence>
			
						
					

				{/* Mobile Menu Button */}
				<button
					onClick={() => setIsOpen(!isOpen)}
					className="md:hidden p-2 text-slate-900 dark:text-white"
					aria-label="Toggle menu"
				>
					{isOpen ? <X size={24} /> : <Menu size={24} />}
				</button>
			</div>

			{/* Mobile Dropdown */}
			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -10 }}
						transition={{ duration: 0.3 }}
						className="md:hidden px-6 pb-6 space-y-4 border-t border-slate-200/20 bg-white/80 dark:bg-slate-950/80 backdrop-blur-lg"
					>
						{navLinks.map((link) => (
							<a
								key={link.href}
								href={link.href}
								className="block py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white"
								onClick={() => setIsOpen(false)}
							>
								{link.label}
							</a>
						))}
						<div className="pt-3 space-y-2">
							<Button
								variant="ghost"
								className="w-full text-sm font-medium text-slate-900 dark:text-white"
							>
								Sign In
							</Button>
							<Button className="w-full text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90">
								Get Started
							</Button>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</motion.header>
	);
}
