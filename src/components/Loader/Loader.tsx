import styles from './Loader.module.css';

export function Loader() {
	return (<div class={styles.container}>
		<div class={styles.frame}>
			<div class={styles.loader}>
				<div class={styles.content} />
			</div>
		</div>
	</div>);
}
