// import { useSession } from "next-auth/react";
import Router from "next/router";
import { useForm } from "react-hook-form";


export default function Drafts({ posts, context, role }) {
    const { handleSubmit, formState } = useForm();
    // const { data: session, status } = useSession()


    const publishPost = async (id: string) => {
        // console.log(id)
        await fetch(`/api/post/publish/${id}`, {
            method: "PUT",
        });
        await Router.push("/");
    }    

    const deleteDraft = async (id: string) => {
        // console.log(id)
        await fetch(`/api/post/delete/${id}`, {
            method: "PUT",
        });
        await Router.push(`/${context}`);
    }

    return (
        <div className="overflow-x-auto relative">
            <table className="w-full text-sm text-left text-gray-500 mb-5">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" className="py-3 px-6">
                            Title
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Author
                        </th>
                        <th scope="col" className="py-3 px-6">
                        </th>
                        <th scope="col" className="py-3 px-6">
                        </th>
                        <th scope="col" className="py-3 px-6">
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {posts?.map((post, index) => {
                        return (
                            <tr key={index} className="bg-white border-b ">
                                <th scope="row" className="py-2 px-3 font-medium text-gray-900 whitespace-nowrap ">
                                    <p>{post.title}</p>
                                </th>
                                <td className="py-2 px-3">
                                    <p>{post?.author}</p>
                                </td>
                                <td className="py-2 px-3">
                                    <button onClick={() => Router.push("/editPost/[id]", `/editPost/${post.id}`)}
                                        className="w-32 rounded-md bg-dao-red px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                                        Edit
                                    </button>
                                </td>
                                <td className="py-2 px-3">
                                    <button onClick={handleSubmit(() => publishPost(post.id))}
                                        className="disabled:opacity-40 w-32 rounded-md bg-dao-red px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                                        disabled={formState.isSubmitting || !(role === 'contributor')}>
                                        Publish
                                    </button>
                                </td>
                                <td className="py-2 px-3">
                                    <button type="button" className="disabled:opacity-40 text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-800 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center mr-2"
                                    disabled={!(role === 'contributor')}
                                    onClick={handleSubmit(() => deleteDraft(post.id))}>
                                        <svg fill="white" viewBox="0 0 16 16" height="1em" width="1em">
                                            <path d="M4 8a.5.5 0 01.5-.5h7a.5.5 0 010 1h-7A.5.5 0 014 8z" />
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}