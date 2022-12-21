// import { FieldProps } from "formik";
import { Field, FieldArray } from "formik";
import React from "react";
import FormId from "./FormId";
// import Select from "react-select";

export const FormResources = ({ values, postId }) => (
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
);

export default FormResources;


