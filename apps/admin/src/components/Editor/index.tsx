import React, { useCallback, useMemo, useRef } from 'react';

import {
  CodeIcon,
  FontBoldIcon,
  FontItalicIcon,
  ListBulletIcon,
  QuoteIcon,
  TextAlignCenterIcon,
  TextAlignJustifyIcon,
  TextAlignLeftIcon,
  TextAlignRightIcon,
  UnderlineIcon,
} from '@radix-ui/react-icons';
import clsx from 'clsx';
import isHotkey from 'is-hotkey';
import {
  Editor,
  Transforms,
  createEditor,
  Descendant,
  Element as SlateElement,
} from 'slate';
import { withHistory } from 'slate-history';
import {
  Editable,
  withReact,
  useSlate,
  Slate,
  RenderElementProps,
  RenderLeafProps,
} from 'slate-react';

import { Button, Toolbar } from '~/components/Editor/components';
import {
  Align,
  ElementFormat,
  ElementType,
  TextFormat,
  VideoElement,
} from '~/components/Editor/custom-types';

const HOTKEYS: Record<string, TextFormat> = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
};

const LIST_TYPES = ['numbered-list', 'bulleted-list'];
const TEXT_ALIGN_TYPES = ['left', 'center', 'right', 'justify'];

const initialValue: Descendant[] = [
  {
    type: 'paragraph',
    children: [{ text: 'Dodaj opis kampanii' }],
  },
];

const OrderedListIcon = (props: React.HTMLAttributes<SVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    {...props}
  >
    <path fill="none" d="M0 0h24v24H0z" />
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M8 4h13v2H8V4zM5 3v3h1v1H3V6h1V4H3V3h2zM3 14v-2.5h2V11H3v-1h3v2.5H4v.5h2v1H3zm2 5.5H3v-1h2V18H3v-1h3v4H3v-1h2v-.5zM8 11h13v2H8v-2zm0 7h13v2H8v-2z"
    />
  </svg>
);

const isMarkActive = (editor: Editor, format: TextFormat) => {
  const marks = Editor.marks(editor);
  // @ts-ignore TODO: fix this
  return marks ? marks[format] === true : false;
};

const toggleMark = (editor: Editor, format: TextFormat) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

const MarkButton = ({
  format,
  icon,
}: {
  format: TextFormat;
  icon: JSX.Element;
}) => {
  const editor = useSlate();
  return (
    <Button
      active={isMarkActive(editor, format)}
      onMouseDown={(event: React.MouseEvent) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    >
      {icon}
    </Button>
  );
};

const Element = ({
  attributes,
  children,
  element,
}: {
  attributes: React.HTMLAttributes<HTMLElement>;
  children: React.ReactNode;
  element: any; // TODO: fix this, use ElementType
}) => {
  const style = { textAlign: element.align };
  switch (element.type) {
    case 'block-quote':
      return (
        <blockquote style={style} {...attributes}>
          {children}
        </blockquote>
      );
    case 'bulleted-list':
      return (
        <ul style={style} {...attributes}>
          {children}
        </ul>
      );
    case 'heading-one':
      return (
        <h1 style={style} {...attributes}>
          {children}
        </h1>
      );
    case 'heading-two':
      return (
        <h2 style={style} {...attributes}>
          {children}
        </h2>
      );
    case 'list-item':
      return (
        <li style={style} {...attributes}>
          {children}
        </li>
      );
    case 'numbered-list':
      return (
        <ol style={style} {...attributes}>
          {children}
        </ol>
      );
    default:
      return (
        <p style={style} {...attributes}>
          {children}
        </p>
      );
  }
};

const Leaf = ({
  attributes,
  children,
  leaf,
}: {
  attributes: React.HTMLAttributes<HTMLSpanElement>;
  children: React.ReactNode;
  leaf: any; // TODO: fix this, use Text type
}) => {
  let wrappedChildren = children;
  if (leaf.bold) {
    wrappedChildren = <strong>{children}</strong>;
  }

  if (leaf.code) {
    wrappedChildren = <code>{children}</code>;
  }

  if (leaf.italic) {
    wrappedChildren = <em>{children}</em>;
  }

  if (leaf.underline) {
    wrappedChildren = <u>{children}</u>;
  }

  return <span {...attributes}>{wrappedChildren}</span>;
};

const isBlockActive = (
  editor: Editor,
  format: ElementFormat,
  blockType: 'type' | 'align' = 'type'
) => {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        // @ts-ignore TODO: fix this
        n[blockType] === format,
    })
  );

  return !!match;
};

