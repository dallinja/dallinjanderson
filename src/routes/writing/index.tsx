import { createFileRoute } from '@tanstack/react-router'
import { PageHeader } from '#/components/site/page-header'
import { PostCard } from '#/components/site/content-card'
import { publishedPosts } from '#/content/registry'

export const Route = createFileRoute('/writing/')({ component: WritingIndex })

function WritingIndex() {
  return (
    <div>
      <PageHeader
        title="Writing"
        description="Technical notes, things learned while building software, and the occasional essay."
      />
      {publishedPosts.length === 0 ? (
        <p className="text-muted-foreground">Nothing here yet.</p>
      ) : (
        <ul className="divide-border divide-y">
          {publishedPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </ul>
      )}
    </div>
  )
}
