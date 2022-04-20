import React, { useEffect, useState } from 'react'

import { faBell } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import moment from 'moment'
import { useRouter } from 'next/router'
import styled from 'styled-components'

import Avatar from '../../components/general/Avatar'
import Button from '../../components/general/Button'
import RoundButton from '../../components/general/RoundButton'
import Error from '../../components/layout/Error'
import Loading from '../../components/layout/Loading'
import Container from '../../components/styledComponents/Container'
import WuphfsFeed from '../../components/wuphfs/WuphfsFeed'

function UserPage() {
	const router = useRouter()
	const { id } = router.query
	const [user, setUser] = useState()
	const [wuphfs, setWuphfs] = useState(null)
	const [userLoading, setUserLoading] = useState(true)
	const [wuphfsLoading, setWuphfsLoading] = useState(true)
	const [userError, setUserError] = useState()
	const [followingError, setFollowingError] = useState()
	const [wuphfsError, setWuphfsError] = useState()
	const [cursor, setCursor] = useState(null)
	const [hasMore, setHasMore] = useState(true)

	const getWuphfs = async () => {
		setWuphfsLoading(true)
		const res = await axios.get(`/api/users/${id}/wuphfs`).catch((err) => {
			setWuphfsError({ data: err.response.data, status: err.response.status })
			setWuphfsLoading(false)
		})

		if (res) {
			// TODO: Add pagination to /users/[id]/wuphfs endpoint
			// if (cursor == res.data.cursor) {
			// 	setHasMore(false)
			// }
			// setCursor(res.data.cursor)
			// console.log('res?.data.cursor', res.data.cursor)
			console.log('res.daata', res.data)
			const newWuphfs = wuphfs !== null ? [...wuphfs, ...res.data] : res.data
			setWuphfs(newWuphfs)
			setWuphfsLoading(false)
			console.log(newWuphfs)
		}
	}

	async function getUser() {
		const res = await axios.get(`/api/users/${id}`).catch((err) => {
			setUserError({ data: err.response.data, status: err.response.status })
		})
		setUser(res?.data)
		setUserLoading(false)
	}

	useEffect(() => {
		if (id) {
			getUser()
			getWuphfs()
		}
	}, [id])

	async function handleFollow() {
		const res = await axios.post(`/api/users/${id}/following`).catch((err) => {
			setFollowingError({
				data: err.response.data,
				status: err.response.status,
			})
		})

		if (res) {
			alert(`${id} followed`)
		}
	}

	if (userError) return <Error error={userError} />

	return (
		<Container>
			{userLoading ? (
				<Loading />
			) : (
				<TopContainer>
					<Banner />

					<Header>
						<Text>
							<Username as='h1'>{user?.userName}</Username>
							<Joined as='h3'>
								Joined {moment(user?.createdAt).fromNow()}
							</Joined>
						</Text>

						<AvatarWrapper>
							<Avatar
								username='John Doe'
								profileImageUrl={'animal_svgs/dog_nau7in.svg'}
								size='large'
								border='shown'
							/>
						</AvatarWrapper>

						<Buttons>
							{/* <Button variant='primary'>...</Button> */}
							<RoundButton variant='primary'>
								<FontAwesomeIcon icon={faBell} />
							</RoundButton>
							<Button onClick={handleFollow} variant='primary'>
								Follow
							</Button>
						</Buttons>
					</Header>

					<Bio>{user?.bio}</Bio>
				</TopContainer>
			)}

			{/* {wuphfsLoading ? <Loading /> : <Wuphfs wuphfs={wuphfs && wuphfs} />} */}
			<WuphfsFeed
				wuphfs={wuphfs}
				loading={wuphfsLoading}
				hasMore={hasMore}
				getWuphfs={getWuphfs}
			/>
		</Container>
	)
}

const TopContainer = styled.div`
	position: relative;
`

const Banner = styled.div`
	background-color: ${(props) => props.theme.colors.darkBlue};
	height: 200px;
	border-radius: 20px;
`
const AvatarWrapper = styled.div`
	position: absolute;
	left: 50%;
	transform: translate(-50%, -50%);
`
const Header = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 60px;
	padding: 10px;
`

const Text = styled.div``

const Username = styled.h1`
	font-weight: bold;
	font-size: 1.5rem;
	padding-bottom: 15px;
	padding-top: 15px;
`

const Joined = styled.h3`
	font-size: 0.75rem;
`

const Buttons = styled.div`
	/* padding-top: 5px; */
	display: flex;
	gap: 0.5rem;
`

const Bio = styled.div`
	padding: 10px;
	padding-top: 30px;
	padding-bottom: 30px;
	line-height: 1.25em;
`

export default UserPage
