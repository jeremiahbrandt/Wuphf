import React, { useState } from 'react'

import PropTypes from 'prop-types'
import styled from 'styled-components'

import Title from '../styledComponents/Title'
import Wuphf from './Wuphf'

Wuphfs.propTypes = {
	wuphfs: PropTypes.array.isRequired,
}

function Wuphfs(props) {
	const { lastWuphfElementRef } = props
	const [wuphfs, setWuphs] = useState(props.wuphfs)

	function handleDeleteWuphf(index) {
		setWuphs(wuphfs.filter((wuphf, i) => i !== index))
	}

	if (!wuphfs || wuphfs.length === 0) {
		return <Title>There are no Wuphfs to display.</Title>
	}

	return (
		<Wrapper>
			{wuphfs.map((wuphf, index) => {
				if (wuphfs.length === index + 1) {
					return (
						<>
							<Wuphf
								lastWuphfElementRef={lastWuphfElementRef}
								key={wuphf.id}
								onDelete={() => handleDeleteWuphf(index)}
								{...wuphf}
							/>
							{/* <p>last element {`${lastWuphfElementRef}`}</p> */}
						</>
					)
				} else {
					return <Wuphf key={wuphf.id} {...wuphf} />
				}
			})}
		</Wrapper>
	)
}

const Wrapper = styled.div`
	border: 1.5px solid #ccc;
	border-top-left-radius: 20px;
	border-top-right-radius: 20px;
	border-bottom-left-radius: 20px;
	border-bottom-right-radius: 20px;
`

export default Wuphfs
