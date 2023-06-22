export default function UserViewer({ users, headerless=false }) {
  console.log("🚀 ~ file: UserViewer.tsx:2 ~ UserViewer ~ users:", users)
  if(headerless)return(<></>)
  if (users.length === 0)
    return (
      <div>
        <h1 className="section-head mt-10 mb-4 text-xl font-bold text-black md:mt-20 md:text-2xl lg:text-3xl">
          Ecosystem Users.
        </h1>
      </div>
    )

  return (
    <section>
      {!headerless && <h1 className="section-head mt-10 mb-4 text-xl font-bold text-black md:mt-20 md:text-2xl lg:text-3xl">
        Ecosystem Users.
      </h1>}
      
      <div className="flex justify-center rounded-lg border-2 p-2">
        <table className="mb-1 w-full text-left text-sm text-gray-500">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700">
            <tr>
              <th scope="col" className="py-3 px-6">
                Name
              </th>
              <th scope="col" className="py-3 px-6">
                Role
              </th>
              <th scope="col" className="py-3 px-6"></th>
            </tr>
          </thead>
          <tbody>
            {users?.length > 0 &&
              users?.map((input, index) => (
                <tr key={index} className="border-b bg-white ">
                  <th
                    scope="row"
                    className="whitespace-nowrap py-2 px-3 font-medium text-gray-900 "
                  >
                    {input.name}
                  </th>

                  <td className="py-2 px-3">
                    <pre
                      id="message"
                      className="block w-full whitespace-pre-line rounded-lg bg-slate-50 p-2.5 font-sans text-sm text-gray-900"
                    >
                      {input.role}
                    </pre>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
