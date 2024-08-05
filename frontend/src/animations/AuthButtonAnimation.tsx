import {motion} from "framer-motion";
import { ReactNode } from "react";

interface AuthButtonAnimationProps {
    children: ReactNode;
    type?: string;
  }

export default function AuthButtonAnimation({children, type}: AuthButtonAnimationProps) {
    switch (type) {
		default:
			return (
				<motion.div
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.9 }}
				>
					{children}
				</motion.div>
			);
	}
}
