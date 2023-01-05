import React from "react";
import { uploadPhoto } from '../../lib/fileUpload';

export const FormImageSelect = (props) => {

  const setMainImageUrl = async (e) => {
    props.onChange(await uploadPhoto(e))
  }

  return (
    <>
      <input
        name={props.name}
        type="file"
        className="mr-3 bg-gray-50 border w-72 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-dao-red focus:border-dao-red block p-2.5"
        accept="image/png, image/jpeg, image/svg+xml"
      onChange={e => setMainImageUrl(e)}
      />
    </>
  )
}

export default FormImageSelect;


