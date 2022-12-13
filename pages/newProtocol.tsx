import Layout from '../components/layout'
import Intro from '../components/intro'
import React, { useState } from 'react';
import Tiptap from '../components/TipTap';
import Router from 'next/router';
import { Listbox } from '@headlessui/react'
import prisma from '../lib/prisma'


export default function NewProtocol({ categories, tags }) {

  // console.log(tags)

  const [ourTake, setOurTake] = useState({});
  const [deepDive, setDeepDive] = useState({});
  const [selectedCats, setSelectedCats] = useState([categories[0], categories[1]]);
  const [selectedTags, setSelectedTags] = useState([tags[0], tags[1]]);
  const [inputFields, setInputFields] = useState(
    {
      title: 'Tokenomics DAO',
      slug: 'tdao',
      shortDescription: 'A great place to discuss Tokenomics',
      categories: [ 
        { id: 1, title: 'DeFi' }, 
        { id: 2, title: 'DAO' } 
      ],
      tags: [
        { id: 1, title: 'Great DAO' },
        { id: 2, title: 'AMM' },
        { id: 3, title: 'Yield Bearing' }
      ],
      timeLine: 'started',
      publishedAt: '21/12/2022',
      mainImage: 'https://img.icons8.com/officel/512/logo.png',
      tokenUtility: 'Governance',
      tokenUtilityStrength: 50,
      businessModel: 'Consulting, Education, Content',
      businessModelStrength: 80,
      valueCreation: 'Produce great content',
      valueCreationStrength: 70,
      valueCapture: 'Holders govern over treausry',
      valueCaptureStrength: 60,
      demandDrivers: 'Decide over what happens with revenue',
      demandDriversStrength: 80,
      totalTokenStrength: 100,
      threeMonthHorizon: 'bear market',
      oneYearHorizon: 'will be over soon',
      upside: 'TDAO creates a ton of revenue',
      downside: 'tokens are a scam',
      decisionHorizon: 'very long term',
      metrics: 'revnue, profit, growth',
      diagram: 'https://viewer.diagrams.net/?tags=%7B%7D&highlight=0000ff&edit=_blank&layers=1&nav=1&title=tokenomics_BanklessDAO.drawio#Uhttps%3A%2F%2Fdrive.google.com%2Fuc%3Fid%3D1w7W4n-NS7DPGq1e-2KaErjTEhjQMQFCs%26export%3Ddownload',
      resources: 'https://www.tokenomicshub.xyz/',
    }
  )

  const tokenStrength = (inputFields.businessModelStrength + inputFields.demandDriversStrength + inputFields.valueCaptureStrength + inputFields.valueCreationStrength + inputFields.tokenUtilityStrength ) / 5

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = { ourTake, deepDive, inputFields, selectedCats, selectedTags, tokenStrength };
      await fetch('/api/post/newProtocol', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      await Router.push('/');
      console.log('protocol created');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Layout>
        <Intro />
        <h1 className="text-3xl font-bold">
          Submit a draft for review
        </h1>

        <form className='flex flex-col m-auto'>
          {/* <div className='flex flex-col m-auto'> */}
          <div>
            <label for="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              required
              value={inputFields.title}
              onChange={e => setInputFields({ ...inputFields, title: e.target.value })}
            />
          </div>
          <div>
            <label for="slug">Slug</label>
            <input type="text" id="slug" name="slug"
              value={inputFields.slug}
              onChange={e => setInputFields({ ...inputFields, slug: e.target.value })} />
          </div>
          <div>
            <label for="shortDescription">Short Description</label>
            <textarea rows="4"
              class="block p-2.5 w-full text-xs text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              name='shortDescription'
              value={inputFields.shortDescription}
              onChange={e => setInputFields({ ...inputFields, shortDescription: e.target.value })}
            />
          </div>
          <div>
            <label for="category">Categories</label>
            {/* <input type='text' id="category" name="category"
              value={inputFields.categories}
              onChange={e => setInputFields({ ...inputFields, categories: e.target.value })}
            /> */}
            <Listbox value={selectedCats} onChange={setSelectedCats} multiple>
              <div className="relative mt-1">
                <Listbox.Button className="relative w-full m-2 cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                  {selectedCats.map((category) => category.title).join(', ')}
                </Listbox.Button>
                <Listbox.Options className="z-50 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {categories.map((cat) => (
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
          <div>
            <label for="tags">Tags</label>
            {/* <input type='text' id="tags" name="tags"
              value={inputFields.tags}
              onChange={e => setInputFields({ ...inputFields, tags: e.target.value })}
            /> */}
            <Listbox value={selectedTags} onChange={setSelectedTags} multiple>
              <div className="relative mt-1">
                <Listbox.Button className="relative w-full m-2 cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                  {selectedTags.map((tag) => tag.title).join(', ')}
                </Listbox.Button>
                <Listbox.Options className="z-50 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {tags.map((tag) => (
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
          <div>
            <label for="timelines">Timeline</label>
            <input type='text' id="timeline" name="timeline"
              value={inputFields.timeLine}
              onChange={e => setInputFields({ ...inputFields, timeLine: e.target.value })} />
          </div>
          <div>
            <label for="publishedAt">Published At</label>
            <input type='date' id="publishedAt" name="publishedAt"
              value={inputFields.publishedAt}
              onChange={e => setInputFields({ ...inputFields, publishedAt: e.target.value })} />
          </div>
          <div>
            <label for="mainImage">Main Image (link to svg)</label>
            <input type='url' id="mainImage" name="mainImage"
              value={inputFields.mainImage}
              onChange={e => setInputFields({ ...inputFields, mainImage: e.target.value })} />
          </div>
          <div>
            <label for="tokenUtility">Token Utility</label>
            <textarea rows="3"
              class="block p-2.5 w-full text-xs text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              name='tokenUtility'
              value={inputFields.tokenUtility}
              onChange={e => setInputFields({ ...inputFields, tokenUtility: e.target.value })}
            />
            <input type='number' id="tokenUtilityStrength" name="tokenUtilityStrength"
              value={inputFields.tokenUtilityStrength}
              onChange={e => setInputFields({ ...inputFields, tokenUtilityStrength: Number(e.target.value) })} />
          </div>
          <div>
            <label for="businessModel">Business Model</label>
            <textarea rows="3"
              class="block p-2.5 w-full text-xs text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              name='businessModel'
              value={inputFields.businessModel}
              onChange={e => setInputFields({ ...inputFields, businessModel: e.target.value })}
            />
            <input type='number' id="businessModel" name="businessModel"
              value={inputFields.businessModelStrength}
              onChange={e => setInputFields({ ...inputFields, businessModelStrength: Number(e.target.value) })} />
          </div>
          <div>
            <label for="valueCreation">Value Creation</label>
            <textarea rows="3"
              class="block p-2.5 w-full text-xs text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              name='valueCreation'
              value={inputFields.valueCreation}
              onChange={e => setInputFields({ ...inputFields, valueCreation: e.target.value })}
            />
            <input type='number' id="valueCreation" name="valueCreation"
              value={inputFields.valueCreationStrength}
              onChange={e => setInputFields({ ...inputFields, valueCreationStrength: Number(e.target.value) })} />
          </div>
          <div>
            <label for="valueCapture">Value Capture</label>
            <textarea rows="3"
              class="block p-2.5 w-full text-xs text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              name='valueCapture'
              value={inputFields.valueCapture}
              onChange={e => setInputFields({ ...inputFields, valueCapture: e.target.value })}
            />
            <input type='number' id="valueCapture" name="valueCapture"
              value={inputFields.valueCaptureStrength}
              onChange={e => setInputFields({ ...inputFields, valueCaptureStrength: Number(e.target.value) })} />
          </div>
          <div>
            <label for="demandDrivers">Demand Drivers</label>
            <textarea rows="3"
              class="block p-2.5 w-full text-xs text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              name='demandDrivers'
              value={inputFields.demandDrivers}
              onChange={e => setInputFields({ ...inputFields, demandDrivers: e.target.value })}
            />
            <input type='number' id="demandDrivers" name="demandDrivers"
              value={inputFields.demandDriversStrength}
              onChange={e => setInputFields({ ...inputFields, demandDriversStrength: Number(e.target.value) })} />
          </div>
          <p>total Strenght: {tokenStrength}</p>
          <div>
            <label>Our Take</label>
            <Tiptap setContent={setOurTake} />
          </div>
          <div>
            <label for="threeMonthHorizon">Three Month Horizon</label>
            <textarea rows="3"
              class="block p-2.5 w-full text-xs text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              name='threeMonthHorizon'
              value={inputFields.threeMonthHorizon}
              onChange={e => setInputFields({ ...inputFields, threeMonthHorizon: e.target.value })}
            />
          </div>
          <div>
            <label for="oneYearHorizon">One Year Horizon</label>
            <textarea rows="3"
              class="block p-2.5 w-full text-xs text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              name='oneYearHorizon'
              value={inputFields.oneYearHorizon}
              onChange={e => setInputFields({ ...inputFields, oneYearHorizon: e.target.value })}
            />
          </div>
          <div>
            <label for="upside">Upside</label>
            <textarea rows="3"
              class="block p-2.5 w-full text-xs text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              name='upside'
              value={inputFields.upside}
              onChange={e => setInputFields({ ...inputFields, upside: e.target.value })}
            />
          </div>
          <div>
            <label for="downside">Downside</label>
            <textarea rows="3"
              class="block p-2.5 w-full text-xs text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              name='downside'
              value={inputFields.downside}
              onChange={e => setInputFields({ ...inputFields, downside: e.target.value })}
            />
          </div>
          <div>
            <label for="decisionHorizon">Decision Horizon</label>
            <textarea rows="3"
              class="block p-2.5 w-full text-xs text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              name='decisionHorizon'
              value={inputFields.decisionHorizon}
              onChange={e => setInputFields({ ...inputFields, decisionHorizon: e.target.value })}
            />
          </div>
          <div>
            <label for="metrics">Metrics</label>
            <textarea rows="3"
              class="block p-2.5 w-full text-xs text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              name='metrics'
              value={inputFields.metrics}
              onChange={e => setInputFields({ ...inputFields, metrics: e.target.value })}
            />
          </div>
          <div>
            <label>Deep Dive</label>
            <Tiptap setContent={setDeepDive} />
          </div>
          <div>
            <label for="diagram">Diagram</label>
            <input type='url' id="diagram" name="diagram"
              value={inputFields.diagram}
              onChange={e => setInputFields({ ...inputFields, diagram: e.target.value })} />
          </div>
          <div>
            <label for="resources">Resources</label>
            <input type='url' id="resources" name="resources"
              value={inputFields.resources}
              onChange={e => setInputFields({ ...inputFields, resources: e.target.value })} />
          </div>
          <button type="submit" onClick={e => submitData(e)}>Submit</button>
        </form>
        {/* </div> */}

      </Layout>
    </>
  )
}

export async function getStaticProps() {
  // const data = await getPostAndMorePosts(params.slug, preview)

  const categories = await prisma.category.findMany()
  const tags = await prisma.tag.findMany()

  // console.log(data)

  return {
    props: {
      categories: categories || null,
      tags: tags || null,
    },
    revalidate: 1,
  }
}