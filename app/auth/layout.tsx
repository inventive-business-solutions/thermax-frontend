export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="debug-border flex h-dvh items-center justify-center">
      {children}
    </div>
  )
}
