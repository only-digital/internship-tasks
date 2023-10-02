import { useMemo } from "react"

export default (items, term) => useMemo(() => {
	if (!term) {
		return items
	}
	const reg = new RegExp(term, 'i')
	return items.filter((el) => reg.test(el.title) || reg.test(el.text))
}, [term, items])