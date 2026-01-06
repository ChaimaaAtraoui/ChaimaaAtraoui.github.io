import ListLayout from '@/layouts/ListLayoutWithTags'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import Image from '@/components/Image'
import logo from '@/data/logo.png'

const POSTS_PER_PAGE = 5

export const generateStaticParams = async () => {
  const totalPages = Math.ceil(allBlogs.length / POSTS_PER_PAGE)
  const paths = Array.from({ length: totalPages }, (_, i) => ({ page: (i + 1).toString() }))

  return paths
}

export default function Page({ params }: { params: { page: string } }) {
  const posts = allCoreContent(sortPosts(allBlogs))
  const pageNumber = parseInt(params.page as string)
  const initialDisplayPosts = posts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  )
  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  }

  return (
    <>
      <ListLayout
        posts={posts}
        initialDisplayPosts={initialDisplayPosts}
        pagination={pagination}
        title="All Posts"
      />
      {/* Centered logo at the end of the page */}
      <div className="flex justify-center pt-10">
        <Image src={logo} alt="Your Logo" className="h-32 w-32" />
      </div>
    </>
  )
}
