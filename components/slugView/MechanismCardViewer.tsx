import React from 'react'
import UserViewer from './UserViewer'
import {
  DemandMechanismViewer,
  DemandUtilityViewer,
  SupplyExternalViewer,
  SupplyInternalViewer,
} from '../supplyDemandType/SupplyType'
import { supplyDemandType } from '../../lib/helper'

export const MechanismCardViewer = ({ mechanism }) => {
  console.log("🚀 ~ file: MechanismCardViewer.tsx:13 ~ MechanismCardViewer ~ mechanism:", mechanism)
  let sCurrentTab = mechanism?.supplyDemandType

  function returnsTab(tab) {
    let propsOfInternalExternal = {
      mechanism
    }
    let propsOfUtilityDemand = {
      mechanism
    }
    switch (tab) {
      case 'supplyInternal':
        return <SupplyInternalViewer {...propsOfInternalExternal} />
      case 'supplyExternal':
        return <SupplyExternalViewer {...propsOfInternalExternal} />
      case 'demandUtility':
        return <DemandUtilityViewer {...propsOfUtilityDemand} />
      case 'demandMechanism':
        return <DemandMechanismViewer {...propsOfUtilityDemand} />
    }
  }

  function returnsTabName(tab) {
    switch (tab) {
      case 'supplyInternal':
        return 'Internal Allocation'
      case 'supplyExternal':
        return 'External Allocation'
      case 'demandUtility':
        return 'Utility'
      case 'demandMechanism':
        return 'Mechanism'
    }
  }

  if (
    sCurrentTab == supplyDemandType.supplyInternal ||
    sCurrentTab == supplyDemandType.supplyExternal
  ) {
    return (
      <div
        key={mechanism?.id}
        className="ml-auto mr-auto flex max-w-2xl flex-col p-4"
      >
        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 ">
          {returnsTabName(sCurrentTab)}
        </h5>
        <label className="block text-sm font-medium text-gray-900 ">Name</label>
        <span className="block rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-xs text-gray-900 focus:border-blue-500 focus:ring-blue-500">
          {mechanism.name}
        </span>

        <label className="block text-sm font-medium text-gray-900 ">User</label>
        <UserViewer users={mechanism.PostUser} headerless={true} />

        {returnsTab(sCurrentTab)}
      </div>
    )
  } else {
    return (
      <div
        key={mechanism?.id}
        className="ml-20 mr-20 flex max-w-2xl flex-col p-4"
      >
        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 ">
          {returnsTabName(sCurrentTab)}
        </h5>
        <label className="block text-sm font-medium text-gray-900 ">Name</label>
        <span className="block rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-xs text-gray-900 focus:border-blue-500 focus:ring-blue-500">
          {mechanism.name}
        </span>
        <label className="block text-sm font-medium text-gray-900 ">
        Summary
      </label>
      <pre
        id="message"
        className="block w-full whitespace-pre-line rounded-lg bg-slate-50 p-2.5 font-sans text-sm text-gray-900"
      >
        {mechanism.summary}
      </pre>
        {returnsTab(sCurrentTab)}
      </div>
    )
  }
}

export default MechanismCardViewer
