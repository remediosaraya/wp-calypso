/** @format */
/**
 * Internal dependencies
 */
import { http as rawHttp } from 'state/http/actions';
import { http } from 'state/data-layer/wpcom-http/actions';
import { requestHttpData } from 'state/data-layer/http-data';

export const requestGeoLocation = () =>
	requestHttpData(
		'geo',
		rawHttp( {
			method: 'GET',
			url: 'https://public-api.wordpress.com/geo/',
		} ),
		{ fromApi: () => ( { body: { country_short } } ) => [ [ 'geo', country_short ] ] }
	);

export const requestSiteAlerts = siteId => {
	const id = `site-alerts-${ siteId }`;

	return requestHttpData(
		id,
		http(
			{
				method: 'GET',
				path: `/sites/${ siteId }/alerts`,
				apiNamespace: 'wpcom/v2',
			},
			{}
		),
		{
			freshness: 5 * 60 * 1000,
			fromApi: () => ( { suggestions, threats, warnings } ) => [
				[
					id,
					{
						suggestions,
						threats: threats.map( threat => ( {
							id: threat.id,
							signature: threat.signature,
							description: threat.description,
							firstDetected: Date.parse( threat.first_detected ),
							...( threat.context ? { filename: threat.filename, context: threat.context } : {} ),
							...( threat.diff ? { filename: threat.filename, diff: threat.diff } : {} ),
							...( threat.extension
								? {
										extension: {
											type: threat.extension.type,
											name: threat.extension.name,
											slug: threat.extension.slug,
											version: threat.extension.version,
										},
									}
								: {} ),
						} ) ),
						warnings,
					},
				],
			],
		}
	);
};
