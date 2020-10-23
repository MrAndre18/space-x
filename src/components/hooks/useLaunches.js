import { useState, useEffect } from 'react';
import FetchData from './../../service/FetchData';

const useLaunches = () => {

	const fetchData = new FetchData();
	const [ launches, setLaunches ] = useState([]);

	useEffect(() => {
		fetchData.getLaunches()
			.then( launches => setLaunches(launches) )
	}, []);

	const getLaunch = id => launches.find( item => item.id === id )

	return { launches, getLaunch }
}

export default useLaunches;