import { getPayload } from 'payload'
import config from '@payload-config'
import NavbarClient from './NavbarClient'

export default async function Navbar() {
  const payload = await getPayload({ config })
  const header = await payload.findGlobal({ slug: 'header', depth: 1 })

  const navItems = (header.navItems ?? [])
    .map((item) => {
      const page = item.page
      const slug = typeof page === 'object' && page !== null ? page.slug : null
      if (!slug) return null
      return { label: item.label, slug }
    })
    .filter((item): item is { label: string; slug: string } => item !== null)

  return <NavbarClient navItems={navItems} />
}