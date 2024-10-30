import { PropsWithChildren } from "react";
import { Footer, Navbar } from '../components'

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="content">
      <Navbar />
      {children}
      <Footer />
    </div>
  )
}
