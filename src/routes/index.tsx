import { Link, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold">Dallin Anderson</h1>
      <p className="mt-4 text-lg">
        <Link to="/playground" className="underline">
          Playground
        </Link>
      </p>
    </div>
  )
}
