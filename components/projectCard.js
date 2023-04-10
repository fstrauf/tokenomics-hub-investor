

export default function ProjectCard({ consultingNFT }) {

    const metadata = JSON.parse(consultingNFT.metadata)

    return (
            <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-md m-5">
                <div className="flex justify-end px-4 pt-4">
                </div>
                <div className="flex flex-col items-center pb-10">
                    <h5 className="mb-1 text-xl font-medium text-gray-900">Consulting Project</h5>
                    <span className="text-sm text-gray-500">Project: {metadata.name}</span>
                    <div className="py-4 flex flex-col divide-y divide-gray-400 divide-solid">
                        {metadata.attributes.map((attribute) => (
                            <span className="text-left px-2">
                                <span className="text-gray-600 mr-3">{attribute.trait_type}</span>
                                <span className="font-bold text-gray-700">{attribute.value}</span>
                            </span>
                        ))}
                    </div>
                    <div className="flex">
                        <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">Metaverse</span>
                    </div>
                </div>
            </div>
    )
}




