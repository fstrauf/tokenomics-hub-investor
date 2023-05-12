import { Field, FieldArray } from 'formik'
import React from 'react'
import FormSelectUtility from '../form/FormSelectUtility'
import * as duration from 'dayjs/plugin/duration'
import * as dayjs from 'dayjs'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

export const MechanismCardSupply = ({
  field,
  mechanismIndex,
  setFieldValue,
  users,
}) => {
  const isSink = field.value[mechanismIndex]?.isSink || false
  dayjs.extend(duration)
  const secondsPerMonth = 2628000

  interface TabPanelProps {
    children?: React.ReactNode
    index: number
    value: number
  }

  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    )
  }

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    }
  }
  function BasicTabs() {
    const [value, setValue] = React.useState(0)

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue)
    }

    return (
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Phases" {...a11yProps(0)} />
            <Tab label="Functions" {...a11yProps(1)} />
            <Tab label="Spreadsheets" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          Phases
        </TabPanel>
        <TabPanel value={value} index={1}>
          Functions
        </TabPanel>
        <TabPanel value={value} index={2}>
          Spreadsheets
        </TabPanel>
      </Box>
    )
  }

  const demandUtility = () => {
    return (
      <>
        <div className="mt-10">
          <label
            style={{ alignContent: 'center' }}
            className="tracking-tight text-gray-900"
          >
            DEMAND ESTIMATE
          </label>
          <hr className="mt-5 mb-5"></hr>
          <div>
            <BasicTabs></BasicTabs>
          </div>
        </div>
      </>
    )
  }

  const demandMechanism = () => {
    return (
      <>
        <div className="mt-10">
          <label
            style={{ alignContent: 'center' }}
            className="tracking-tight text-gray-900"
          >
            DEMAND ESTIMATE
          </label>
          <hr className="mt-5 mb-5"></hr>
          <div>
            <BasicTabs></BasicTabs>
          </div>
        </div>
      </>
    )
  }

  return (
    <div key={mechanismIndex} className="ml-20 mr-20">
      <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 ">
        {isSink ? <>Mechanism</> : <>Utility</>}
      </h5>
      <hr></hr>

      <label className="mt-5 block text-sm font-medium text-gray-900 ">
        Utility
      </label>
      <Field
        className="custom-select mt-5"
        name={`${field.name}.${mechanismIndex}.PostUser`}
        options={users}
        component={FormSelectUtility}
        placeholder="Select utility"
        isMulti={true}
      />
      <label className="mt-5 block text-sm font-medium text-gray-900">
        Descriptions
      </label>
      <Field
        name={`${field.name}.${mechanismIndex}.description`}
        placeholder="Description"
        className="mt-5 block w-full rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        as="textarea"
        row={4}
      />

      {isSink ? demandMechanism() : demandUtility()}
    </div>
  )
}

export default MechanismCardSupply
