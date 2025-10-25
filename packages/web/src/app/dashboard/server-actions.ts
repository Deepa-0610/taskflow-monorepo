"use server"

import { z } from 'zod'
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || ''

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  // Do not throw in server actions at import time; throw when called so devs can run locally
  // without service role key. We'll let createClient fail later if misconfigured.
}

const serverSupabase = () => createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)

const addTaskSchema = z.object({
  title: z.string().trim().min(1).max(200),
  userId: z.string().min(1),
})

const updateTaskSchema = z.object({
  id: z.string().min(1),
  userId: z.string().min(1),
  updates: z.object({
    title: z.string().trim().min(1).max(200).optional(),
    is_complete: z.boolean().optional(),
  }),
})

const deleteTaskSchema = z.object({
  id: z.string().min(1),
  userId: z.string().min(1),
})

export async function addTask({ title, userId }: { title: string; userId: string }) {
  const parsed = addTaskSchema.parse({ title, userId })

  const supabase = serverSupabase()

  const { data, error } = await supabase
    .from('tasks')
    .insert([
      {
        title: parsed.title,
        user_id: parsed.userId,
        is_complete: false,
      },
    ])
    .select('id, title, is_complete')
    .single()

  if (error) {
    throw error
  }

  return data
}

export async function updateTask({ id, userId, updates }: { id: string; userId: string; updates: { title?: string; is_complete?: boolean } }) {
  const parsed = updateTaskSchema.parse({ id, userId, updates })

  const supabase = serverSupabase()

  const { data, error } = await supabase
    .from('tasks')
    .update(parsed.updates)
    .eq('id', parsed.id)
    .eq('user_id', parsed.userId)
    .select('id, title, is_complete, created_at, updated_at')
    .single()

  if (error) {
    throw error
  }

  return data
}

export async function deleteTask({ id, userId }: { id: string; userId: string }) {
  const parsed = deleteTaskSchema.parse({ id, userId })

  const supabase = serverSupabase()

  const { error } = await supabase
    .from('tasks')
    .delete()
    .eq('id', parsed.id)
    .eq('user_id', parsed.userId)

  if (error) {
    throw error
  }

  return true
}
