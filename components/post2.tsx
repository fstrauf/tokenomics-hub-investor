import React, { Suspense, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
// import debounce from 'lodash.debounce'
// import { useFormik, useField, Field } from 'formik';
import { Field, Form, Formik, FieldArray } from "formik";
// import * as Yup from 'yup'
// import { PostCreateSchema } from '../prisma/generated/schemas'
// import Select from "react-select";
import FormSelect from './form/FormSelect';
import FormText from './form/FormText';
// import FormTipTap from './form/FormTipTap';
import FormStrength from './form/FormStrength';
import FormImageSelect from './form/FormImageSelect';
// import FormId from './form/FormId';
import FormDivider from './form/FormDivider';
import FormAutoSave from './form/FormAutoSave';
// import FormResources from './form/FormResources';
import dynamic from 'next/dynamic'

export default function Post2({ content, categories, tags }) {

    // const DynamicComponent1 = dynamic(() => import('../components/hello1'))

    const FormTipTap = dynamic(() => import('./form/FormTipTap'), { loading: () => <p>Loading</p> })
    const FormResources = dynamic(() => import('./form/FormResources'), { loading: () => <p>Loading</p> })
    const FormInvestmentTake = dynamic(() => import('./form/FormInvestmentTake'), { loading: () => <p>Loading</p> })
    const FormAnalysis = dynamic(() => import('./form/FormAnalysis'), { loading: () => <p>Loading</p> })
    const FormTokenStrength = dynamic(() => import('./form/FormTokenStrength'), { loading: () => <p>Loading</p> })
    const FormTimeLine = dynamic(() => import('./form/FormTimeLine'), { loading: () => <p>Loading</p> })

    const [postId, setPostId] = useState(content.id)

    const submitData = async (values, { setSubmitting }) => {
        const body = { values };

        if (values?.id === '') {
            try {
                const response = await fetch('/api/post/newProtocol', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(body),
                });

                if (!response.ok) {
                    const error = await response.text()
                    toast.error(JSON.parse(error).error, { position: 'bottom-right', });
                    throw new Error(error);
                } else {
                    //connect the returned id to the inputfields.id
                    const id = await response.text()
                    // console.log(response)
                    toast.success('Changes auto-saved ' + JSON.parse(id).id, { position: 'bottom-right', });
                    setPostId(JSON.parse(id).id)
                }

                setSubmitting(false);
                console.log('protocol created');
            } catch (error) {
                console.error(error);
            }
        } else {
            try {
                const response = await fetch('/api/post/updateProtocol', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(body),
                });

                if (!response.ok) {
                    const error = await response.text()
                    toast.error(JSON.parse(error).error, { position: 'bottom-right', });
                    throw new Error(error);

                } else {
                    toast.success('Changes auto-saved ', { position: 'bottom-right', });
                }

                // await Router.push('/');
                setSubmitting(false);
                console.log('protocol updated');
            } catch (error) {
                console.error(error);
            }
        }

    }    

    return (
        <>
            <Formik
                initialValues={content}
                onSubmit={submitData}
            // enableReinitialize={true}
            >
                {({ isSubmitting, values, setFieldValue }) => (
                    <Form>
                        <Toaster />
                        <div className='mb-6'>
                            <label className='block mb-2 text-sm font-medium text-gray-900'>Title</label>
                            <Field type="text" name='title' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-dao-red focus:border-dao-red block w-full p-2.5" />
                        </div>
                        <div className='mb-6 flex'>
                            <div className='basis-1/4'>
                                <label className='block mb-2 text-sm font-medium text-gray-900'>Slug</label>
                                <p className='text-xs text-gray-500 font-extralight mb-2'>To fetch API data, the slug needs to be API id from Coingecko.</p>
                            </div>
                            {/* <label className='block mb-2 text-sm font-medium text-gray-900'>Slug</label> */}
                            <Field type="text" name='slug' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-dao-red focus:border-dao-red block w-full p-2.5" />
                        </div>
                        <div className='mb-6 flex'>
                            <div className='basis-1/4'>
                                <label className='block mb-2 text-sm font-medium text-gray-900'>Short Description</label>
                                <p className='text-xs text-gray-500 font-extralight mb-2'>Give a short summary of the project</p>
                            </div>
                            <Field name="shortDescription" as={FormText} placeholder="Short description" />
                        </div>
                        <div className='mb-6'>
                            <label className='block mb-2 text-sm font-medium text-gray-900'>Categories</label>
                            <Field
                                className="custom-select"
                                name="categories"
                                options={categories}
                                component={FormSelect}
                                placeholder="Select categories"
                                isMulti={true}
                            />
                        </div>
                        <div className='mb-6'>
                            <label className='block mb-2 text-sm font-medium text-gray-900'>Tags</label>
                            <Field
                                className="custom-select"
                                name="tags"
                                options={tags}
                                component={FormSelect}
                                placeholder="Select categories"
                                isMulti={true}
                            />
                        </div>
                        <div className='mb-6'>
                            <label className='block mb-2 text-sm font-medium text-gray-900'>Timeline</label>
                            <p className='text-xs text-gray-500 font-extralight mb-2'>List the major milestones of the token.</p>
                            <FormTimeLine values={values} />
                            {/* <div className="overflow-x-auto relative">
                                <table className="w-full text-sm text-left text-gray-500 mb-1">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                        <tr>
                                            <th scope="col" className="py-3 px-6">
                                                Title
                                            </th>
                                            <th scope="col" className="py-3 px-6">
                                                Date
                                            </th>
                                            <th scope="col" className="py-3 px-6">
                                                Description
                                            </th>
                                            <th scope="col" className="py-3 px-6">

                                            </th>
                                        </tr>
                                    </thead>
                                    <FieldArray name='protocolTimeLine'
                                        render={arrayHelpers => (
                                            <>
                                                <tbody>
                                                    {values?.protocolTimeLine.length > 0 &&
                                                        values?.protocolTimeLine?.map((input, index) => (
                                                            <tr key={index} className="bg-white border-b ">
                                                                <th scope="row" className="py-2 px-3 font-medium text-gray-900 whitespace-nowrap ">
                                                                    <Field
                                                                        name={`protocolTimeLine.${index}.title`}
                                                                        placeholder="Title"
                                                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1.5"
                                                                        type="text"
                                                                    />
                                                                </th>
                                                                <td className="py-2 px-3">
                                                                    <Field name={`protocolTimeLine.${index}.date`} as={FormDate} placeholder="Short description" />
                                                                </td>
                                                                <td className="py-2 px-3">
                                                                    <Field name={`protocolTimeLine.${index}.description`} as={FormText} placeholder="Short description" />
                                                                </td>
                                                                <td className="py-2 px-3">
                                                                    <button type="button" className="text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-800 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center mr-2"
                                                                        onClick={() => arrayHelpers.remove(index)}
                                                                    >
                                                                        <svg
                                                                            fill="white"
                                                                            viewBox="0 0 16 16"
                                                                            height="1em"
                                                                            width="1em"
                                                                        >
                                                                            <path d="M4 8a.5.5 0 01.5-.5h7a.5.5 0 010 1h-7A.5.5 0 014 8z" />
                                                                        </svg>
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        ))}

                                                </tbody>
                                                <button type="button" className="mt-2 rounded-md bg-dao-red px-2 py-1 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                                                    onClick={() => arrayHelpers.push({ title: 'TGE', date: today, description: 'token generation event' })}>Add More..</button>
                                            </>
                                        )}
                                    />
                                </table>
                            </div> */}
                        </div>
                        <div className='mb-6 flex'>
                            <div className='basis-1/4'>
                                <label className='block mb-2 text-sm font-medium text-gray-900'>Main Image</label>
                                <p className='text-xs text-gray-500 font-extralight mb-2'>Upload an SVG or PNG of the protocols logo.</p>
                            </div>
                            <div className='flex'>
                                <Field
                                    className="custom-image"
                                    name="mainImageUrl"
                                    as={FormImageSelect}
                                    onChange={(e) => setFieldValue("mainImageUrl", e)}
                                />
                                <img alt={`Cover Image`} className='rounded-lg h-10 m-auto'
                                    src={values.mainImageUrl}
                                />
                            </div>
                        </div>
                        <FormDivider text='Token Strength' />
                        <FormTokenStrength />
                        <p className='block mb-2 text-sm font-medium text-gray-900'>total Strength:</p>
                        <FormStrength name='tokenStrength' />
                        <FormDivider text='Token Analysis' />
                        <FormAnalysis />
                        <FormDivider text='Investment Take' />
                        <FormInvestmentTake />
                        <FormDivider text='Deep Dive' />
                        <div className='mb-6'>
                            <div className='basis-1/4'>
                                <label className='block mb-2 text-sm font-medium text-gray-900'>Deep Dive</label>
                                <p className='text-xs text-gray-500 font-extralight mb-2'>Provide any additional information as well as Token Allocation, Vesting and Dsitribution information.</p>
                            </div>
                            {/* <Tiptap content={deepDive} setContent={setDeepDive} /> */}
                            <Field name="breakdown" as={FormTipTap} placeholder="Deep Dive" onChange={(e) => setFieldValue("breakdown", e)} />
                        </div>

                        <FormDivider text='Additional Information' />
                        <div className='mb-6'>
                            <div className='basis-1/4'>
                                <label className='block mb-2 text-sm font-medium text-gray-900'>Diagram</label>
                                <p className='text-xs text-gray-500 font-extralight mb-2'>Provide a link to a diagram <a className='underline' href='https://www.notion.so/tokenomicsdao/Creating-Diagrams-ebc097180eb24380ad3e22ebf25f0189#bf3266cdce724102b2c3155d8fb51239'>(how to)</a></p>
                            </div>
                            <Field type="url" name='diagramUrl' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-dao-red focus:border-dao-red block w-full p-2.5" />
                        </div>
                        <div className='mb-6'>
                            <label className='block mb-2 text-sm font-medium text-gray-900'>Resources</label>
                            <p className='text-xs text-gray-500 font-extralight mb-2'>List all links to further reading</p>
                            <FormResources values={values} postId={postId} />
                        </div>
                        <FormAutoSave debounceMs={10000} />
                        <button className="disabled:opacity-40 rounded-md mt-5 mb-5 bg-dao-red px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                            type="submit"
                            disabled={isSubmitting}>Submit</button>
                    </Form>
                )}
            </Formik>
        </>
    )
}