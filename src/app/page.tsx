"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import dynamic from "next/dynamic";
import Features from "@/components/Features";
import Pricing from "@/components/Pricing";
import AgentsSection from "@/components/AgentsSection";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import VideoModal from "@/components/VideoModal";


const MultiLLMHero = dynamic(() => import("@/components/Hero"), { ssr: false });

export default function Home() {
	const [reducedMotion, setReducedMotion] = useState(false);
	const [showVideoModal, setShowVideoModal] = useState(false);

	useEffect(() => {
		const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
		const updateMotion = () => setReducedMotion(mediaQuery.matches);
		updateMotion();
		mediaQuery.addEventListener("change", updateMotion);
		return () => mediaQuery.removeEventListener("change", updateMotion);
	}, []);

	return (
		<div className="min-h-screen ">
			<style jsx global>{`
				html {
					scroll-behavior: smooth;
				}
				/* Remove overscroll behavior if it causes issues */
				@media (prefers-reduced-motion: reduce) {
					*,
					*::before,
					*::after {
						animation-duration: 0.01ms !important;
						animation-iteration-count: 1 !important;
						transition-duration: 0.01ms !important;
					}
					html {
						scroll-behavior: auto;
					}
				}
			`}</style>

			<Header reducedMotion={reducedMotion} />
			<MultiLLMHero
				reducedMotion={reducedMotion}
				setShowVideoModal={setShowVideoModal}
			/>
			{/* <Features reducedMotion={reducedMotion} /> */}
			<Pricing reducedMotion={reducedMotion} />
			<AgentsSection reducedMotion={reducedMotion} />
			<FAQ reducedMotion={reducedMotion} />
			<CTA reducedMotion={reducedMotion} />

			<Footer />

			{/* Render the modal */}
			<VideoModal
				isOpen={showVideoModal}
				onClose={() => setShowVideoModal(false)}
			/>
		</div>
	);
}
