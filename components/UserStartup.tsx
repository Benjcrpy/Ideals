import { client } from '@/sanity/lib/client'
import { IDEALS_BY_AUTHOR_QUERY } from '@/sanity/lib/queries'
import React from 'react'
import StartupCard, { StartupCardType } from './StartupCard'

const userStartup = async ({ id }: { id: string }) => {
    const startup = await client.fetch(IDEALS_BY_AUTHOR_QUERY, { id })

  return (
    <>
       {startup.length > 0 ? (
       startup.map((startup: StartupCardType ) => (
        <StartupCard key={startup._id} post={startup}  />
       ))
    ) : (
        <p className='no-result'>No post yet</p>
    )}
    </>
  )
}

export default userStartup
