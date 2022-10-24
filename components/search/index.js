import algoliasearch from "algoliasearch/lite";
import { InstantSearch, SearchBox, Hits, useInstantSearch } from 'react-instantsearch-hooks-web';
import { useState } from 'react'
import Link from 'next/link'

export default function Search() {
    // const algoliaInstance = algoliasearch(
    //     process.env['ALGOLIA_APPLICATION_ID'],
    //     process.env['ALGOLIA_ADMIN_SEARCH_KEY'],
    // )

    const [enabled, setEnabled] = useState(false)
    const algoliaInstance = algoliasearch(
        "WO3E6QTYIT",
        "8cf50f42219f8ed79a601fbc1ddc7833",
    )
    return (
        <>
            {/* <div class="flex justify-center"> */}
            {/* <div class="mb-3 xl:w-96"> */}
            <div class="inline-flex flex-col justify-center relative text-gray-500">
                <InstantSearch
                    searchClient={algoliaInstance}
                    indexName="thub_protocols"
                >

                    <div class="relative">
                        <SearchBox
                            classNames={{
                                input: 'block p-2 pl-8 rounded border border-gray-200 bg-gray-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent',
                                // submit: 'text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800',
                                // submitIcon: 'absolute right-2.5 bottom-7 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg px-4 py-4',
                                submitIcon: 'hidden',
                                reset: 'flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none',
                                resetIcon: 'hidden'

                            }}
                            placeholder="Search" aria-label="Search" aria-describedby="button-addon3"
                        />
                    </div>

                    <EmptyQueryBoundary fallback={null}>

                        <Hits hitComponent={Hit}
                            classNames={{
                                root: 'overflow-y-scroll w-70% absolute static z-1 w-full border divide-y shadow max-h-72 overflow-y-auto bg-white',
                                list: 'bg-white border border-gray-100 w-full mt-2 ',
                                item: 'block p-2 hover:bg-indigo-50'
                            }} />
                    </EmptyQueryBoundary>
                </InstantSearch>
            </div>
            {/* </div> */}
            {/* </div> */}

        </>
    )
}

function Hit({ hit }) {
    return (
        <Link href={`posts/${hit.slug}`} to={`posts/${hit.slug}`}>
            <h1>{hit.title}</h1>
        </Link>
    );
}

function App(props) {
    return (
        <InstantSearch {...props}>
            <SearchBox />
            <EmptyQueryBoundary fallback={null}>
                <Hits />
            </EmptyQueryBoundary>
        </InstantSearch>
    );
}

function EmptyQueryBoundary({ children, fallback }) {
    const { indexUiState } = useInstantSearch();

    if (!indexUiState.query) {
        return fallback;
    }

    return children;
}
