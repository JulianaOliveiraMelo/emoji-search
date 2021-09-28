export default function paginator(items, current_page, per_page_items, query) {
	let newItems = items;
	if (query) {
		newItems = items.filter(
			i =>
				i.tags.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
				i.group.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
				i.hexcode.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
				i.openmoji_tags.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
				i.subgroups.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
				i.group.toLowerCase().indexOf(query.toLowerCase()) !== -1
		);
	}

	let page = current_page || 1,
		per_page = per_page_items || 10,
		offset = (page - 1) * per_page,
		paginatedItems = newItems.slice(offset).slice(0, per_page_items),
		total_pages = Math.ceil(newItems.length / per_page);

	return {
		page: page,
		per_page: per_page,
		pre_page: page - 1 ? page - 1 : null,
		next_page: total_pages > page ? page + 1 : null,
		total: newItems.length,
		total_pages: total_pages,
		data: paginatedItems,
	};
}
