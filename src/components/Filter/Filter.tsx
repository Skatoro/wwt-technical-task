import { FC, memo } from 'react'
import { useTranslation } from 'react-i18next'

import {
	Box,
	Button,
	Checkbox,
	Flex,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	SimpleGrid,
	Stack,
	Text
} from '@chakra-ui/react'

import { FilterChoose } from '@api/types/Filter'
import { SearchRequestFilter } from '@api/types/SearchRequest/SearchRequestFilter.ts'

interface Props {
	isOpen: boolean
	closeAndReset: () => void
	handleCheckboxChange: (id: string, optionId: string) => void
	checkedItems: SearchRequestFilter
	filterItems: FilterChoose[]
	handleApply: () => void
	handleClear: () => void
	updateTempCheckedItems: (id: string, optionId: string) => void
}

const FilterComponent: FC<Props> = ({
	isOpen,
	closeAndReset,
	handleCheckboxChange,
	filterItems,
	handleApply,
	handleClear,
	checkedItems
}) => {
	const { t } = useTranslation('filter')

	const isChecked = (itemId: string, optionId: string) => {
		const item = checkedItems.find(item => item.id === itemId)
		return item ? item.optionsIds.includes(optionId) : false
	}
	// probably not the best decision since it gets O(n^2) operations each check update change,
	// but that what I came up with

	return (
		<>
			<Modal
				scrollBehavior={'outside'}
				isOpen={isOpen}
				onClose={closeAndReset}
			>
				<ModalOverlay />
				<ModalContent
					minW={'380px'}
					w={'100%'}
					maxW="100%"
					pb={6}
				>
					<ModalHeader
						textStyle={'headline-4'}
						mb={'10'}
					>
						{t('filter')}
					</ModalHeader>

					<ModalCloseButton />
					<ModalBody>
						{filterItems.map(item => (
							<Stack
								key={item.id}
								borderBottom={'2px'}
								borderColor={'gray.200'}
								pb={'6'}
								mb={'6'}
							>
								<Text
									textStyle={'body-text-3'}
									lineHeight={'7'}
									mb={'4'}
								>
									{item.name}
								</Text>
								<SimpleGrid
									columns={{ base: 2, md: 3 }}
									rowGap={'4'}
									columnGap={4}
								>
									{item.options.map(option => (
										<Checkbox
											isChecked={isChecked(item.id, option.id)}
											onChange={() => handleCheckboxChange(item.id, option.id)}
											sx={{
												'& .chakra-checkbox__control': {
													background: 'none',
													borderRadius: '5px',
													borderWidth: '2px',
													_hover: {
														background: 'white'
													}
												},
												'& svg': {
													color: 'white'
												}
											}}
											_checked={{
												'& .chakra-checkbox__control': {
													background: 'brand.300',
													borderWidth: '2px',
													borderRadius: '5px',
													_hover: {
														background: 'brand.300'
													}
												},
												'& svg': {
													strokeWidth: '5px',
													color: 'white'
												}
											}}
											size={'md'}
											key={option.id}
										>
											{option.name}
										</Checkbox>
									))}
								</SimpleGrid>
							</Stack>
						))}
					</ModalBody>

					<ModalFooter>
						<Flex
							justifyContent="space-between"
							alignItems="center"
							width="100%"
						>
							<Box flex="1" />
							<Box
								position="absolute"
								left="50%"
								transform="translateX(-50%)"
							>
								<Button
									colorScheme="brand"
									textStyle={'button'}
									mr={3}
									w={'184px'}
									h={'64px'}
									onClick={handleApply}
								>
									{t('apply')}
								</Button>
							</Box>
							<Button
								variant="link"
								onClick={handleClear}
								color={'primary.100'}
							>
								{t('clearAllParameters')}
							</Button>
						</Flex>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	)
}
export const Filter = memo(FilterComponent)
