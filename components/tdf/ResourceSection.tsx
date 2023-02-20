import Tiptap from '../TipTap'

export default function ResourceSection({ content }) {
  return (
    <div>
      {/* <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
        Resources
      </h5> */}
        <Tiptap content={content} editMode={false} />
    </div>
  )
}
