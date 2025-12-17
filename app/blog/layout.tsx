export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <section style={{'background': 'red'}}>{children}</section>
}