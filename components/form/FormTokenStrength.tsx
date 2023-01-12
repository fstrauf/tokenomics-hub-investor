// import { FieldProps } from "formik";
import { Field } from "formik";
import React from "react";
import FormText from './FormText';
// import Select from "react-select";

export const FormTokenStrength = () => (
    <>
        <div className='mb-6 flex'>
            <div className='basis-1/4 mr-1'>
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
            <div className='basis-1/4 mr-1'>
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
            <div className='basis-1/4 mr-1'>
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
            <div className='basis-1/4 mr-1'>
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
            <div className='basis-1/4 mr-1'>
                <label className='block mb-2 text-sm font-medium text-gray-900'>Demand Drivers</label>
                <p className='text-xs text-gray-500 font-extralight mb-2'>What is the demand for the token, why will people buy it (or not)?</p>
            </div>
            <Field name="demandDrivers" as={FormText} placeholder="Demand Drivers" />
            <div className='ml-3'>
                <label className='block mb-2 text-sm font-medium text-gray-900'>Strength</label>
                <Field type="number" name='demandDriversStrength' className="bg-gray-50 w-16 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-dao-red focus:border-dao-red block p-2.5" />
            </div>
        </div>
    </>
);

export default FormTokenStrength;


