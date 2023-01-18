// import Date from './date'

export default function Comments({ comments = [] }) {
  return (
    <>
      <ul>
        {comments?.map((comment) => (
          <div key={comment?.id} className="rounded-lg bg-white p-6 text-base">
            <hr class="my-8 h-px border-0 bg-gray-200"></hr>
            <footer class="mb-2 flex items-center justify-between">
              <div class="flex items-center">
                <p className="text-gray-90 mr-3 inline-flex items-center text-sm">
                  {comment?.author}
                </p>
                <p className="text-sm text-gray-600">
                  {comment?.date?.toISOString().slice(0, 10)}
                </p>
              </div>
            </footer>
            <pre
              id="message"
              className="block w-full whitespace-pre-line rounded-lg bg-slate-50 p-2.5 font-sans text-sm text-gray-900"
            >
              {comment?.comment}
            </pre>
          </div>
        ))}
      </ul>
    </>
  )
}
