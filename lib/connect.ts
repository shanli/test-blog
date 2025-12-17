import { createClient } from "@supabase/supabase-js"
async function createServerClient() {
//   const cookieStore = cookies()
//   console.log('SUPABASE_URL:', process.env.SUPABASE_URL)
  console.log('NEXT_PUBLIC_SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)
//   console.log('SUPABASE_ANON_KEY:', process.env.SUPABASE_ANON_KEY)
  console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    // cookies: {
    //   get(name: string) {
    //     return cookieStore.get(name)?.value
    //   },
    // },
  })
}

async function connectUsers() {
    let supabase = await createServerClient()
    console.log('supabase===========>', supabase);
    let { data: users, error } = await supabase
        .from('users')
        .select('id')
    console.log('data====>', users);
}
export default connectUsers;