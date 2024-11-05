import { FC, memo } from 'react'
import { useTranslation } from 'react-i18next'

import {
	Button,
	Flex,
	Modal,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay
} from '@chakra-ui/react'

interface Props {
	isOpen: boolean
	handleClose: () => void
	handleApply: () => void
	closeAndReset: () => void
}

const ApplyFilterComponent: FC<Props> = ({
	isOpen,
	handleClose,
	handleApply,
	closeAndReset
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
						{t('doYouWantToApplyNewFilter')}
						<ModalCloseButton
							size={'lg'}
							top={'7'}
						/>
					</ModalHeader>
					<ModalFooter>
						<Flex
							justifyContent="center"
							alignItems="center"
							width="100%"
						>
							<Button
								onClick={closeAndReset}
								variant={'outline'}
								w={'280px'}
								mr={'8'}
							>
								{t('useOldFilter')}
							</Button>
							<Button
								onClick={handleApply}
								colorScheme="brand"
								w={'280px'}
							>
								{t('applyNewFilter')}
							</Button>
						</Flex>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	)
}
export const ApplyFilter = memo(ApplyFilterComponent)
