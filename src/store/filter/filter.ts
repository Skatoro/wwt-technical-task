import { create } from 'zustand'

import { FilterType } from '@api/types/Filter'
import { SearchRequestFilter } from '@api/types/SearchRequest/SearchRequestFilter.ts'

import { FilterStore } from '@store/filter/types/filter.types.ts'

export const filterStore = create<FilterStore>(set => ({
	checkedItems: [], // main data array for api
	tempCheckedItems: [], // temporary array for visuals
	updateCheckedItems: () =>
		set((state: FilterStore) => ({
			checkedItems: state.tempCheckedItems
		})),
	updateTempCheckedItems: (id: string, optionId: string) =>
		set(state => {
			const hasItem = state.tempCheckedItems.some(item => item.id === id)
			if (!hasItem) {
				return {
					tempCheckedItems: [
						...state.tempCheckedItems,
						{ id: id, type: FilterType.OPTION, optionsIds: [optionId] }
					]
				}
			}

			return {
				tempCheckedItems: state.tempCheckedItems
					.map(item => {
						if (item.id === id) {
							const isOptionSelected = item.optionsIds.includes(optionId)
							const newOptionsIds = isOptionSelected
								? item.optionsIds.filter(optId => optId !== optionId)
								: [...item.optionsIds, optionId]
							return { ...item, optionsIds: newOptionsIds }
						}
						return item
					})
					.filter(item => item.optionsIds.length > 0)
			}
		}),
	resetTempCheckedItems: () => {
		set((state: FilterStore) => ({
			tempCheckedItems: state.checkedItems
		}))
	},
	clearTempCheckedItems: () => {
		set(() => ({
			tempCheckedItems: []
		}))
	},
	initFilter: async () => {
		const filter: SearchRequestFilter = [] // some api call
		set({
			checkedItems: filter,
			tempCheckedItems: filter
		})
	}
}))
