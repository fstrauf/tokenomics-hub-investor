import Layout from '../components/layout'
import React from 'react'
import { headerStatus } from '../lib/helper'
import AuditDesignHelpContent from '../components/AuditDesignHelpContent'

export default function AuditDesignHelp() {
  return (
    <>
      <Layout mode={headerStatus.design}>
        <AuditDesignHelpContent />
      </Layout>
    </>
  )
}
