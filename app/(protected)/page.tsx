import { auth } from "auth"

export default async function ProtectedPage() {
  const session = await auth()
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold">NextAuth.js Example</h1>

      <div className="flex flex-col rounded-md bg-gray-100">
        <div className="rounded-t-md bg-gray-200 p-4 font-bold">Current Session</div>
        <pre className="whitespace-pre-wrap break-all px-4 py-6">{JSON.stringify(session, null, 2)}</pre>
      </div>
    </div>
  )
}
