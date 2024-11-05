import { useTranslation } from 'react-i18next'

import { Box, Button, Flex, useDisclosure } from '@chakra-ui/react'

import useFetchFilters from '@/hooks/useFetchFilters.ts'
import { ApplyFilter } from '@components/Filter/ApplyFilter.tsx'
import { Filter } from '@components/Filter/Filter.tsx'
import { filterStore } from '@store/filter/filter.ts'
import { FilterStore } from '@store/filter/types/filter.types.ts'

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
	const filterItems = data?.filterItems || []

	const updateTempCheckedItems = filterStore(
		(state: FilterStore) => state.updateTempCheckedItems
	)
	const updateCheckedItems = filterStore(
		(state: FilterStore) => state.updateCheckedItems
	)
	const resetTempCheckedItems = filterStore(
		(state: FilterStore) => state.resetTempCheckedItems
	)
	const clearTempCheckedItems = filterStore(
		(state: FilterStore) => state.clearTempCheckedItems
	)
	const checkedItems = filterStore((state: FilterStore) => state.checkedItems)
	const tempCheckedItems = filterStore(
		(state: FilterStore) => state.tempCheckedItems
	)

	const resetFilter = () => {
		resetTempCheckedItems()
	}
	const handleCloseAll = () => {
		onFilterClose()
		onApplyClose()
	}
	const closeAndReset = () => {
		resetFilter()
		handleCloseAll()
	}
	const handleCheckboxChange = (id: string, optionId: string) => {
		updateTempCheckedItems(id, optionId)
	}
	const handleClear = () => {
		clearTempCheckedItems()
	}
	const handleApply = () => {
		updateCheckedItems()
		handleCloseAll()
	}

	return (
		<>
			<Box
				maxW="90rem"
				mx="auto"
				minH="100dvh"
				pt={'10'}
			>
				<Flex justifyContent={'center'}>
					<Button
						onClick={onFilterOpen}
						bg={'brand.300'}
						color={'white'}
						_hover={{
							bg: 'brand.100'
						}}
					>
						{t('openModal')}
					</Button>
				</Flex>
				{checkedItems.map(checkedItem => (
					<div key={checkedItem.id}>
						{checkedItem.optionsIds.map(optionId => (
							<div key={optionId}>{optionId}</div>
						))}
					</div>
				))}
			</Box>

			<Filter
				isOpen={isFilterOpen}
				closeAndReset={closeAndReset}
				handleCheckboxChange={handleCheckboxChange}
				checkedItems={tempCheckedItems}
				filterItems={filterItems}
				handleApply={onApplyOpen}
				handleClear={handleClear}
				updateTempCheckedItems={updateTempCheckedItems}
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
