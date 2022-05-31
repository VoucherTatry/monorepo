import { XCircleIcon } from '@heroicons/react/solid';
import { Root, Description } from '@radix-ui/react-toast';
import { keyframes, styled } from '@stitches/react';

const slideRight = keyframes({
  from: { transform: 'translateX(var(--radix-toast-swipe-end-x))' },
  to: { transform: 'translateX(100%)' },
});

const Toast = styled(Root, {
  '@media (prefers-reduced-motion: no-preference)': {
    '&[data-swipe="move"]': {
      transform: 'translateX(var(--radix-toast-swipe-move-x))',
    },
    '&[data-swipe="cancel"]': {
      transform: 'translateX(0)',
      transition: 'transform 200ms ease-out',
    },
    '&[data-swipe="end"]': {
      animation: `${slideRight} 100ms ease-out forwards`,
    },
  },
});

export default function ErrorAlert({
  children,
  show,
  onOpenChange,
}: React.PropsWithChildren<{
  show: boolean;
  onOpenChange: (open: boolean) => void;
}>) {
  return (
    <Toast type="foreground" open={show} onOpenChange={onOpenChange}>
      <div className="alert alert-error mx-auto mb-6 w-5/6 max-w-lg shadow-lg">
        <div className="flex flex-row">
          <XCircleIcon className="h-6 w-6 flex-shrink-0" />
          <Description>{children}</Description>
        </div>
      </div>
    </Toast>
  );
}
