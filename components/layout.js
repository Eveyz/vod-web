import Navbar from "./navbar"
import Footer from "./footer"

export default function Layout({ url, isAuthenticated, children }) {
  return (
    <>
      <Navbar url={url} isAuthenticated={isAuthenticated} />
      <main>{children}</main>
    </>
  )
}