import { File } from '../../types';
import { FileGridItem } from './FileGridItem';
import styles from './FileGrid.module.css';

export interface FileGridProps {
	files: File[];
	onItemClick: (file: File) => void;
}

export function FileGrid(props: FileGridProps) {
	return (<div class={styles.grid}>
		{props.files.map(f => <FileGridItem key={f.name} file={f} onClick={() => props.onItemClick(f)} />)}
	</div>);
}
