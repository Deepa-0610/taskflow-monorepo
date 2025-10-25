export interface Task {
  id: string
  title: string
  description?: string
  status: 'pending' | 'in-progress' | 'completed'
  priority: 'low' | 'medium' | 'high'
  createdAt: Date
  updatedAt: Date
  userId: string
}

export interface User {
  id: string
  email: string
  name?: string
  avatar?: string
  createdAt: Date
}

export interface AuthUser {
  id: string
  email: string
  name?: string
}