const toggleBlock = (editor: Editor, format: ElementFormat | Align) => {
  const isActive = isBlockActive(
    editor,
    format,
    TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type'
  );
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      LIST_TYPES.includes(n.type) &&
      !TEXT_ALIGN_TYPES.includes(format),
    split: true,
  });
  let newProperties: Partial<SlateElement>;
  if (TEXT_ALIGN_TYPES.includes(format)) {
    newProperties = {
      align: isActive ? undefined : (format as Align),
    };
  } else {
    let type;
    if (isActive) {
      type = 'paragraph';
    } else if (isList) {
      type = 'list-item';
    } else {
      type = format as ElementType;
    }

    newProperties = {
      type: type as ElementType,
    };
  }
  Transforms.setNodes<SlateElement>(editor, newProperties);

  if (!isActive && isList) {
    let block: SlateElement;
    if (format === 'video') {
      block = { type: format as VideoElement['type'], children: [], url: '' };
    } else {
      // @ts-ignore TODO: fix this
      block = { type: format as ElementType, children: [] };
    }
    Transforms.wrapNodes(editor, block);
  }
};

const BlockButton = ({
  format,
  icon,
}: {
  format: ElementFormat | Align;
  icon: JSX.Element;
}) => {
  const editor = useSlate();
  return (
    <Button
      active={isBlockActive(
        editor,
        format,
        TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type'
      )}
      onMouseDown={(event: React.MouseEvent) => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
    >
      {icon}
    </Button>
  );
};

const RichTextExample = ({ id }: { id: string }) => {
  const editorRef = useRef<Editor>();

  const renderElement = useCallback(
    (props: RenderElementProps) => <Element {...props} />,
    []
  );
  const renderLeaf = useCallback(
    (props: RenderLeafProps) => <Leaf {...props} />,
    []
  );

  const editor = useMemo(() => {
    if (!editorRef.current) {
      editorRef.current = withHistory(withReact(createEditor()));
    }

    return editorRef.current;
  }, []);

  return (
    <Slate
      editor={editor}
      value={initialValue}
      onChange={(value) => {
        const isAstChange = editor.operations.some(
          (op) => op.type !== 'set_selection'
        );
        if (isAstChange) {
          const content = JSON.stringify(value);
          console.log(content);
        }
      }}
    >
      <div
        className={clsx(
          'prose',
          'focus-within:border-primary-500 overflow-hidden rounded-lg border border-solid border-stone-300 bg-stone-100 focus-within:shadow-[0_0_0_1px_#F43F5E]',
          { 'outline outline-rose-500': false }
        )}
      >
        <Toolbar className="bg-stone-200">
          <MarkButton
            format="bold"
            icon={<FontBoldIcon className="h-6 w-6" />}
          />
          <MarkButton
            format="italic"
            icon={<FontItalicIcon className="h-6 w-6" />}
          />
          <MarkButton
            format="underline"
            icon={<UnderlineIcon className="h-6 w-6" />}
          />
          <MarkButton format="code" icon={<CodeIcon className="h-6 w-6" />} />

          <div className="divider divider-horizontal mx-0" />

          <BlockButton
            format="heading-one"
            icon={<span className="leading-none">H1</span>}
          />
          <BlockButton
            format="heading-two"
            icon={<span className="leading-none">H2</span>}
          />
          <BlockButton
            format="block-quote"
            icon={<QuoteIcon className="h-6 w-6" />}
          />
          <BlockButton
            format="numbered-list"
            icon={<OrderedListIcon className="h-6 w-6" />}
          />
          <BlockButton
            format="bulleted-list"
            icon={<ListBulletIcon className="h-6 w-6" />}
          />

          <div className="divider divider-horizontal mx-0" />

          <BlockButton
            format="left"
            icon={<TextAlignLeftIcon className="h-6 w-6" />}
          />
          <BlockButton
            format="center"
            icon={<TextAlignCenterIcon className="h-6 w-6" />}
          />
          <BlockButton
            format="right"
            icon={<TextAlignRightIcon className="h-6 w-6" />}
          />
          <BlockButton
            format="justify"
            icon={<TextAlignJustifyIcon className="h-6 w-6" />}
          />
        </Toolbar>
        <Editable
          id={id}
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          placeholder="Dodaj opis kampanii"
          spellCheck
          className="prose mx-4 mb-5 px-4 md:mx-auto"
          onKeyDown={(event) => {
            Object.keys(HOTKEYS).forEach((hotkey) => {
              console.log(hotkey);
              if (isHotkey(hotkey, event as any)) {
                event.preventDefault();
                const mark: TextFormat = HOTKEYS[hotkey as TextFormat];
                toggleMark(editor, mark);
              }
            });
          }}
        />
      </div>
    </Slate>
  );
};

export default RichTextExample;
