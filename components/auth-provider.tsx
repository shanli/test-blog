"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
// import { getSupabaseClient } from "@/lib/supabase/client"
import { createServerClient } from '@/lib/connect'
import type { User } from "@supabase/supabase-js"
import type { InferGetStaticPropsType } from 'next'

type AuthContextType = {
  user: User | null
  loading: boolean
  signIn: (
    email: string,
    password: string,
  ) => Promise<{
    error: Error | null
  }>
  signInWithGitHub: () => Promise<{
    error: Error | null
  }>
  signUp: (
    email: string,
    password: string,
  ) => Promise<{
    error: Error | null
  }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)



export function AuthProvider({ children, supabase }: { children: React.ReactNode, supabase: any }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  
  // @ts-ignore
  useEffect(async () => {
    // 初始化时检查用户状态
    
    // const supabase = await createServerClient()
    console.log('supabase====>', supabase);
    // @ts-ignore
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })
    
    const {
      data: { subscription },
      // @ts-ignore
    } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log("Auth state changed:", session?.user)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const signIn = async (email: string, password: string) => {
    // @ts-ignore
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return { error }
  }

  const signInWithGitHub = async () => {
    // @ts-ignore
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        scopes: "read:user user:email", // 明确请求用户邮箱权限
      },
    })
    return { error }
  }

  const signUp = async (email: string, password: string) => {
    const supabase = await createServerClient()
    // @ts-ignore
    const { error } = await supabase.auth.signUp({
      email,
      password,
    })
    return { error }
  }

  const signOut = async () => {
    // @ts-ignore
    await supabase.auth.signOut()
  }

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signInWithGitHub, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
