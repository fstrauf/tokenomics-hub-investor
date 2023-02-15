import { useEditor, EditorContent } from '@tiptap/react'
// import StarterKit from '@tiptap/starter-kit'
import Blockquote from '@tiptap/extension-blockquote'
import Bulletlist from '@tiptap/extension-bullet-list'
import Codeblock from '@tiptap/extension-code-block'
import Document from '@tiptap/extension-document'
import Heading from '@tiptap/extension-heading'
import Listitem from '@tiptap/extension-list-item'
import Orderedlist from '@tiptap/extension-ordered-list'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Bold from '@tiptap/extension-bold'
import Code from '@tiptap/extension-code'
import Italic from '@tiptap/extension-italic'
import Strike from '@tiptap/extension-strike'
import Dropcursor from '@tiptap/extension-dropcursor'
import Gapcursor from '@tiptap/extension-gapcursor'
import Image from '@tiptap/extension-image'
import React from 'react'
import { uploadPhoto } from '../lib/fileUpload'

type Props = {
    content?: any;
    contentId?: String;
    setContent?: Function;
    editMode?: boolean;
}

const Tiptap: React.FC<Props> = (props) => {
    var content = props?.content ?? ''
    // console.log('tiptap')
    // console.log(typeof content)
    // console.log(content)
    // var editorContent = ''
    if (typeof content === 'string') {
        try {
            content = JSON.parse(content)
        } catch {

        }
    }

    const editor = useEditor({
        extensions: [
            Blockquote,
            Bulletlist,
            Codeblock,
            Document,
            Heading,
            Listitem,
            Orderedlist,
            Paragraph,
            Text,
            Bold,
            Code,
            Italic,
            Strike,
            Dropcursor,
            Gapcursor,
            // StarterKit,
            // Image,
            Image,

        ],
        // autofocus: 'all',
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose lg:prose-md xl:prose-lg m-5 focus:outline-none min-h-[120px] max-h-[250px] overflow-y-auto',
            },
        },
        editable: props.editMode,
        content: content,
        onUpdate({ editor }) {
            // console.log(editor.getJSON())  
            props?.setContent(editor.getJSON())
        },
    })

    const addImage = async (e) => {
        const url = await uploadPhoto(e)

        if (url) {
            editor.chain().focus().setImage({ src: url }).run()
        }
    }

    return (
        <div>
            {props?.editMode && (
                <>
                    <MenuBar editor={editor} />
                    <input
                        onChange={addImage}
                        type="file"
                        accept="image/png, image/jpeg"
                        className='text-sm ml-1 border-2 rounded-lg'
                    />
                </>
            )}
            <div className='bg-slate-50 rounded-lg h-full'>
                <EditorContent className='' editor={editor} />
            </div>
        </div>
    )
}

export default Tiptap;

const MenuBar = ({ editor }) => {
    if (!editor) {
        return null
    }

    return (
        <>
            <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                type='button'
                disabled={
                    !editor.can()
                        .chain()
                        .focus()
                        .toggleBold()
                        .run()
                }
                //   className={editor.isActive('bold') ? 'is-active' : ''}
                className='text-sm ml-1 border-2 rounded-lg'
            >
                bold
            </button>
            <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                type='button'
                disabled={
                    !editor.can()
                        .chain()
                        .focus()
                        .toggleItalic()
                        .run()
                }
                //   className={editor.isActive('italic') ? 'is-active' : ''}
                className='text-sm ml-1 border-2 rounded-lg'
            >
                italic
            </button>
            <button
                onClick={() => editor.chain().focus().toggleStrike().run()}
                type='button'
                disabled={
                    !editor.can()
                        .chain()
                        .focus()
                        .toggleStrike()
                        .run()
                }
                //   className={editor.isActive('strike') ? 'is-active' : ''}
                className='text-sm ml-1 border-2 rounded-lg'
            >
                strike
            </button>
            <button
                onClick={() => editor.chain().focus().toggleCode().run()}
                type='button'
                disabled={
                    !editor.can()
                        .chain()
                        .focus()
                        .toggleCode()
                        .run()
                }
                //   className={editor.isActive('code') ? 'is-active' : ''}
                className='text-sm ml-1 border-2 rounded-lg'
            >
                code
            </button>
            <button type='button' onClick={() => editor.chain().focus().unsetAllMarks().run()}
                className='text-sm ml-1 border-2 rounded-lg'>
                clear marks
            </button>
            <button type='button' onClick={() => editor.chain().focus().clearNodes().run()}
                className='text-sm ml-1 border-2 rounded-lg'>
                clear nodes
            </button>
            <button
                type='button'
                onClick={() => editor.chain().focus().setParagraph().run()}
                //   className={editor.isActive('paragraph') ? 'is-active' : ''}
                className='text-sm ml-1 border-2 rounded-lg'
            >
                paragraph
            </button>
            <button
                type='button'
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                //   className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
                className='text-sm ml-1 border-2 rounded-lg'
            >
                h1
            </button>
            <button
                type='button'
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                //   className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
                className='text-sm ml-1 border-2 rounded-lg'
            >
                h2
            </button>
            <button
                type='button'
                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                //   className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
                className='text-sm ml-1 border-2 rounded-lg'
            >
                h3
            </button>
            <button
                type='button'
                onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
                //   className={editor.isActive('heading', { level: 4 }) ? 'is-active' : ''}
                className='text-sm ml-1 border-2 rounded-lg'
            >
                h4
            </button>
            <button
                type='button'
                onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
                //   className={editor.isActive('heading', { level: 5 }) ? 'is-active' : ''}
                className='text-sm ml-1 border-2 rounded-lg'
            >
                h5
            </button>
            <button
                type='button'
                onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
                //   className={editor.isActive('heading', { level: 6 }) ? 'is-active' : ''}
                className='text-sm ml-1 border-2 rounded-lg'
            >
                h6
            </button>
            <button
                type='button'
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                //   className={editor.isActive('bulletList') ? 'is-active' : ''}
                className='text-sm ml-1 border-2 rounded-lg'
            >
                bullet list
            </button>
            <button
                type='button'
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                //   className={editor.isActive('orderedList') ? 'is-active' : ''}
                className='text-sm ml-1 border-2 rounded-lg'
            >
                ordered list
            </button>
            <button
                type='button'
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                //   className={editor.isActive('codeBlock') ? 'is-active' : ''}
                className='text-sm ml-1 border-2 rounded-lg'
            >
                code block
            </button>
            <button
                type='button'
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                //   className={editor.isActive('blockquote') ? 'is-active' : ''}
                className='text-sm ml-1 border-2 rounded-lg'
            >
                blockquote
            </button>
            <button type='button' onClick={() => editor.chain().focus().setHorizontalRule().run()}
                className='text-sm ml-1 border-2 rounded-lg'>
                horizontal rule
            </button>
            <button type='button' onClick={() => editor.chain().focus().setHardBreak().run()}
                className='text-sm ml-1 border-2 rounded-lg'>
                hard break
            </button>
            {/* <button
                type='button'
                onClick={() => editor.chain().focus().undo().run()}
                disabled={
                    !editor.can()
                        .chain()
                        .focus()
                        .undo()
                        .run()
                }
                className='text-sm ml-1 border-2 rounded-lg'
            >
                undo
            </button>
            <button
                type='button'
                onClick={() => editor.chain().focus().redo().run()}
                disabled={
                    !editor.can()
                        .chain()
                        .focus()
                        .redo()
                        .run()
                }
                className='text-sm ml-1 border-2 rounded-lg'
            >
                redo
            </button> */}
        </>
    )
}