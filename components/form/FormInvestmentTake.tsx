// import { FieldProps } from "formik";
import { Field } from "formik";
import React from "react";
import FormText from './FormText';
// import Select from "react-select";

export const FormInvestmentTake = () => (
    <>
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
                <p className='text-xs text-gray-500 font-extralight mb-2'>How to measure progress? (add links in the resource section if possible)</p>
            </div>
            <Field name="metrics" as={FormText} placeholder="Metrics" />
        </div>
    </>
);

export default FormInvestmentTake;


