import { AuthProvider } from '@/components/auth-provider'

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return 
  <>
    <AuthProvider>
      <section style={{'background': 'red'}}>{children}</section>
    </AuthProvider>
  </>
}