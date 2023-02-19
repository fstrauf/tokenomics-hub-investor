// import { ErrorMessage, Field, Form, Formik } from 'formik'
// // import dynamic from 'next/dynamic'
// import toast, { Toaster } from 'react-hot-toast'
// import FormText from '../form/FormText'
import BreakdownBox from '../slugView/breakdown-box'
// import Tiptap from '../TipTap'
import ResourceSection from './ResourceSection'

export default function TDF102({ props }) {
  const designPhase = props.designPhases.find((adp) => String(adp.phaseId) === '102')
  return (
    <div className="grid w-full grid-cols-2 gap-2 rounded-lg border-2 p-2">
      <div className="col-span-2">
        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 ">
          1. Business Assessment - Value Prop and Creation
        </h5>
        <div className="bg-slate-100 text-xs">
          <p>In 1-2 sentences describe the problem and your solution. </p>
          <p>Ask yourself:</p>
          <p>📜 What is the problem your project is solving?</p>
          <p>📜 How does your project solve the problem?</p>
        </div>
      </div>
      <ResourceSection content={designPhase.Resources}/>
      <div>
        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 ">
          References
        </h5>
        {props.posts.map((post) => (
          <div>
            <div key={post.id}>{post.title}</div>
            <BreakdownBox
              value={post?.businessModel}
              strength={post?.businessModelStrength}
              title="Business Model:"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
