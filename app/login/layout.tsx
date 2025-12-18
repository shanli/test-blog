import { AuthProvider } from '@/components/auth-provider'
import type { InferGetStaticPropsType, GetStaticProps } from 'next'
import { createServerClient } from '@/lib/connect'

const getStaticProps = (async () => {
  const supabase = await createServerClient()
  return { props: { supabase } }
}) satisfies GetStaticProps<any>

export default function LoginLayout({
  children,
  supabase
}: {
  children: React.ReactNode,
  supabase: InferGetStaticPropsType<typeof getStaticProps>
}) {
  return <>
   <AuthProvider supabase={supabase}>
        <section style={{'background': 'red'}}>{children}</section>
   </AuthProvider>
  </>
}