import { useEffect, useState } from 'react';
import Openmoji from 'openmoji';
import Pagination from '../logic/Pagination';

export default function useEmojiSearch(query, pageNumber) {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [emojis, setEmojis] = useState([Openmoji.openmojis]);
	const [hasMore, setHasMore] = useState(false);

	useEffect(() => {
		setEmojis([]);
	}, [query]);

	useEffect(() => {
		setError(false);

		setEmojis(prevEmojis => {
			setLoading(true);
			const newEmojis = [
				...new Set([
					...prevEmojis,
					...Pagination(Openmoji.openmojis, pageNumber, 700, query).data.map(
						element => {
							return element;
						}
					),
				]),
			];
			if (emojis.length === Openmoji.openmojis.length || query !== '') {
				setLoading(false);
			} else {
				setTimeout(() => {
					setLoading(false);
				}, 1000);
			}
			return newEmojis;
		});
		setHasMore(emojis.length > 0);
	}, [query, pageNumber, emojis.length]);
	return { loading, error, emojis, hasMore };
}
