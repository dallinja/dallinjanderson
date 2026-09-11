import { Link } from '@tanstack/react-router'
import type { Post, Project } from '#/content/types'

export function PostCard({ post }: { post: Post }) {
  return (
    <li>
      <Link
        to="/writing/$slug"
        params={{ slug: post.slug }}
        className="group block py-4"
      >
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="group-hover:text-accent font-serif text-xl transition-colors">
            {post.title}
          </h3>
          <time
            dateTime={post.date}
            className="text-muted-foreground shrink-0 font-mono text-xs"
          >
            {post.date}
          </time>
        </div>
        <p className="text-muted-foreground mt-1 text-sm">{post.description}</p>
      </Link>
    </li>
  )
}

const STATUS_LABEL: Record<Project['status'], string> = {
  active: 'Active',
  dormant: 'Dormant',
  archived: 'Archived',
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <li>
      <Link
        to="/projects/$project"
        params={{ project: project.slug }}
        className="group block py-4"
      >
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="group-hover:text-accent font-serif text-xl transition-colors">
            {project.title}
          </h3>
          <span className="text-muted-foreground shrink-0 font-mono text-xs">
            {STATUS_LABEL[project.status]}
          </span>
        </div>
        <p className="text-muted-foreground mt-1 text-sm">
          {project.description}
        </p>
      </Link>
    </li>
  )
}
