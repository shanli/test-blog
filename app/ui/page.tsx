import Link from 'next/link'
 
export default async function Post({  }) {
//   const posts = await getPosts()
 
  return (
    <ul>
      {/* {posts.map((post) => ( */}
        <li>
          <Link href={`/blog/slug`}>哈哈哈</Link>
        </li>
      {/* )) */}
    </ul>
  )
}