

export default function ProjectCard({ consultingNFT }) {

    const metadata = JSON.parse(consultingNFT.metadata)

    return (
        <>
            <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-md m-5">
                <div class="flex justify-end px-4 pt-4">
                </div>
                <div class="flex flex-col items-center pb-10">
                    <h5 class="mb-1 text-xl font-medium text-gray-900">Consulting Project</h5>
                    <span class="text-sm text-gray-500">Project: {metadata.name}</span>
                    <div class="py-4 flex flex-col divide-y divide-gray-400 divide-solid">
                        {metadata.attributes.map((attribute) => (
                            <span class="text-left px-2">
                                <span class="text-gray-600 mr-3">{attribute.trait_type}</span>
                                <span class="font-bold text-gray-700">{attribute.value}</span>
                            </span>
                        ))}
                    </div>
                    <div class="flex">
                        <span class="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">Metaverse</span>
                    </div>
                </div>
            </div>
        </>
    )
}




