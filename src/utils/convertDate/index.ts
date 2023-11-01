export function convert(date: string) {
	// yyyy-mm-ddThh:mm:ss.sssをyyyy-mm-ddに変換
	const dateArray = date.split("T");
	return dateArray[0];
}
