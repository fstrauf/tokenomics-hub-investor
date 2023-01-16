// import Date from './date'

export default function Comments({ comments = [] }) {
  return (
    <>
      <ul>
        {comments?.map((comment) => (
          <div
            key={comment?.id}
            className="rounded-lg bg-white p-6 text-base"
          >
            <hr class="h-px my-8 bg-gray-200 border-0"></hr>
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
            <p className="text-gray-500">{comment?.comment}</p>
          </div>
        ))}
      </ul>
    </>
  )
}
