
import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import { RenderBlocks } from '../components/blocks/RenderBlocks'
import Navbar from '../components/Navbar'

export default async function DynamicPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'pages',
    where: { slug: { equals: slug } },
    limit: 1,
  })

  const page = result.docs[0]
  if (!page) return notFound()

  return (
    <>

    < Navbar/>
     <main style={{ backgroundColor: '#fffafc', minHeight: '100vh', paddingTop: '6rem' }}>
      <h1
        style={{
          color: '#3d1f2a',
          fontSize: '2.5rem',
          fontWeight: 700,
          textAlign: 'center',
          maxWidth: '900px',
          margin: '0 auto 2rem',
          padding: '0 1.5rem',
        }}
      >
        {page.title}
      </h1>
      <RenderBlocks blocks={page.content ?? []} />
    </main>
    </>
    
   
  )
}

export async function generateStaticParams() {
  const payload = await getPayload({ config })
  const pages = await payload.find({ collection: 'pages', limit: 100 })
  return pages.docs.map((p) => ({ slug: p.slug }))
}
