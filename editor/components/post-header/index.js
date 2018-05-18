/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { FormToggle, withInstanceId } from '@wordpress/components';
import { withSelect, withDispatch } from '@wordpress/data';
import { compose } from '@wordpress/element';

function PostHeader( { onToggleHeader, hasHeader = false, instanceId } ) {
	const headerToggleId = 'header-toggle-' + instanceId;

	return [
		<label htmlFor={ headerToggleId }>{ __( 'Display header' ) }</label>,
		<FormToggle
			key="toggle"
			checked={ hasHeader }
			onChange={ () => onToggleHeader( ! hasHeader ) }
			id={ headerToggleId }
		/>,
	];
}

export default compose( [
	withSelect( ( select ) => {
		return {
			hasHeader: select( 'core/editor' ).getEditedPostAttribute( 'header' ),
		};
	} ),
	withDispatch( ( dispatch ) => {
		return {
			onToggleHeader( hasHeader ) {
				dispatch( 'core/editor' ).editPost( { header: hasHeader } )
			}
		};
	} ),
	withInstanceId,
] )( PostHeader );

