import { File } from '../../types';
import styles from './FileGrid.module.css';

export interface FileGridItemProps {
	file: File;
	onClick: () => void;
}

export function FileGridItem(props: FileGridItemProps) {
	let classes = [styles.item];
	if (props.file.isDir) {
		classes.push(styles.directory);
	}
	return <div class={classes.join(' ')} onClick={props.onClick}>{props.file.name}</div>;
}
