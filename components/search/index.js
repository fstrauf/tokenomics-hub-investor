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
            <div class="justify-center relative text-gray-500">
                <InstantSearch
                    searchClient={algoliaInstance}
                    indexName="thub_protocols"
                >

                    <div class="relative">
                        <SearchBox
                            classNames={{
                                input: 'block p-2 pl-8 rounded border border-gray-200 bg-gray-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent',
                                submitIcon: 'hidden',
                                reset: 'flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none',
                                resetIcon: 'hidden',
                                loadingIndicator: 'hidden',
                                loadingIcon: 'hidden'

                            }}
                            placeholder="Search" aria-label="Search" aria-describedby="button-addon3"
                        />
                    </div>

                    <EmptyQueryBoundary fallback={null}>

                        <Hits hitComponent={Hit}
                            classNames={{
                                root: 'absolute w-full shadow overflow-y-auto bg-white',
                                list: 'bg-white border-gray-100 mt-2',
                                item: 'p-2 hover:bg-indigo-50'
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
