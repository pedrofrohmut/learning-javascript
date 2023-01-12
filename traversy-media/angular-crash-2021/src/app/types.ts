export interface Task {
  id: string
  text: string
  day: string
  hasReminder: boolean
}

export type NewTask = {
  text: string
  day: string
  hasReminder: boolean
}

export type User = { 
  id: string, 
  name: string, 
  email:  string
}

export type NewUser = { 
  name: string, 
  email:  string
}
