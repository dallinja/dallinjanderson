import { Suspense } from 'react'
import { Link, createFileRoute, notFound } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'
import { Prose } from '#/components/site/prose'
import { getPost, getPostComponent, preloadPost } from '#/content/registry'

export const Route = createFileRoute('/writing/$slug')({
  loader: async ({ params }) => {
    const post = getPost(params.slug)
    if (!post) throw notFound()
    await preloadPost(post.slug)
    return { post }
  },
  head: ({ loaderData }) =>
    loaderData
      ? {
          meta: [
            { title: `${loaderData.post.title} — Dallin Anderson` },
            { name: 'description', content: loaderData.post.description },
          ],
        }
      : {},
  component: PostRoute,
})

function PostRoute() {
  const { post } = Route.useLoaderData()
  const Content = getPostComponent(post.slug)

  return (
    <article className="space-y-8">
      <header className="space-y-3">
        <Link
          to="/writing"
          className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 font-mono text-xs transition-colors"
        >
          <ArrowLeft className="size-3" aria-hidden />
          Writing
        </Link>
        <h1 className="text-3xl">{post.title}</h1>
        <time
          dateTime={post.date}
          className="text-muted-foreground block font-mono text-xs"
        >
          {post.date}
        </time>
      </header>
      <Suspense fallback={null}>
        <Prose>
          <Content />
        </Prose>
      </Suspense>
    </article>
  )
}
