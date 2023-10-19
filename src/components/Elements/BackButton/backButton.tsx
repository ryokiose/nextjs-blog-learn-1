import Link from "next/link";
import styles from "./BackButton.module.css";

export const BackButton = () => {
	return (
		<div className={styles.backToHome}>
			<Link href="/">← Back to home</Link>
		</div>
	);
};

export default BackButton;
