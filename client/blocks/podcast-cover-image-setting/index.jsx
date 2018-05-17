/** @format */

/**
 * External dependencies
 */
import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { localize } from 'i18n-calypso';

/**
 * Internal dependencies
 */
import PodcastCoverImage from 'blocks/podcast-cover-image';

class PodcastCoverImageSetting extends PureComponent {
	render() {
		return (
			<Fragment>
				<PodcastCoverImage size={ 96 } />
			</Fragment>
		);
	}
}

export default connect()( localize( PodcastCoverImageSetting ) );
