import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import YouTube from 'react-youtube';
import Main from './../main';
import useLaunches from './../hooks/useLaunches';

import './details.css';

const Details = (props) => {

	const [launch, setLaunch] = useState(null);
	const { getLaunch } = useLaunches();

	useEffect(() => {
		setLaunch(getLaunch(props.match.params.id));
	}, [getLaunch, props])

	const history = useHistory();

	if (!launch) {
		return (
			<div className="spinner">
				<span>Loading...</span>
			</div>
		)
	}

	return (
		<>
			<Main name={ launch.name } />
			<section className="details d-flex flex-column align-items-center">
				<div className="container">
					<div className="details-row">
						<div className="details-image">
							<img
								src={ launch.links.patch.small }
								alt={ launch.name }
							/>
						</div>
						<div className="details-content">
							<p className="details-description">{ launch.details }</p>
						</div>
					</div>
					<YouTube
						className="details-youtube"
						videoId={ launch.links.youtube_id }
					/>
				</div>
				<button
					onClick={ history.goBack }
					className="button button-back"
				>go back</button>
			</section>
		</>
	);
}

export default  Details;