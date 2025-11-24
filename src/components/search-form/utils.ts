export const getFilteredSuggestions = (
    query: string,
    options: string[]
  ): string[] => {
    const normalizedQuery = query.trim().toLowerCase()
    if (!normalizedQuery) return []
    return options.filter((option) =>
      option.toLowerCase().includes(normalizedQuery)
    )
}
  
export const getShouldShowPopover = (
    isOpen: boolean,
    query: string,
    hasSuggestions: boolean
  ): boolean => {
    return Boolean(isOpen && query.trim() && hasSuggestions)
}