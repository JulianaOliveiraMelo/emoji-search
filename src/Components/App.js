import useEmojisSearch from './useEmojisSearch';
import React, { useState, useRef, useCallback } from 'react';
import '../Styles/App.css';
export default function App() {
	const [query, setQuery] = useState('');
	const [pageNumber, setPageNumber] = useState(1);
	const { emojis, hasMore, loading, error } = useEmojisSearch(
		query,
		pageNumber
	);
	const observer = useRef();

	const allEmojis = useRef();
	const lastEmojisElementRef = useCallback(
		node => {
			if (loading) return;
			if (observer.current) observer.current.disconnect();
			observer.current = new IntersectionObserver(entries => {
				if (entries[0].isIntersecting && hasMore) {
					setPageNumber(prevPageNumber => prevPageNumber + 1);
				}
			});
			if (node) observer.current.observe(node);
		},
		[loading, hasMore]
	);

	function handleSearch(e) {
		setQuery(e.target.value);
		setPageNumber(1);
	}

	return (
		<>
			<input type='text' value={query} onChange={handleSearch}></input>
			<p className='container'>
				{emojis.map((emoji, index) => {
					if (emojis.length === index + 1) {
						return (
							<span
								className='fade emojis'
								key={emoji.hexcode}
								ref={lastEmojisElementRef}>
								{emoji.emoji}
							</span>
						);
					} else {
						return (
							<span className='fade emojis' key={emoji.hexcode} ref={allEmojis}>
								{emoji.emoji}
							</span>
						);
					}
				})}
			</p>

			<div>{loading && 'Loading...'}</div>
			<div>{error && 'Error'}</div>
		</>
	);
}
