function hasDuplicate(array: string | any[]) {
	const uniqueItems = new Set(array);
	return uniqueItems.size !== array.length;
}
export default hasDuplicate;
