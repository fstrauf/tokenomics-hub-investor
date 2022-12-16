import React, { useState } from 'react';
import { uploadPhoto } from '../lib/fileUpload';
import Tiptap from './TipTap';
import { Listbox } from '@headlessui/react'
import Router from 'next/router';
// import CoverImage from './cover-image';
import { useForm } from "react-hook-form";

export default function Post({ content, categories, tags }) {

    const { handleSubmit, formState } = useForm();

    const today = new Date().toLocaleDateString('en-CA')

    console.log(content?.ourTake)

    const [ourTake, setOurTake] = useState(JSON.parse(content?.ourTake || '{}') ?? {});
    const [deepDive, setDeepDive] = useState(JSON.parse(content?.breakdown || '{}') ?? {});
    const [selectedCats, setSelectedCats] = useState(content?.categories);
    const [selectedTags, setSelectedTags] = useState(content?.tags);
    const [inputFields, setInputFields] = useState(content)

    const tokenStrength = (inputFields.businessModelStrength + inputFields.demandDriversStrength + inputFields.valueCaptureStrength + inputFields.valueCreationStrength + inputFields.tokenUtilityStrength) / 5

    const submitData = async (e: React.SyntheticEvent) => {
        // e.preventDefault();

        const body = { ourTake, deepDive, inputFields, selectedCats, selectedTags, tokenStrength };

        if (inputFields.id === undefined) {
            try {
                const response = await fetch('/api/post/newProtocol', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(body),
                });

                if (!response.ok) {
                    const message = `An error has occured: ${response.status}`;
                    throw new Error(message);
                }

                await Router.push('/');
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
                    const message = `An error has occured: ${response.status}`;
                    throw new Error(message);
                }

                await Router.push('/');
                console.log('protocol created');
            } catch (error) {
                console.error(error);
            }
        }

    }

    const handleResourceChange = (index: any, event: any) => {
        event.preventDefault()
        let data = [...inputFields.ProtocolResources];
        data[index][event.target.name] = event.target.value;

        setInputFields({ ...inputFields, ProtocolResources: data })
    }

    const addResource = (event: any) => {
        event.preventDefault()
        let newfield = [...inputFields.ProtocolResources, { title: 'website', url: 'https://www.tokenomicshub.xyz/', internal: true }]

        setInputFields({ ...inputFields, ProtocolResources: newfield })
    }

    const removeResource = (index: any, event: any) => {
        event.preventDefault()
        let data = [...inputFields.ProtocolResources];
        data.splice(index, 1)
        setInputFields({ ...inputFields, ProtocolResources: data })
    }

    const handleTimeLineChange = (index: any, event: any) => {
        event.preventDefault()
        let data = [...inputFields.protocolTimeLine];
        data[index][event.target.name] = event.target.value;

        setInputFields({ ...inputFields, protocolTimeLine: data })
    }

    const addTimeLine = (event: any) => {
        event.preventDefault()
        let newfield = [...inputFields.protocolTimeLine, { title: 'TGE', date: today, description: 'token generation event' }]

        setInputFields({ ...inputFields, protocolTimeLine: newfield })
    }

    const removeTimeLine = (index: any, event: any) => {
        event.preventDefault()
        let data = [...inputFields.protocolTimeLine];
        data.splice(index, 1)
        setInputFields({ ...inputFields, protocolTimeLine: data })
    }

    const setMainImageUrl = async (e) => {
        const url = await uploadPhoto(e)
        console.log(url)
        setInputFields({ ...inputFields, mainImageUrl: url })
    }

    return (
        <>
            <form className='flex flex-col m-auto mt-5'>
                <div className='mb-6'>
                    <label className='block mb-2 text-sm font-medium text-gray-900'>Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        required
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-dao-red focus:border-dao-red block w-full p-2.5"
                        value={inputFields.title}
                        onChange={e => setInputFields({ ...inputFields, title: e.target.value })}
                    />
                </div>
                <div className='mb-6'>
                    <label className='block mb-2 text-sm font-medium text-gray-900'>
                        Slug</label>
                    <input type="text" id="slug" name="slug"
                        value={inputFields.slug}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-dao-red focus:border-dao-red block w-full p-2.5"
                        onChange={e => setInputFields({ ...inputFields, slug: e.target.value })} />
                </div>
                <div className='mb-6'>
                    <label className='block mb-2 text-sm font-medium text-gray-900'>Short Description</label>
                    <textarea rows="4"
                        className="block p-2.5 w-full text-xs text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        name='shortDescription'
                        value={inputFields.shortDescription}
                        onChange={e => setInputFields({ ...inputFields, shortDescription: e.target.value })}
                    />
                </div>
                <div className='mb-6'>
                    <label className='block mb-2 text-sm font-medium text-gray-900'>Categories</label>
                    <Listbox value={selectedCats} onChange={setSelectedCats} multiple>
                        <div className="relative mt-1">
                            <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                                {selectedCats.map((category) => category.title).join(', ')}
                            </Listbox.Button>
                            <Listbox.Options className="z-50 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {categories?.map((cat) => (
                                    <Listbox.Option
                                        className={({ active }) =>
                                            `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'z-50 bg-amber-100 text-amber-900' : 'text-gray-900'
                                            }`
                                        }
                                        key={cat.id}
                                        value={cat}
                                    >
                                        {cat.title}
                                    </Listbox.Option>
                                ))}
                            </Listbox.Options>
                        </div>
                    </Listbox>
                </div>
                <div className='mb-6'>
                    <label className='block mb-2 text-sm font-medium text-gray-900'>Tags</label>
                    <Listbox value={selectedTags} onChange={setSelectedTags} multiple>
                        <div className="relative mt-1">
                            <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                                {selectedTags.map((tag) => tag.title).join(', ')}
                            </Listbox.Button>
                            <Listbox.Options className="z-50 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {tags?.map((tag) => (
                                    <Listbox.Option
                                        className={({ active }) =>
                                            `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'z-50 bg-amber-100 text-amber-900' : 'text-gray-900'
                                            }`
                                        }
                                        key={tag.id}
                                        value={tag}
                                    >
                                        {tag.title}
                                    </Listbox.Option>
                                ))}
                            </Listbox.Options>
                        </div>
                    </Listbox>
                </div>
                <div className='mb-6'>
                    <label className='block mb-2 text-sm font-medium text-gray-900'>Timeline</label>
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
                            <tbody>
                                {inputFields?.protocolTimeLine?.map((input, index) => {
                                    return (
                                        <tr key={index} className="bg-white border-b ">
                                            <th scope="row" className="py-2 px-3 font-medium text-gray-900 whitespace-nowrap ">
                                                <input
                                                    name='title'
                                                    placeholder='Title'
                                                    type='text'
                                                    value={input.title}
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1.5"
                                                    onChange={event => handleTimeLineChange(index, event)}
                                                />
                                            </th>
                                            <td className="py-2 px-3">
                                                <input
                                                    name='date'
                                                    // placeholder=''
                                                    type='date'
                                                    value={new Date(input.date).toLocaleDateString('en-CA')}
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1.5"
                                                    onChange={event => handleTimeLineChange(index, event)}
                                                />
                                            </td>
                                            <td className="py-2 px-3">
                                                <textarea rows="3"
                                                    className="block p-2.5 w-full text-xs text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                                    name='description'
                                                    value={input.description}
                                                    onChange={event => handleTimeLineChange(index, event)}
                                                />
                                            </td>
                                            <td className="py-2 px-3">
                                                <button type="button" className="text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-800 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center mr-2"
                                                    onClick={event => removeTimeLine(index, event)} >
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
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                    <button className="rounded-md bg-dao-red px-2 py-1 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                        onClick={event => addTimeLine(event)}>Add More..</button>
                </div>
                <div className='mb-6'>
                    <label className='block mb-2 text-sm font-medium text-gray-900'>Published At</label>
                    <input type='date' id="publishedAt" name="publishedAt"
                        value={new Date(inputFields.publishedAt).toLocaleDateString('en-CA')}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-dao-red focus:border-dao-red block w-full p-2.5"
                        placeholder={inputFields.publishedAt}
                        onChange={e => setInputFields({ ...inputFields, publishedAt: e.target.value })} />
                </div>
                <div className='mb-6'>
                    <label className='block mb-2 text-sm font-medium text-gray-900'>Main Image (link to svg)</label>
                    <div className='flex'>
                    <input
                        id="mainImageUrl" name="mainImageUrl"
                        type="file"
                        className="bg-gray-50 border w-72 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-dao-red focus:border-dao-red block p-2.5"
                        accept="image/png, image/jpeg, image/svg+xml"
                        onChange={e => setMainImageUrl(e)}
                    />
                    <img
                        alt={`Cover Image for logo`}
                        className='rounded-lg h-10 m-auto'
                        src={inputFields.mainImageUrl}
                    />
                    </div>
                </div>
                <div className='mb-6'>
                    <label className='block mb-2 text-sm font-medium text-gray-900'>Token Utility</label>
                    <textarea rows="3"
                        className="block p-2.5 w-full text-xs text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        name='tokenUtility'
                        value={inputFields.tokenUtility}
                        onChange={e => setInputFields({ ...inputFields, tokenUtility: e.target.value })}
                    />
                    <label className='block mb-2 text-sm font-medium text-gray-900'>Strength</label>
                    <input type='number' id="tokenUtilityStrength" name="tokenUtilityStrength"
                        value={inputFields.tokenUtilityStrength}
                        className="bg-gray-50 w-16 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-dao-red focus:border-dao-red block p-2.5"
                        onChange={e => setInputFields({ ...inputFields, tokenUtilityStrength: Number(e.target.value) })} />
                </div>
                <div className='mb-6'>
                    <label className='block mb-2 text-sm font-medium text-gray-900'>Business Model</label>
                    <textarea rows="3"
                        className="block p-2.5 w-full text-xs text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        name='businessModel'
                        value={inputFields.businessModel}
                        onChange={e => setInputFields({ ...inputFields, businessModel: e.target.value })}
                    />
                    <label className='block mb-2 text-sm font-medium text-gray-900'>Strength</label>
                    <input type='number' id="businessModel" name="businessModel"
                        value={inputFields.businessModelStrength}
                        className="bg-gray-50 w-16 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-dao-red focus:border-dao-red block p-2.5"
                        onChange={e => setInputFields({ ...inputFields, businessModelStrength: Number(e.target.value) })} />
                </div>
                <div className='mb-6'>
                    <label className='block mb-2 text-sm font-medium text-gray-900'>Value Creation</label>
                    <textarea rows="3"
                        className="block p-2.5 w-full text-xs text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        name='valueCreation'
                        value={inputFields.valueCreation}
                        onChange={e => setInputFields({ ...inputFields, valueCreation: e.target.value })}
                    />
                    <label className='block mb-2 text-sm font-medium text-gray-900'>Strength</label>
                    <input type='number' id="valueCreation" name="valueCreation"
                        value={inputFields.valueCreationStrength}
                        className="bg-gray-50 w-16 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-dao-red focus:border-dao-red block p-2.5"
                        onChange={e => setInputFields({ ...inputFields, valueCreationStrength: Number(e.target.value) })} />
                </div>
                <div className='mb-6'>
                    <label className='block mb-2 text-sm font-medium text-gray-900'>Value Capture</label>
                    <textarea rows="3"
                        className="block p-2.5 w-full text-xs text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        name='valueCapture'
                        value={inputFields.valueCapture}
                        onChange={e => setInputFields({ ...inputFields, valueCapture: e.target.value })}
                    />
                    <label className='block mb-2 text-sm font-medium text-gray-900'>Strength</label>
                    <input type='number' id="valueCapture" name="valueCapture"
                        value={inputFields.valueCaptureStrength}
                        className="bg-gray-50 w-16 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-dao-red focus:border-dao-red block p-2.5"
                        onChange={e => setInputFields({ ...inputFields, valueCaptureStrength: Number(e.target.value) })} />
                </div>
                <div className='mb-6'>
                    <label className='block mb-2 text-sm font-medium text-gray-900'>Demand Drivers</label>
                    <textarea rows="3"
                        className="block p-2.5 w-full text-xs text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        name='demandDrivers'
                        value={inputFields.demandDrivers}
                        onChange={e => setInputFields({ ...inputFields, demandDrivers: e.target.value })}
                    />
                    <label className='block mb-2 text-sm font-medium text-gray-900'>Strength</label>
                    <input type='number' id="demandDrivers" name="demandDrivers"
                        value={inputFields.demandDriversStrength}
                        className="bg-gray-50 w-16 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-dao-red focus:border-dao-red block p-2.5"
                        onChange={e => setInputFields({ ...inputFields, demandDriversStrength: Number(e.target.value) })} />
                </div>
                <p className='block mb-2 text-sm font-medium text-gray-900'>total Strenght: {tokenStrength}</p>
                <div className='mb-6'>
                    <label className='block mb-2 text-sm font-medium text-gray-900'>Our Take</label>
                    <Tiptap content={ourTake} setContent={setOurTake} />
                </div>
                <div className='mb-6'>
                    <label className='block mb-2 text-sm font-medium text-gray-900'>Three Month Horizon</label>
                    <textarea rows="3"
                        className="block p-2.5 w-full text-xs text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        name='threeMonthHorizon'
                        value={inputFields.threeMonthHorizon}
                        onChange={e => setInputFields({ ...inputFields, threeMonthHorizon: e.target.value })}
                    />
                </div>
                <div className='mb-6'>
                    <label className='block mb-2 text-sm font-medium text-gray-900'>One Year Horizon</label>
                    <textarea rows="3"
                        className="block p-2.5 w-full text-xs text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        name='oneYearHorizon'
                        value={inputFields.oneYearHorizon}
                        onChange={e => setInputFields({ ...inputFields, oneYearHorizon: e.target.value })}
                    />
                </div>
                <div className='mb-6'>
                    <label className='block mb-2 text-sm font-medium text-gray-900'>Upside</label>
                    <textarea rows="3"
                        className="block p-2.5 w-full text-xs text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        name='upside'
                        value={inputFields.upside}
                        onChange={e => setInputFields({ ...inputFields, upside: e.target.value })}
                    />
                </div>
                <div className='mb-6'>
                    <label className='block mb-2 text-sm font-medium text-gray-900'>Downside</label>
                    <textarea rows="3"
                        className="block p-2.5 w-full text-xs text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        name='downside'
                        value={inputFields.downside}
                        onChange={e => setInputFields({ ...inputFields, downside: e.target.value })}
                    />
                </div>
                <div className='mb-6'>
                    <label className='block mb-2 text-sm font-medium text-gray-900'>Decision Horizon</label>
                    <textarea rows="3"
                        className="block p-2.5 w-full text-xs text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        name='decisionHorizon'
                        value={inputFields.decisionHorizon}
                        onChange={e => setInputFields({ ...inputFields, decisionHorizon: e.target.value })}
                    />
                </div>
                <div className='mb-6'>
                    <label className='block mb-2 text-sm font-medium text-gray-900'>Metrics</label>
                    <textarea rows="3"
                        className="block p-2.5 w-full text-xs text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        name='metrics'
                        value={inputFields.metrics}
                        onChange={e => setInputFields({ ...inputFields, metrics: e.target.value })}
                    />
                </div>
                <div className='mb-6'>
                    <label className='block mb-2 text-sm font-medium text-gray-900'>Deep Dive</label>
                    <Tiptap content={deepDive} setContent={setDeepDive} />
                </div>
                <div className='mb-6'>
                    <label className='block mb-2 text-sm font-medium text-gray-900'>Diagram</label>
                    <input type='url' id="diagramUrl" name="diagramUrl"
                        value={inputFields.diagramUrl}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-dao-red focus:border-dao-red block w-full p-2.5"
                        onChange={e => setInputFields({ ...inputFields, diagramUrl: e.target.value })} />
                </div>
                <div className='mb-6'>
                    <label className='block mb-2 text-sm font-medium text-gray-900'>Resources</label>

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
                            <tbody>
                                {inputFields?.ProtocolResources?.map((input, index) => {
                                    return (
                                        <tr key={index} className="bg-white border-b ">
                                            <th scope="row" className="py-2 px-3 font-medium text-gray-900 whitespace-nowrap ">
                                                <input
                                                    name='title'
                                                    placeholder='Title'
                                                    type='text'
                                                    value={input.title}
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1.5"
                                                    onChange={event => handleResourceChange(index, event)}
                                                />
                                            </th>
                                            <td className="py-2 px-3">
                                                <input
                                                    name='url'
                                                    placeholder='Url'
                                                    type='url'
                                                    value={input.url}
                                                    className="bg-gray-50 w-full border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1.5"
                                                    onChange={event => handleResourceChange(index, event)}
                                                />
                                            </td>
                                            <td className="py-2 px-3">
                                                <input
                                                    name='internal'
                                                    placeholder='Internal'
                                                    checked={input.internal}
                                                    type='checkbox'
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1.5"
                                                    onChange={event => handleResourceChange(index, event)}
                                                />
                                            </td>
                                            <td className="py-2 px-3">
                                                <button type="button" className="text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-800 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center mr-2"
                                                    onClick={event => removeResource(index, event)} >
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
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                    <button className="rounded-md bg-dao-red px-2 py-1 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                        onClick={event => addResource(event)}>Add More..</button>
                </div>
                <button className="disabled:opacity-40 rounded-md mt-5 mb-5 bg-dao-red px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                    type="submit" onClick={handleSubmit(e => submitData(e))}
                    disabled={formState.isSubmitting}>Submit</button>
            </form>
        </>
    )
}