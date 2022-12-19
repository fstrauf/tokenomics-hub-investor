import React, { useCallback, useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import debounce from 'lodash.debounce'
// import { useFormik, useField, Field } from 'formik';
import { Field, Form, Formik, FieldArray, useFormikContext } from "formik";
// import * as Yup from 'yup'
// import { PostCreateSchema } from '../prisma/generated/schemas'
// import Select from "react-select";
import FormSelect from './form/FormSelect';
import FormText from './form/FormText';
import FormTipTap from './form/FormTipTap';
import FormStrength from './form/FormStrength';
import FormImageSelect from './form/FormImageSelect';
import FormId from './form/FormId';
import FormDate from './form/FormDate';

export default function Post2({ content, categories, tags }) {

    // console.log(categories)
    // console.log(content)

    const [postId, setPostId] = useState(content.id)

    const AutoSave = ({ debounceMs = 30000 }) => {
        //https://itnext.io/formik-introduction-autosave-react-19d4c15cfb90
        const formik = useFormikContext();
        const [isSaved, setIsSaved] = useState(null);
        const debouncedSubmit = useCallback(
            debounce(() => {
                return formik.submitForm().then(() => setIsSaved(true));
            }, debounceMs),
            [formik.submitForm, debounceMs],
        );

        useEffect(() => debouncedSubmit, [debouncedSubmit, formik.values]);

        return (
            <></>
            //   <p className="text-center text-success">
            //     {!!formik.isSubmitting
            //       ? 'Saving...'
            //       : isSaved
            //       ? 'Your changes saved.'
            //       : null}
            //   </p>
        );
    };


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

    const today = new Date().toLocaleDateString('en-CA')

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
                            <div className="overflow-x-auto relative">
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
                                    {/* <tbody> */}
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
                                                                    {/* <Field
                                                                        name={`protocolTimeLine.${index}.date`}
                                                                        placeholder="Date"
                                                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1.5"
                                                                        type="date"
                                                                    /> */}
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
                            </div>

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
                        <div className='mb-6 flex'>
                            <div className='basis-1/4'>
                                <label className='block mb-2 text-sm font-medium text-gray-900'>Token Utility</label>
                                <p className='text-xs text-gray-500 font-extralight mb-2'>Describe what the token is used for and the role it plays within the protocol</p>
                            </div>
                            <Field name="tokenUtility" as={FormText} placeholder="Token Utility" />
                            <div className='ml-3'>
                                <label className='block mb-2 text-sm font-medium text-gray-900 '>Strength</label>
                                <Field type="number" name='tokenUtilityStrength' className="bg-gray-50 w-16 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-dao-red focus:border-dao-red block p-2.5" />
                            </div>
                        </div>
                        <div className='mb-6 flex'>
                            <div className='basis-1/4'>
                                <label className='block mb-2 text-sm font-medium text-gray-900'>Business Model</label>
                                <p className='text-xs text-gray-500 font-extralight mb-2'>How does the protocol make money?</p>
                            </div>
                            <Field name="businessModel" as={FormText} placeholder="Business Model" />
                            <div className='ml-3'>
                                <label className='block mb-2 text-sm font-medium text-gray-900'>Strength</label>
                                <Field type="number" name='businessModelStrength' className="bg-gray-50 w-16 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-dao-red focus:border-dao-red block p-2.5" />
                            </div>
                        </div>
                        <div className='mb-6 flex'>
                            <div className='basis-1/4'>
                                <label className='block mb-2 text-sm font-medium text-gray-900'>Value Creation</label>
                                <p className='text-xs text-gray-500 font-extralight mb-2'>What is the value created by the protocol?</p>
                            </div>
                            <Field name="valueCreation" as={FormText} placeholder="Value Creation" />
                            <div className='ml-3'>
                                <label className='block mb-2 text-sm font-medium text-gray-900'>Strength</label>
                                <Field type="number" name='valueCreationStrength' className="bg-gray-50 w-16 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-dao-red focus:border-dao-red block p-2.5" />
                            </div>
                        </div>
                        <div className='mb-6 flex'>
                            <div className='basis-1/4'>
                                <label className='block mb-2 text-sm font-medium text-gray-900'>Value Capture</label>
                                <p className='text-xs text-gray-500 font-extralight mb-2'>How does (or does not) the protocol and/or its token capture/reflect the value it creates?</p>
                            </div>
                            <Field name="valueCapture" as={FormText} placeholder="Value Capture" />
                            <div className='ml-3'>
                                <label className='block mb-2 text-sm font-medium text-gray-900'>Strength</label>
                                <Field type="number" name='valueCaptureStrength' className="bg-gray-50 w-16 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-dao-red focus:border-dao-red block p-2.5" />
                            </div>
                        </div>
                        <div className='mb-6 flex'>
                            <div className='basis-1/4'>
                                <label className='block mb-2 text-sm font-medium text-gray-900'>Demand Drivers</label>
                                <p className='text-xs text-gray-500 font-extralight mb-2'>What is the demand for the token, why will people buy it (or not)?</p>
                            </div>
                            <Field name="demandDrivers" as={FormText} placeholder="Demand Drivers" />
                            <div className='ml-3'>
                                <label className='block mb-2 text-sm font-medium text-gray-900'>Strength</label>
                                <Field type="number" name='demandDriversStrength' className="bg-gray-50 w-16 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-dao-red focus:border-dao-red block p-2.5" />
                            </div>
                        </div>
                        <p className='block mb-2 text-sm font-medium text-gray-900'>total Strength:</p>
                        
                        <FormStrength name='tokenStrength' />
                        <div className='mb-6 flex'>
                            <div className='basis-1/4'>
                                <label className='block mb-2 text-sm font-medium text-gray-900'>Strong Points</label>
                                <p className='text-xs text-gray-500 font-extralight mb-2'>Describe the strenghts of protocol and token.</p>
                            </div>
                            <Field name="strongPoints" as={FormText} placeholder="Strong Points" />
                        </div>
                        <div className='mb-6 flex'>
                            <div className='basis-1/4'>
                                <label className='block mb-2 text-sm font-medium text-gray-900'>Weak Points</label>
                                <p className='text-xs text-gray-500 font-extralight mb-2'>Describe the weaknesses of protocol and token.</p>
                            </div>
                            <Field name="weakPoints" as={FormText} placeholder="Weak Points" />
                        </div>
                        <div className='mb-6 flex'>
                            <div className='basis-1/4'>
                                <label className='block mb-2 text-sm font-medium text-gray-900'>Problems / Solutions</label>
                                <p className='text-xs text-gray-500 font-extralight mb-2'>Describe the problems the token solves.</p>
                            </div>
                            <Field name="problemSolution" as={FormText} placeholder="Problems / Solutions" />
                        </div>
                        <div className='mb-6 flex'>
                            <div className='basis-1/4'>
                                <label className='block mb-2 text-sm font-medium text-gray-900'>Predecessors</label>
                                <p className='text-xs text-gray-500 font-extralight mb-2'>Who did the token borrow ideas from / which concepts did it evolve?</p>
                            </div>
                            <Field name="parent" as={FormText} placeholder="Predecessor" />
                        </div>
                        <div className='mb-6 flex'>
                            <div className='basis-1/4'>
                                <label className='block mb-2 text-sm font-medium text-gray-900'>Three Month Horizon</label>
                                <p className='text-xs text-gray-500 font-extralight mb-2'>What might impact the tokens performance in the short term</p>
                            </div>
                            <Field name="threeMonthHorizon" as={FormText} placeholder="Three Month Horizon" />
                        </div>
                        <div className='mb-6 flex'>
                            <div className='basis-1/4'>
                                <label className='block mb-2 text-sm font-medium text-gray-900'>One Year Horizon</label>
                                <p className='text-xs text-gray-500 font-extralight mb-2'>What might impact the tokens performance in the mid / long term</p>
                            </div>
                            <Field name="oneYearHorizon" as={FormText} placeholder="One Year Horizon" />
                        </div>
                        <div className='mb-6 flex'>
                            <div className='basis-1/4'>
                                <label className='block mb-2 text-sm font-medium text-gray-900'>Upside</label>
                                <p className='text-xs text-gray-500 font-extralight mb-2'>What could go well?</p>
                            </div>
                            <Field name="upside" as={FormText} placeholder="Upside" />
                        </div>
                        <div className='mb-6 flex'>
                            <div className='basis-1/4'>
                                <label className='block mb-2 text-sm font-medium text-gray-900'>Downside</label>
                                <p className='text-xs text-gray-500 font-extralight mb-2'>What could go wrong?</p>
                            </div>
                            <Field name="downside" as={FormText} placeholder="Downside" />
                        </div>
                        <div className='mb-6 flex'>
                            <div className='basis-1/4'>
                                <label className='block mb-2 text-sm font-medium text-gray-900'>Decision Horizon</label>
                                <p className='text-xs text-gray-500 font-extralight mb-2'>How long?</p>
                            </div>
                            <Field name="horizon" as={FormText} placeholder="Decision Horizon" />
                        </div>
                        <div className='mb-6 flex'>
                            <div className='basis-1/4'>
                                <label className='block mb-2 text-sm font-medium text-gray-900'>Metrics</label>
                                <p className='text-xs text-gray-500 font-extralight mb-2'>How to measure progress?</p>
                            </div>
                            <Field name="metrics" as={FormText} placeholder="Metrics" />
                        </div>
                        <div className='mb-6'>
                            <div className='basis-1/4'>
                                <label className='block mb-2 text-sm font-medium text-gray-900'>Deep Dive</label>
                                <p className='text-xs text-gray-500 font-extralight mb-2'>Provide any additional information as well as Token Allocation, Vesting and Dsitribution information.</p>
                            </div>
                            {/* <Tiptap content={deepDive} setContent={setDeepDive} /> */}
                            <Field name="breakdown" as={FormTipTap} placeholder="Deep Dive" onChange={(e) => setFieldValue("breakdown", e)} />
                        </div>
                        

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

                            <div className="overflow-x-auto relative">
                                <table className="w-full text-sm text-left text-gray-500 mb-1">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                        <tr>
                                            <th scope="col" className="py-3 px-6 w-1/6">
                                                Title
                                            </th>
                                            <th scope="col" className="py-3 px-6 w-3/6">
                                                Url
                                            </th>
                                            <th scope="col" className="py-3 px-6">
                                                Internal?
                                            </th>
                                            <th scope="col" className="py-3 px-6">

                                            </th>
                                        </tr>
                                    </thead>
                                    {/* <tbody> */}
                                    <FieldArray name='ProtocolResources'
                                        render={arrayHelpers => (
                                            <>
                                                <tbody>
                                                    {values?.ProtocolResources.length > 0 &&
                                                        values?.ProtocolResources?.map((input, index) => (
                                                            <tr key={index} className="bg-white border-b ">
                                                                <th scope="row" className="py-2 px-3 font-medium text-gray-900 whitespace-nowrap ">
                                                                    <Field
                                                                        name={`ProtocolResources.${index}.title`}
                                                                        placeholder="Title"
                                                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1.5"
                                                                        type="text"
                                                                    />
                                                                </th>
                                                                <td className="py-2 px-3">
                                                                    <Field
                                                                        name={`ProtocolResources.${index}.url`}
                                                                        placeholder="Url"
                                                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1.5"
                                                                        type="url"
                                                                    />
                                                                </td>
                                                                <td className="py-2 px-3">
                                                                    <Field
                                                                        name={`ProtocolResources.${index}.internal`}
                                                                        // placeholder="I"
                                                                        // checked
                                                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1.5"
                                                                        type="checkbox"
                                                                    />
                                                                </td>
                                                                <td className="py-2 px-3">
                                                                    <button type="button" className="text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-800 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center mr-2"
                                                                        onClick={() => arrayHelpers.remove(index)} >
                                                                        <svg
                                                                            fill="white"
                                                                            viewBox="0 0 16 16"
                                                                            height="1em"
                                                                            width="1em"
                                                                        // {...props}
                                                                        >
                                                                            <path d="M4 8a.5.5 0 01.5-.5h7a.5.5 0 010 1h-7A.5.5 0 014 8z" />
                                                                        </svg>
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        ))}

                                                </tbody>
                                                <button type="button" className="mt-3 rounded-md bg-dao-red px-2 py-1 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                                                    onClick={() => arrayHelpers.push({ title: 'website', url: 'https://www.tokenomicshub.xyz/', internal: true })}>Add More..</button>
                                                <Field type="text" disabled={true} name='id' className="bg-gray-50 mt-4 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-dao-red focus:border-dao-red block w-full p-2.5" />
                                                <FormId postId={postId} type="text" name='id' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-dao-red focus:border-dao-red block w-full p-2.5" />
                                            </>
                                        )}
                                    />
                                </table>
                            </div>

                        </div>
                        <AutoSave debounceMs={10000} />
                        <button className="disabled:opacity-40 rounded-md mt-5 mb-5 bg-dao-red px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                            type="submit"
                            // onClick={handleSubmit(e => triggerSubmitData(e))}
                            disabled={isSubmitting}>Submit</button>
                    </Form>
                )}
            </Formik>
        </>
    )
}