"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Underline from "@tiptap/extension-underline"
import Link from "@tiptap/extension-link"
import Image from "@tiptap/extension-image"
import Placeholder from "@tiptap/extension-placeholder"
import {
  Bold, Italic, UnderlineIcon, Strikethrough,
  List, ListOrdered, Quote, Code,
  Heading1, Heading2, Heading3, Undo, Redo, Minus,
} from "lucide-react"

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({ openOnClick: false }),
      Image,
      Placeholder.configure({ placeholder: placeholder ?? "Start writing..." }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  if (!editor) return null

  const ToolbarBtn = ({ onClick, active, title, children }: {
    onClick: () => void; active?: boolean; title: string; children: React.ReactNode
  }) => (
    <button
      type="button"
      onClick={onClick}
      title={title}
      style={{
        padding: "4px 6px",
        borderRadius: 4,
        border: "none",
        cursor: "pointer",
        background: active ? "var(--accent)" : "transparent",
        color: active ? "#fff" : "var(--fg)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minWidth: 28,
        height: 28,
        transition: "background 0.15s",
      }}
    >
      {children}
    </button>
  )

  return (
    <div style={{ border: "1px solid var(--line)", borderRadius: 8, overflow: "hidden" }}>
      {/* Toolbar */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          padding: "6px 8px",
          borderBottom: "1px solid var(--line)",
          background: "var(--bg-1)",
          alignItems: "center",
        }}
      >
        <ToolbarBtn onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive("bold")} title="Bold">
          <Bold size={14} />
        </ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive("italic")} title="Italic">
          <Italic size={14} />
        </ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive("underline")} title="Underline">
          <UnderlineIcon size={14} />
        </ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive("strike")} title="Strikethrough">
          <Strikethrough size={14} />
        </ToolbarBtn>

        <div style={{ width: 1, height: 20, background: "var(--line)", margin: "0 4px" }} />

        <ToolbarBtn onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} active={editor.isActive("heading", { level: 1 })} title="Heading 1">
          <Heading1 size={14} />
        </ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive("heading", { level: 2 })} title="Heading 2">
          <Heading2 size={14} />
        </ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive("heading", { level: 3 })} title="Heading 3">
          <Heading3 size={14} />
        </ToolbarBtn>

        <div style={{ width: 1, height: 20, background: "var(--line)", margin: "0 4px" }} />

        <ToolbarBtn onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive("bulletList")} title="Bullet List">
          <List size={14} />
        </ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive("orderedList")} title="Ordered List">
          <ListOrdered size={14} />
        </ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive("blockquote")} title="Blockquote">
          <Quote size={14} />
        </ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().toggleCodeBlock().run()} active={editor.isActive("codeBlock")} title="Code Block">
          <Code size={14} />
        </ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().setHorizontalRule().run()} title="Horizontal Rule">
          <Minus size={14} />
        </ToolbarBtn>

        <div style={{ width: 1, height: 20, background: "var(--line)", margin: "0 4px" }} />

        <ToolbarBtn onClick={() => editor.chain().focus().undo().run()} title="Undo">
          <Undo size={14} />
        </ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().redo().run()} title="Redo">
          <Redo size={14} />
        </ToolbarBtn>
      </div>

      {/* Editor */}
      <EditorContent
        editor={editor}
        style={{ padding: "12px 16px", minHeight: 300, color: "var(--fg)", fontSize: 14 }}
        className="prose-editor"
      />

      <style>{`
        .prose-editor .ProseMirror {
          outline: none;
          min-height: 280px;
        }
        .prose-editor .ProseMirror p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: #666;
          pointer-events: none;
          height: 0;
        }
        .prose-editor .ProseMirror h1 { font-size: 1.75em; font-weight: 700; margin: 0.75em 0 0.5em; }
        .prose-editor .ProseMirror h2 { font-size: 1.4em; font-weight: 600; margin: 0.75em 0 0.5em; }
        .prose-editor .ProseMirror h3 { font-size: 1.15em; font-weight: 600; margin: 0.75em 0 0.5em; }
        .prose-editor .ProseMirror ul, .prose-editor .ProseMirror ol { padding-left: 1.5em; margin: 0.5em 0; }
        .prose-editor .ProseMirror li { margin: 0.25em 0; }
        .prose-editor .ProseMirror blockquote { border-left: 3px solid var(--accent); padding-left: 1em; margin: 0.5em 0; color: #999; }
        .prose-editor .ProseMirror code { background: var(--bg-2, #1a1a1a); padding: 2px 6px; border-radius: 4px; font-size: 0.875em; }
        .prose-editor .ProseMirror pre { background: var(--bg-2, #1a1a1a); padding: 12px; border-radius: 6px; overflow-x: auto; margin: 0.75em 0; }
        .prose-editor .ProseMirror pre code { background: none; padding: 0; }
        .prose-editor .ProseMirror hr { border: none; border-top: 1px solid var(--line, #2a2a2a); margin: 1em 0; }
      `}</style>
    </div>
  )
}
