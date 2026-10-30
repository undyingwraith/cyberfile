import "./App.css";

import { invoke } from "@tauri-apps/api/core";
import { homeDir, resolve } from "@tauri-apps/api/path";
import { readDir } from "@tauri-apps/plugin-fs";
import { openPath } from "@tauri-apps/plugin-opener";
import { useEffect, useState } from "preact/hooks";
import { Button, FileGrid, Loader } from './components';
import { File } from './types';

function App() {
	const [greetMsg, setGreetMsg] = useState("");
	const [currentPath, setCurrentPath] = useState("/");
	const [pathInput, setPathInput] = useState("/");
	const [files, setFiles] = useState<File[] | null>(null);

	async function greet() {
		// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
		setGreetMsg(await invoke("greet", { name }));
	}
	async function setToHomeDir() {
		const homeDirPath = await homeDir();
		setCurrentPath(homeDirPath);
	}

	useEffect(() => {
		setToHomeDir();
	}, []);

	useEffect(() => {
		async function getFiles() {
			setFiles(null);
			const entries = await readDir(currentPath);

			const names = entries.map((entry) => ({
				name: entry.name || "",
				isDir: !!entry.isDirectory,
			}));

			setFiles(names);
		}

		setPathInput(currentPath);
		getFiles();
	}, [currentPath]);

	async function resolvePath(name: string) {
		const newPath = await resolve(currentPath, name);
		setCurrentPath(newPath);
	}

	async function handleClick(file: File) {
		if (file.isDir) {
			await resolvePath(file.name);
		} else {
			await openPath(await resolve(currentPath, file.name));
		}
	}

	return (
		<>
			<header>
				<Button onClick={() => resolvePath('..')}>^</Button>
				<input type="text" value={pathInput} onChange={ev => setPathInput(ev.currentTarget.value)} />
			</header>
			<div>
				<aside id="sidebar">
					<menu>
						<li>Places</li>
						<li>
							<Button onClick={setToHomeDir}>Home</Button>
						</li>
						<li>Devices</li>
						<li>
							<Button onClick={() => setCurrentPath("/")}>/</Button>
						</li>
						<li>TODO</li>
					</menu>
				</aside>
				<main>
					{files ? (
						<FileGrid files={files} onItemClick={handleClick} />
					) : (
						<Loader />
					)}
				</main>
			</div>
		</>
	);
}

export default App;
