import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import SettingsForm from '../components/SettingsForm'
import styled from 'styled-components'
import Avatar from '../components/Avatar'
import breakpoint from '../styles/breakpoint'
import Container from '../components/styledComponents/Container'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useSession } from 'next-auth/react'

const schema = yup.object({
	username: yup.string().min(4, 'Minimum length is 4').required('Required'),
	animal: yup.string().required('Required'),
	bio: yup.string().required('Required'),
})

const animals = [
	{
		link: 'animal_svgs/dog_nau7in.svg',
		label: 'Dog',
	},
	{
		link: 'animal_svgs/cat_hizjv6.svg',
		label: 'Cat',
	},
	{
		link: 'animal_svgs/bird_wlfceb.svg',
		label: 'Bird',
	},
	{
		link: 'animal_svgs/owl_xnejqi.svg',
		label: 'Owl',
	},
	{
		link: 'animal_svgs/monkey_ywewbg.svg',
		label: 'Monkey',
	},
	{
		link: 'animal_svgs/bunny_tgvcdh.svg',
		label: 'Bunny',
	},
	{
		link: 'animal_svgs/panda_fb7grl.svg',
		label: 'Panda',
	},
]

function RegistrationForm() {
	const { status } = useSession()
	
	// TODO: Replace with an actual database response for all animal types
	const [selectedAnimal, setSelectedAnimal] = useState(animals[0])
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		watch,
		getValues,
	} = useForm({
		mode: 'onTouched',
		resolver: yupResolver(schema),
		defaultValues: {
			selectedAnimal: animals[0],
		},
	})

	useEffect(() => {
		const subscription = watch((value, { name, type }) => {
			let newAnimal = value
			for (let i = 0; i < animals.length; i++) {
				if (animals[i].label.toUpperCase() === watch('animal').toUpperCase()) {
					newAnimal = animals[i]
					break
				}
			}
			setSelectedAnimal(newAnimal)
		})
		return () => subscription.unsubscribe()
	}, [watch])

	return (
		<Container>
			<Wrapper>
				<div className='avatarContainer'>
					<Avatar
						username='Joe Smith'
						profileImageUrl={selectedAnimal.link}
						size='large'
					/>
				</div>
				<SettingsForm
					selectedAnimal={selectedAnimal}
					setSelectedAnimal={setSelectedAnimal}
					animals={animals}
					handleSubmit={handleSubmit}
					errors={errors}
					watch={watch}
					isSubmitting={isSubmitting}
					register={register}
				/>
			</Wrapper>
		</Container>
	)
}

export default RegistrationForm

const Wrapper = styled.div`
	margin: 0 1rem;

	@media ${breakpoint.up.sm} {
		display: grid;
		grid-template-columns: 50% 50%;
	}

	.avatarContainer {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 1rem;
	}
`