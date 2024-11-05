import { SearchRequestFilter } from '@api/types/SearchRequest/SearchRequestFilter.ts'

export interface FilterStore {
	checkedItems: SearchRequestFilter
	tempCheckedItems: SearchRequestFilter
	updateCheckedItems: () => void
	updateTempCheckedItems: (id: string, optionId: string) => void
	resetTempCheckedItems: () => void
	clearTempCheckedItems: () => void
	initFilter: () => void
}
