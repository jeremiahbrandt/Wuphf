import Link from 'next/link'
import PropTypes from 'prop-types'
import styled from 'styled-components'

MobileLink.prototype = {
	url: PropTypes.string,
	text: PropTypes.string,
	isShown: PropTypes.bool,
	onClick: PropTypes.func,
}

function capitalize(text) {
	return text.charAt(0).toUpperCase() + text.slice(1)
}

export default function MobileLink(props) {
	const { url, text, onClick, isShown } = props

	return (
		<StyledLi expanded={isShown}>
			<Link href={url} passHref>
				<StyledA onClick={onClick}>{capitalize(text)}</StyledA>
			</Link>
		</StyledLi>
	)
}

const StyledLi = styled.li`
	text-decoration: none;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: inherit;
	padding: 0 0.5rem;
	width: 100%;

	&:hover {
		/* background-color: ${(props) => props.theme.colors.lightBlue}; */
		background-color: ${({ theme }) => theme.button.primary.bg};
		cursor: pointer;
	}

	&:active {
		/* background-color: ${({ theme }) => theme.colors.highlightPressed}; */
		background-color: ${({ theme }) => theme.colors.primary};
	}

	height: ${(props) => (props.expanded ? '33.33vh;' : '0px;')};
	transition: 0.5s ease-in-out;
	text-align: center;
	align-items: center;
	justify-content: center;
`

const StyledA = styled.a`
	color: inherit;
	transition: 0.5s ease-in-out;
	&:hover {
		color: ${(props) => props.theme.button.primary.text};
	}
	display: flex;
	justify-content: center;
	align-items: center;
	text-decoration: none;
	height: 100%;
	width: 100%;
`
