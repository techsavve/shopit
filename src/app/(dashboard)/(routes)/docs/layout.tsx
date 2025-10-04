// app/(docs)/layout.tsx
export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="container-padded mx-auto max-w-6xl py-6">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Documentation</h1>
        <p className="text-sm md:text-base text-muted-foreground mt-1">Guides and references to integrate and use the platform effectively.</p>
      </div>
      <div className="grid gap-6">
        {children}
      </div>
    </div>
  )
}