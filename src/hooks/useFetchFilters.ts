import { useQuery } from '@tanstack/react-query'

import { FilterItem, FilterType } from '@api/types/Filter'

interface Data {
	filterItems: FilterItem[]
}

const fetchFilters = async (): Promise<Data> => {
	const response = await import('../temp/filterData.json')
	const data = response.default

	const filterItems = data.filterItems.map(item => ({
		...item,
		type: item.type as FilterType
	}))

	return { filterItems }
}

const useFetchFilters = () => {
	return useQuery({
		queryKey: ['filters'],
		queryFn: fetchFilters
	})
}

export default useFetchFilters
