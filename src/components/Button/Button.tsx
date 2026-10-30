import styles from './Button.module.css';

export interface ButtonProps {
	children: any;
	onClick?: () => void;
}

export function Button({ children, onClick }: ButtonProps) {
	return (<div class={styles.button} onClick={onClick}>
		{children}
	</div>);
}
