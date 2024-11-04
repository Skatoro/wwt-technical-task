import { useQuery } from '@tanstack/react-query'

import { FilterItem } from '@api/types/Filter'

interface Data {
	filterItems: FilterItem[]
}
const fetchFilters = async (): Promise<Data> => {
	const response = await fetch('/src/temp/filterData.json')
	if (!response.ok) {
		throw new Error('Network response was not ok')
	}
	return response.json()
}

const useFetchFilters = () => {
	return useQuery({
		queryKey: ['filters'],
		queryFn: fetchFilters
	})
}

export default useFetchFilters
