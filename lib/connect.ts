import { createClient } from "@supabase/supabase-js"
export function createServerClient() {
//   const cookieStore = cookies()
  console.log('SUPABASE_URL:', process.env.SUPABASE_URL)
  console.log('NEXT_PUBLIC_SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)
  console.log('SUPABASE_ANON_KEY:', process.env.SUPABASE_ANON_KEY)
  console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
  return createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!, {
    // cookies: {
    //   get(name: string) {
    //     return cookieStore.get(name)?.value
    //   },
    // },
  })
}
export default createServerClient;