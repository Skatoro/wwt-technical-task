import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Box, Button, useDisclosure } from '@chakra-ui/react'

import useFetchFilters from '@/hooks/useFetchFilters.ts'
import { ApplyFilter } from '@components/Filter/ApplyFilter.tsx'
import { Filter } from '@components/Filter/Filter.tsx'

export const App = () => {
	const {
		isOpen: isFilterOpen,
		onOpen: onFilterOpen,
		onClose: onFilterClose
	} = useDisclosure()
	const {
		isOpen: isApplyOpen,
		onOpen: onApplyOpen,
		onClose: onApplyClose
	} = useDisclosure()
	const { data } = useFetchFilters()
	const { t } = useTranslation('filter')
	const [selectedFilters, setSelectedFilters] = useState<string[]>([]) // some data from api
	const [tempSelectedFilters, setTempSelectedFilters] =
		useState<string[]>(selectedFilters)
	const filterItems = data?.filterItems || []

	const resetFilter = () => {
		setTempSelectedFilters(selectedFilters)
	}
	const handleCloseAll = () => {
		onFilterClose()
		onApplyClose()
	}
	const closeAndReset = () => {
		resetFilter()
		handleCloseAll()
	}
	const handleCheckboxChange = (options: string[]) => {
		setTempSelectedFilters(options)
	}
	const handleClear = () => {
		setTempSelectedFilters([])
	}
	const handleApply = () => {
		setSelectedFilters(tempSelectedFilters)
		handleCloseAll()
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
				closeAndReset={closeAndReset}
				handleCheckboxChange={handleCheckboxChange}
				tempSelectedFilters={tempSelectedFilters}
				filterItems={filterItems}
				handleApply={onApplyOpen}
				handleClear={handleClear}
			/>

			<ApplyFilter
				isOpen={isApplyOpen}
				handleClose={onApplyClose}
				closeAndReset={closeAndReset}
				handleApply={handleApply}
			/>
		</>
	)
}
