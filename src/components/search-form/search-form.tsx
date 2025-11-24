"use client"

import type { ChangeEvent, KeyboardEvent } from "react"
import { useMemo, useState } from "react"

import { Button } from "../ui/button"
import { Input } from "../ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover"
import { SearchFormProps } from "@/types/rickAndMorty"
import { useDebounce } from "./hooks"
import { getFilteredSuggestions, getShouldShowPopover } from "./utils"

export default function SearchForm({ suggestionOptions = [] }: SearchFormProps) {
  const [query, setQuery] = useState("")
  const [isOpen, setIsOpen] = useState(false)

  const debouncedQuery = useDebounce(query, 300)
  const trimmedQuery = debouncedQuery.trim()

  const filteredSuggestions = useMemo(
    () => getFilteredSuggestions(trimmedQuery, suggestionOptions),
    [trimmedQuery, suggestionOptions]
  )

  const shouldShowPopover = getShouldShowPopover(
    isOpen,
    trimmedQuery,
    filteredSuggestions.length > 0
  )

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    const nextValue = value.trim()
    setQuery(value)
    setIsOpen(nextValue.length > 0)
  }

  const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Escape") return
    setIsOpen(false)
  }

  const handleSelectSuggestion = (value: string) => {
    setQuery(value)
    setIsOpen(false)
  }

  const handleKeyDownSuggestion = (
    event: KeyboardEvent<HTMLButtonElement>,
    value: string
  ) => {
    if (event.key !== "Enter" && event.key !== " ") return
    event.preventDefault()
    handleSelectSuggestion(value)
  }

  return (
    <div className="mt-10 flex items-center justify-center gap-2">
      <Popover open={!!shouldShowPopover} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Input
            type="text"
            placeholder="Search"
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            aria-expanded={!!shouldShowPopover}
            aria-controls="search-suggestions"
            aria-autocomplete="list"
            role="combobox"
            className="w-1/2 border-lime-300/40 transition-colors duration-300 focus:border-lime-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-300/80"
          />
        </PopoverTrigger>
        <PopoverContent
          align="start"
          className="border-lime-300/40 bg-neutral-950 text-sm text-neutral-50"
          style={{ width: "var(--radix-popover-trigger-width)" }}
          onOpenAutoFocus={(event) => event.preventDefault()}
        >
          <div
            id="search-suggestions"
            role="listbox"
            className="flex flex-col gap-1 w-full"
          >
            {filteredSuggestions.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                role="option"
                tabIndex={0}
                aria-selected={false}
                onClick={() => handleSelectSuggestion(suggestion)}
                onKeyDown={(event) =>
                  handleKeyDownSuggestion(event, suggestion)
                }
                className="text-left text-sm text-neutral-100 transition-colors duration-200 hover:text-lime-200 focus:text-lime-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-300/60"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
      <Button
        type="submit"
        className="cursor-pointer bg-lime-300 text-neutral-950 transition-colors duration-300 hover:bg-lime-400"
      >
        Search
      </Button>
    </div>
  )
}