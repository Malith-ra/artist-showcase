'use client'

import { Field, Input } from '@chakra-ui/react'

export default function SearchBar({
  value,
  onChange,
}: Readonly<{
  value: string
  onChange: (v: string) => void
}>) {
  return (
    <Field.Root>
      <Field.Label>Artist Name</Field.Label>

      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search artist..."
        bg="white"
        size="lg"
      />
    </Field.Root>
  )
}
