import Nano from 'nano-jsx'
import { Helmet } from 'nano-jsx'
import { Header } from '../components/header'
import { Footer } from '../components/footer'
import type { Post } from '../index'

type Props = {
  post: Post
}

export const Page = (props: Props) => {
  return (
    <div class="flex flex-col max-w-7xl justify-center prose">
      <Helmet>
        <title>{props.post.title}</title>
      </Helmet>
      <Header />
      <main class="items-center w-full flex-1 px-20 text-center">
        <h2>{props.post.title}</h2>
        <p>{props.post.body}</p>
      </main>
      <Footer />
    </div>
  )
}
