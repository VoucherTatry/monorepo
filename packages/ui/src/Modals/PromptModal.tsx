import React from 'react';

import { Dialog, Transition } from '@headlessui/react';
import clsx from 'clsx';

export interface PromptModalProps extends React.PropsWithChildren {
  isOpen: boolean;
  onDismiss: () => void;
}

export function PromptModal({ children, isOpen, onDismiss }: PromptModalProps) {
  return (
    <Transition appear show={isOpen} as={React.Fragment}>
      <Dialog
        onClose={onDismiss}
        as="div"
        className="relative z-50"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <Transition.Child
          as={React.Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            onClick={onDismiss}
            className="fixed inset-0 bg-black bg-opacity-75 transition-opacity"
          ></div>
        </Transition.Child>
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                {children}
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

interface BodyProps extends React.PropsWithChildren {
  icon?: React.ReactNode;
}

function PromptModalBody({ icon, children }: BodyProps) {
  return (
    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
      <div className="sm:flex sm:items-start">{children}</div>
    </div>
  );
}
PromptModal.Body = PromptModalBody;

type PromptModalIconProps = { icon: React.ReactNode; type?: 'warning' };
function PromptModalIcon({ icon, type }: PromptModalIconProps) {
  let bgColor: string;
  switch (type) {
    case 'warning':
      bgColor = 'bg-red-100';
    default:
      bgColor = 'bg-stone-100';
  }

  return (
    <div
      className={clsx(
        'mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full sm:mx-0 sm:h-10 sm:w-10',
        bgColor
      )}
    >
      {icon}
    </div>
  );
}
PromptModal.Icon = PromptModalIcon;

function PromptModalCaption({ children }: React.PropsWithChildren) {
  return (
    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
      {children}
    </div>
  );
}
PromptModal.Caption = PromptModalCaption;

function PromptModalTitle({ text }: { text: string }) {
  return (
    <h3
      className="text-lg font-medium leading-6 text-stone-900"
      id="modal-title"
    >
      {text}
    </h3>
  );
}
PromptModal.Title = PromptModalTitle;

function PromptModalDescription({ text }: { text: string }) {
  return (
    <div className="mt-2">
      <p className="text-sm text-stone-500">{text}</p>
    </div>
  );
}
PromptModal.Description = PromptModalDescription;

function PromptModalButtonArea({ children }: React.PropsWithChildren) {
  return (
    <div className="bg-stone-100 px-4 py-3 flex justify-center sm:justify-end sm:px-6 space-x-4">
      {children}
    </div>
  );
}
PromptModal.ButtonArea = PromptModalButtonArea;
