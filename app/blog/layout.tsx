import { AuthProvider } from '@/components/auth-provider'

export default function BlogLayout({
  children
}: {
  children: React.ReactNode
}) {
  return <>
   <AuthProvider>
        <section>{children}</section>
   </AuthProvider>
  </>
}