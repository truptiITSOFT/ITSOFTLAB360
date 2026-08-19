'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import Peer from 'peerjs'
import useCurrentUser from '@/features/auth/hooks/useCurrentUser'
import { toast } from 'sonner'

type PeerCtx = {
  peer: Peer | null
  ready: boolean
  peerId: string
}

const Ctx = createContext<PeerCtx>({
  peer: null,
  ready: false,
  peerId: '',
})

export function useGlobalPeer() {
  return useContext(Ctx)
}

export function PeerProvider({ children }: { children: React.ReactNode }) {
  const { data: emp } = useCurrentUser()
  const [peer, setPeer] = useState<Peer | null>(null)
  const [ready, setReady] = useState(false)
  const [peerId, setPeerId] = useState('')

  useEffect(() => {
    if (!emp) return

    const id = `u-${emp.id}`

    const p = new Peer(id, {
      host: '0.peerjs.com',
      port: 443,
      secure: true,
    })

    p.on('open', (id) => {
      setPeerId(id)
      setReady(true)
      console.log('Peer connected:', id)
    })

    p.on('error', (e) => {
      toast.error('This account is already connected to server in another device and not able to use Audio/Video call features.')
      console.error('Peer error', e)
    })

    setPeer(p)

    return () => {
      p.destroy()
    }
  }, [emp?.id])

  return (
    <Ctx.Provider value={{ peer, ready, peerId }}>
      {children}
    </Ctx.Provider>
  )
}