"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { useAuth } from "@/components/auth-provider"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { createServerClient } from "@/lib/connect"
import type { Post } from "@/types"
import { formatDate } from "@/lib/utils"
import { Edit, Trash2, Eye, EyeOff, Globe, Lock } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function Blog() {
  const [posts, setPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { user, supabase } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  // const supabase = createServerClient()
  // const [supabase, setSupabase] = useState<any>(null);
  // useEffect(() => {
  //   console.log('222222')
  //   const getSupabase = async () => {
  //     console.log('111111111')
  //     const supa = await createServerClient();
  //     console.log('supa', supa)
  //     setSupabase(supa)
  //   }
  //   getSupabase()
  // }, [])

  useEffect(() => {
    if (!user) {
      console.log('123344444')
      // router.push("/login")
      return
    }
    //  if (!supabase) {
    //   console.log('123344444')
    //   // router.push("/login")
    //   return
    // }

    const fetchPosts = async () => {
      try {
        console.log("Fetching posts for user:", user.id)
        const { data, error } = await supabase
          .from("posts")
          .select("*")
          .eq("author_id", user.id)
          .order("created_at", { ascending: false })

        if (error) {
          throw error
        }

        console.log("Fetched posts:", data)
        setPosts(data as Post[])
      } catch (error: any) {
        console.error("Error fetching posts:", error)
        toast({
          title: "获取文章失败",
          description: error.message || "发生了未知错误，请稍后再试",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchPosts()
  }, [user, supabase, router, toast])

  const togglePublishStatus = async (post: Post) => {
    try {
      const { error } = await supabase.from("posts").update({ published: !post.published }).eq("id", post.id)

      if (error) {
        throw error
      }

      setPosts(posts.map((p) => (p.id === post.id ? { ...p, published: !p.published } : p)))

      toast({
        title: post.published ? "文章已设为草稿" : "文章已发布",
        description: post.published ? "文章已从公开列表中移除" : "文章现在可以被公开访问",
      })
    } catch (error: any) {
      toast({
        title: "操作失败",
        description: error.message || "发生了未知错误，请稍后再试",
        variant: "destructive",
      })
    }
  }

  const toggleVisibilityStatus = async (post: Post) => {
    try {
      const { error } = await supabase.from("posts").update({ is_public: !post.is_public }).eq("id", post.id)

      if (error) {
        throw error
      }

      setPosts(posts.map((p) => (p.id === post.id ? { ...p, is_public: !p.is_public } : p)))

      toast({
        title: post.is_public ? "文章已设为私有" : "文章已设为公开",
        description: post.is_public ? "文章现在只有登录用户可见" : "文章现在所有人可见",
      })
    } catch (error: any) {
      toast({
        title: "操作失败",
        description: error.message || "发生了未知错误，请稍后再试",
        variant: "destructive",
      })
    }
  }

  const deletePost = async (postId: string) => {
    try {
      const { error } = await supabase.from("posts").delete().eq("id", postId)

      if (error) {
        throw error
      }

      setPosts(posts.filter((p) => p.id !== postId))

      toast({
        title: "文章已删除",
        description: "文章已成功删除",
      })
    } catch (error: any) {
      toast({
        title: "删除失败",
        description: error.message || "发生了未知错误，请稍后再试",
        variant: "destructive",
      })
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <p>加载中...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">我的文章</h1>
        <Link href="/blog/create">
          <Button>创建新文章</Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>文章管理</CardTitle>
          <CardDescription>管理您的所有博客文章</CardDescription>
        </CardHeader>
       
      </Card>
    </div>
  )
}
