import { auth } from "@/auth";
import SearchForm from "@/components/SearchForm";
import StartupCard, { StartupCardType } from "@/components/StartupCard";

import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { IDEALS_QUERY } from "@/sanity/lib/queries";

export default async function Home({ searchParams }: {
  searchParams: Promise<{ query?: string}>
}) {
    const query = (await searchParams).query;
    const params = { search: query || null };

    const session = await auth();

    console.log(session?.id);

    const { data: posts } = await sanityFetch({ query: IDEALS_QUERY, params })


  return (
    <>
     <section className="slate_container">
      <h1 className="heading">Give your idea, <br/>
        Connect with another technology!
      </h1>

      <p className="sub-heading !max-w-3xl">
        Submit your Idea, And Get notice from another developers!
      </p>

      <SearchForm query={query}/>
     </section>

      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search result for "${query}"` : 'All Ideas'}
        </p>

        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post: StartupCardType) => (
              <StartupCard key={post?._id} post={post}/>
            ))
          ) : (
            <p className="no-result">No idea found</p>
          )}
        </ul>
        <div className="py-6 mt-10 text-sm flex flex-col md:flex-row md:justify-between items-center gap-8">
                    <h1 className="text-slate-950 dark:text-slate-700">
                    Copyright © {new Date().getFullYear()} Benjo
                    </h1>
                    <h3 className="text-slate-950 dark:text-slate-700">Version 1.01 | Build 1</h3>
                  
                </div>
      </section>

      <SanityLive/>
      
                
            
      
    </>



  );
}
