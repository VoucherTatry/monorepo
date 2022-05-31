import { Dialog } from '@headlessui/react';
import clsx from 'clsx';

import DialogBase from './DialogBase';

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
  let confirmBtnClass;
  switch (variant) {
    case 'danger':
      confirmBtnClass = 'btn-error';
      break;
    case 'warning':
      confirmBtnClass = 'btn-warning';
      break;
    case 'info':
    default:
      confirmBtnClass = 'btn-info';
      break;
  }

  return (
    <DialogBase isOpen={isOpen} onClose={onCancel}>
      <Dialog.Title
        as="h3"
        className="text-base-content text-lg font-medium leading-6"
      >
        {text.title}
      </Dialog.Title>
      <Dialog.Description>{text.description}</Dialog.Description>
      <div className="mt-4 flex w-full justify-end space-x-4">
        <button
          type="button"
          className="btn btn-outline btn-md"
          onClick={onCancel}
        >
          {text.cancel}
        </button>
        <button
          type="button"
          className={clsx('btn btn-md', confirmBtnClass)}
          onClick={onConfirm}
        >
          {text.confirm}
        </button>
      </div>
    </DialogBase>
  );
}
