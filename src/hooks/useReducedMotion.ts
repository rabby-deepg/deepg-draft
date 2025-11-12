import { useEffect, useState } from "react";

/**
 * Custom hook that detects if the user prefers reduced motion
 * and automatically updates on preference change.
 *
 * Returns a boolean: `true` if reduced motion is preferred.
 */
export function useReducedMotion(): boolean {
	const [reducedMotion, setReducedMotion] = useState(false);

	useEffect(() => {
		if (typeof window === "undefined") return;

		const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

		// Defer initial update to avoid ESLint "setState in effect" warning
		requestAnimationFrame(() => setReducedMotion(mediaQuery.matches));

		const handleChange = (e: MediaQueryListEvent) => {
			setReducedMotion(e.matches);
		};

		mediaQuery.addEventListener("change", handleChange);

		return () => {
			mediaQuery.removeEventListener("change", handleChange);
		};
	}, []);

	return reducedMotion;
}
