import { Descendant, BaseEditor } from 'slate';
import { HistoryEditor } from 'slate-history';
import { ReactEditor } from 'slate-react';

export type Align = 'left' | 'center' | 'right' | 'justify';

export type BlockQuoteElement = {
  type: 'block-quote';
  align?: Align;
  children: Descendant[];
};

export type BulletedListElement = {
  type: 'bulleted-list';
  align?: Align;
  children: Descendant[];
};
export type NumberedListElement = {
  type: 'numbered-list';
  align?: Align;
  children: Descendant[];
};

export type CheckListItemElement = {
  type: 'check-list-item';
  checked: boolean;
  children: Descendant[];
};

export type EditableVoidElement = {
  type: 'editable-void';
  children: EmptyText[];
};

export type HeadingOneElement = {
  type: 'heading-one';
  align?: Align;
  children: Descendant[];
};

export type HeadingTwoElement = {
  type: 'heading-two';
  align?: Align;
  children: Descendant[];
};

export type ImageElement = {
  type: 'image';
  url: string;
  children: EmptyText[];
};

export type LinkElement = { type: 'link'; url: string; children: Descendant[] };

export type ButtonElement = { type: 'button'; children: Descendant[] };

export type ListItemElement = { type: 'list-item'; children: Descendant[] };

export type MentionElement = {
  type: 'mention';
  character: string;
  children: CustomText[];
};

export type ParagraphElement = {
  type: 'paragraph';
  align?: Align;
  children: Descendant[];
};

export type TableElement = { type: 'table'; children: TableRow[] };

export type TableCellElement = { type: 'table-cell'; children: CustomText[] };

export type TableRowElement = { type: 'table-row'; children: TableCell[] };

export type TitleElement = { type: 'title'; children: Descendant[] };

export type VideoElement = {
  type: 'video';
  url: string;
  children: EmptyText[];
};

export type AlignableElement =
  | BlockQuoteElement
  | BulletedListElement
  | NumberedListElement
  | HeadingOneElement
  | HeadingTwoElement
  | ParagraphElement;

type CustomElement =
  | AlignableElement
  | CheckListItemElement
  | EditableVoidElement
  | ImageElement
  | LinkElement
  | ButtonElement
  | ListItemElement
  | MentionElement
  | TableElement
  | TableRowElement
  | TableCellElement
  | TitleElement
  | VideoElement;

export type ElementType = CustomElement['type'];

export type FormattedText = {
  bold?: boolean;
  italic?: boolean;
  code?: boolean;
  underline?: boolean;
  text: string;
};

export type EmptyText = {
  text: string;
};

export type CustomText = FormattedText | EmptyText;

export type CustomEditor = BaseEditor & ReactEditor & HistoryEditor;

export type TextFormat = keyof Omit<FormattedText, 'text'>;

export type ElementFormat = ElementType | Align;

declare module 'slate' {
  interface CustomTypes {
    Editor: CustomEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}
