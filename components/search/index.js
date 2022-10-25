import algoliasearch from "algoliasearch/lite";
import { InstantSearch, SearchBox, Hits, useInstantSearch } from 'react-instantsearch-hooks-web';
import Link from 'next/link'

let prefix = ''

export default function Search({ isPost }) {
    
    const algoliaInstance = algoliasearch(
        process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID,
        process.env.NEXT_PUBLIC_ALGOLIA_ADMIN_SEARCH_KEY,
    )

    if(!isPost)
    {
        prefix ='posts/'
    }else{
        prefix =''
    }

    return (
        <>
            <div class="justify-center relative text-gray-500">
                <InstantSearch
                    searchClient={algoliaInstance}
                    indexName={process.env.NEXT_PUBLIC_ALGOLIA_INDEX}
                >

                    <div class="relative">
                        <SearchBox
                            classNames={{
                                input: 'block p-2 rounded border border-gray-200 bg-gray-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent',
                                submitIcon: 'hidden',
                                submit: 'hidden',
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
                                root: 'absolute w-full shadow overflow-y-auto bg-white mt-1',
                                list: 'bg-white border-gray-100 mt-2',
                                item: 'p-2 hover:bg-indigo-50'
                            }} />
                    </EmptyQueryBoundary>
                </InstantSearch>
            </div>
        </>
    )
}

function Hit({ hit}) {
    
    return (
        <Link href={`${prefix}${hit.slug}`} to={`${prefix}${hit.slug}`}>
            <h1>{hit.title}</h1>
        </Link>
    );
}

function EmptyQueryBoundary({ children, fallback }) {
    const { indexUiState } = useInstantSearch();

    if (!indexUiState.query) {
        return fallback;
    }

    return children;
}
