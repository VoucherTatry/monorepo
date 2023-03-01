import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { Form } from "@remix-run/react";
import { Button, PromptModal } from "ui";

import type { PromptModalProps } from "ui";

export const DeleteConfirmModal = ({
  isOpen,
  onDismiss,
  campaignId,
}: PromptModalProps & { campaignId: string }) => (
  <PromptModal
    isOpen={isOpen}
    onDismiss={onDismiss}
  >
    <PromptModal.Body>
      <PromptModal.Icon
        type="warning"
        icon={<ExclamationTriangleIcon className="w-6 h-6 text-red-500" />}
      />
      <PromptModal.Caption>
        <PromptModal.Title text="Uwaga!" />
        <PromptModal.Description text="Usunięcie kampanii jest nieodwracalne." />
      </PromptModal.Caption>
    </PromptModal.Body>

    <Form
      action="/campaigns/delete"
      method="delete"
    >
      <input
        type="hidden"
        name="campaignId"
        value={campaignId}
      />
      <PromptModal.ButtonArea>
        <Button
          type="button"
          onClick={onDismiss}
        >
          Anuluj
        </Button>
        <Button type="submit">Usuń!</Button>
      </PromptModal.ButtonArea>
    </Form>
  </PromptModal>
);
