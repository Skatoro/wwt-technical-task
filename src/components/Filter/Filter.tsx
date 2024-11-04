import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import {
	Box,
	Button,
	Checkbox,
	CheckboxGroup,
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

interface Props {
	isOpen: boolean
	handleClose: () => void
	handleCheckboxChange: (options: string[]) => void
	tempSelectedFilters: string[]
	filterItems: FilterChoose[]
	handleApply: () => void
	handleClear: () => void
}

export const Filter: FC<Props> = ({
	isOpen,
	handleClose,
	handleCheckboxChange,
	tempSelectedFilters,
	filterItems,
	handleApply,
	handleClear
}) => {
	const { t } = useTranslation('filter')
	return (
		<>
			<Modal
				scrollBehavior={'outside'}
				isOpen={isOpen}
				onClose={handleClose}
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
						<CheckboxGroup
							onChange={handleCheckboxChange}
							value={tempSelectedFilters}
						>
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
												value={option.id}
											>
												{option.name}
											</Checkbox>
										))}
									</SimpleGrid>
								</Stack>
							))}
						</CheckboxGroup>
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
									bg={'brand.300'}
									color={'white'}
									textStyle={'button'}
									mr={3}
									w={'184px'}
									h={'64px'}
									onClick={handleApply}
									_hover={{
										bg: 'brand.100'
									}}
								>
									{t('apply')}
								</Button>
							</Box>
							<Button
								variant="ghost"
								onClick={handleClear}
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
