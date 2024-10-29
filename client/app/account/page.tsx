import { useAppStore } from '../providers/AppStoreProvider'

export default function Page() {
  const currentUser = useAppStore((state) => state.currentUser)

  return (
    <>
      <h1>Account</h1>
      <p>This route requires auth.</p>
      <p>
        It should also get the currently logged in user on the server via
        headers set in middleware. The only drawback is that fetching the
        headers this way opts the page into dynamic rendering.
      </p>
      <h2>Logged In User</h2>
      <p>ID: {currentUser?.id}</p>
      <p>Email: {currentUser?.email}</p>
    </>
  )
}
