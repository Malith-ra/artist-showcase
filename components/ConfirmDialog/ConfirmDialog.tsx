'use client'

import {
  DialogRoot,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogBody,
  DialogTitle,
  DialogBackdrop,
  DialogActionTrigger,
  Button,
} from '@chakra-ui/react'

interface ConfirmDialogProps {
  open: boolean
  title: string
  description: string
  confirmLabel?: string
  cancelLabel?: string
  isLoading?: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
}

export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onOpenChange,
  onConfirm,
}: Readonly<ConfirmDialogProps>) {
  return (
    <DialogRoot
      open={open}
      onOpenChange={(e) => onOpenChange(e.open)}
      placement="center"
      key="center"
      motionPreset="scale"
    >
      <DialogBackdrop />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <DialogBody>{description}</DialogBody>

        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline">{cancelLabel}</Button>
          </DialogActionTrigger>

          <Button colorScheme="red" onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  )
}
