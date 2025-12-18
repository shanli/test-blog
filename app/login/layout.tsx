import { AuthProvider } from '@/components/auth-provider'
import type { InferGetStaticPropsType, GetStaticProps } from 'next'
import { createServerClient } from '@/lib/connect'

// const getStaticProps = (async () => {
//   const supabase = await createServerClient()
//   return { props: { supabase } }
// }) satisfies GetStaticProps<any>

export default function LoginLayout({
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