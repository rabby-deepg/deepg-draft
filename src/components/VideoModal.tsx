import React, { useEffect, useState } from "react";

import { motion, AnimatePresence } from "framer-motion";
import { Play, X } from "lucide-react";

type VideoModalProps = {
	isOpen: boolean;
	onClose: () => void;
};

const backdropVariants = {
	hidden: { opacity: 0 },
	visible: { opacity: 1 },
};

const modalVariants = {
	hidden: { opacity: 0, scale: 0.9 },
	visible: { opacity: 1, scale: 1 },
};

const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose }) => {
	const [showIframe, setShowIframe] = useState(false);

	useEffect(() => {
		if (isOpen) {
			// Lock scroll
			document.body.style.overflow = "hidden";

			const handleKeyDown = (e: KeyboardEvent) => {
				if (e.key === "Escape") onClose();
			};

			window.addEventListener("keydown", handleKeyDown);

			return () => {
				window.removeEventListener("keydown", handleKeyDown);
				document.body.style.overflow = "auto";
			};
		}
	}, [isOpen, onClose]);

	// Separate effect to reset iframe when modal closes
	useEffect(() => {
		if (!isOpen) {
			// schedule state reset after render
			const id = setTimeout(() => setShowIframe(false), 0);
			return () => clearTimeout(id);
		}
	}, [isOpen]);

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					className="fixed inset-0 bg-[rgba(2,6,23,0.95)] flex items-center justify-center z-50 p-4"
					variants={backdropVariants}
					initial="hidden"
					animate="visible"
					exit="hidden"
					onClick={onClose}
				>
					<motion.div
						className="max-w-4xl w-full relative"
						variants={modalVariants}
						initial="hidden"
						animate="visible"
						exit="hidden"
						transition={{ duration: 0.3 }}
						onClick={(e) => e.stopPropagation()}
					>
						{/* Close Button */}
						<button
							className="absolute -top-12 right-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center hover:bg-gray-800 hover:rotate-90 transition-transform duration-300"
							onClick={ onClose}
							aria-label="Close video modal"
						>
							<X className="text-[20px]" />
						</button>

						{/* Video Container */}
						<div className="relative pb-[56.25%] h-0 rounded-xl overflow-hidden shadow-2xl">
							{!showIframe ? (
								<button
									className="absolute top-0 left-0 w-full h-full bg-black/80 flex flex-col items-center justify-center text-white gap-3 text-lg hover:bg-black/60 transition-colors"
									onClick={() => setShowIframe(true)}
									aria-label="Play ChatAll Introduction Video"
								>
									<Play className="text-2xl" />
									Play Queryo Introduction
								</button>
							) : (
								<iframe
									className="absolute top-0 left-0 w-full h-full"
									src="https://www.youtube-nocookie.com/embed/AjU5hihAclw?autoplay=1"
									title="ChatAll Introduction"
									allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
									allowFullScreen
								/>
							)}
						</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default VideoModal;
