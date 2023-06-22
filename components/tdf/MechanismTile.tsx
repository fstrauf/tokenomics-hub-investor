import React from 'react'
import XMarkIcon from '../../public/svg/xmarkicon'

export const MechanismTile = ({
  input,
  index,
  arrayHelpers = null,
  handleEditMechanism,
  viewer = false,
}) => {
  return (
    <div
      key={index}
      className="grid h-24 w-36 content-between rounded-md border-2 border-dao-green p-1 text-xs"
    >
      <div>
        <div className="flex">
          {input?.isSink ? (
            <></>
          ) : (
            <div
              className="mr-2 h-5 w-5 bg-slate-600"
              style={{ background: input.color }}
            ></div>
          )}
          <p className="">{input.name}</p>
        </div>
        {input.isSink ? (
          <></>
        ) : (
          <p className="mt-2">{input.percentageAllocation} %</p>
        )}
      </div>
      <div className="flex h-7 border-t-2">
        <button
          type="button"
          className="w-full"
          onClick={() => handleEditMechanism(index)}
        >
         {viewer ? 'Open' : 'Edit'} 
        </button>
        {!viewer && (
          <button
            className="relative float-right"
            onClick={() => arrayHelpers.remove(index)}
            type="button"
          >
            <XMarkIcon className="h-3 w-3" aria-hidden="true" />
          </button>
        )}
      </div>
    </div>
  )
}

export default MechanismTile
