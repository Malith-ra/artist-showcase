'use client'

import { Input, InputElement, InputGroup } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'

export default function SearchBar({
  value,
  onChange,
}: Readonly<{
  value: string
  onChange: (v: string) => void
}>) {
  return (
    <div>
      <InputGroup>
        <InputElement placement="start">
          <SearchIcon color="gray.400" />
        </InputElement>
      </InputGroup>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search artist..."
        size="lg"
        bg="white"
      />
    </div>
  )
}
