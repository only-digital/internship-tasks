export const useSearch = ({ query, tasks }) => {
    const q = query.trim().toLowerCase();

    const includes = (text) => text.toLowerCase().includes(q);

    const results = tasks.filter(({ title, text }) => includes(title) || includes(text));

    return {
        results
    };
}
