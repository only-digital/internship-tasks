export const useSearch = (searchValue, data) => {
	const value = searchValue.toLowerCase();

	if (!searchValue) {
		return data;
	} else {
		return data.filter(({ title, text }) => title.toLowerCase().includes(value) || text.toLowerCase().includes(value));
	}
};