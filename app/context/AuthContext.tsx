'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'

type AuthContextType = {
  user: User | null
  loading: boolean
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

const AuthProvider = (children) => {

  const [user, setuser] = useState('')
  const [loading, setLoading] = useState(false);

  useEffect(
    
  )
}
