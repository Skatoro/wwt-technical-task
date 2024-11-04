import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Box, Button, useDisclosure } from '@chakra-ui/react'

import useFetchFilters from '@/hooks/useFetchFilters.ts'
import { Filter } from '@components/Filter/Filter.tsx'

export const App = () => {
	const {
		isOpen: isFilterOpen,
		onOpen: onFilterOpen,
		onClose: onFilterClose
	} = useDisclosure()
	const { data } = useFetchFilters()
	const { t } = useTranslation('filter')
	const [selectedFilters, setSelectedFilters] = useState<string[]>([]) // some data from api
	const [tempSelectedFilters, setTempSelectedFilters] =
		useState<string[]>(selectedFilters)
	const filterItems = data?.filterItems || []

	const handleClose = () => {
		setTempSelectedFilters(selectedFilters)
		onFilterClose()
	}
	const handleCheckboxChange = (options: string[]) => {
		setTempSelectedFilters(options)
	}
	const handleClear = () => {
		setTempSelectedFilters([])
	}
	const handleApply = () => {
		setSelectedFilters(tempSelectedFilters)
	}

	return (
		<>
			<Box
				maxW="90rem"
				mx="auto"
				minH="100dvh"
			>
				<Button
					onClick={onFilterOpen}
					bg={'brand.300'}
					color={'white'}
				>
					{t('openModal')}
				</Button>
			</Box>

			<Filter
				isOpen={isFilterOpen}
				handleClose={handleClose}
				handleCheckboxChange={handleCheckboxChange}
				tempSelectedFilters={tempSelectedFilters}
				filterItems={filterItems}
				handleApply={handleApply}
				handleClear={handleClear}
			/>
		</>
	)
}
