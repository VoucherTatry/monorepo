import { useRef } from 'react';

import {
  AlertDialog as ChakraAlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  ThemingProps,
} from '@chakra-ui/react';
import { Button } from 'ui';

type AlertDialogProps = {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  variant?: 'danger' | 'warning' | 'info';
  text: {
    title: string;
    description: string;
    cancel: string;
    confirm: string;
  };
};

export default function AlertDialog({
  isOpen,
  onCancel,
  onConfirm,
  variant = 'info',
  text,
}: AlertDialogProps) {
  const cancelRef = useRef(null);

  let confirmBtnScheme: ThemingProps<'Button'>['colorScheme'];
  switch (variant) {
    case 'danger':
      confirmBtnScheme = 'red';
      break;
    case 'warning':
      confirmBtnScheme = 'orange';
      break;
    case 'info':
    default:
      confirmBtnScheme = 'blue';
      break;
  }

  return (
    <ChakraAlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onCancel}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg">{text.title}</AlertDialogHeader>
          <AlertDialogBody>{text.description}</AlertDialogBody>
          <AlertDialogFooter experimental_spaceX={4}>
            <Button
              variant="outline"
              colorScheme="gray"
              size="md"
              type="button"
              onClick={onCancel}
            >
              {text.cancel}
            </Button>
            <Button
              type="button"
              size="md"
              colorScheme={confirmBtnScheme}
              onClick={onConfirm}
            >
              {text.confirm}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </ChakraAlertDialog>
  );
}
