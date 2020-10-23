import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Main from '../main';
import FetchData from './../../service/FetchData';

import './calendar.css';

const Calendar = () => {

	const fetchData = new FetchData();
	const [ launches, setLaunches ] = useState([]);

	useEffect(() => {
		fetchData.getLaunches()
			.then( data => setLaunches(data) )
	}, [])

	return (
		<>
			<Main name='Calendar' />
			<section className="calendar">
				<div className="container">
					<ul className="calendar-list">
						{
							launches.map( item => (
								<li className="calendar-item" key={ item.id }>
								<article className="launches">
									<div className="launches-image">
										<img
											src={ item.links.patch.small }
											alt=""
										/>
									</div>
									
									<div className="launches-content">
										<h2 className="launches-title">{ item.name }</h2>
										<Link
											to={`/details/${ item.id }`}
											className="button launches-details"
										>Подробнее</Link>
									</div>
								</article>
							</li>
							))
						}
					</ul>
				</div>
			</section>
		</>
	);
}

export default Calendar;