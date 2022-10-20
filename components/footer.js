import Container from './container'
import { TWITTER, DISCORD, LINKTREE } from '../lib/constants'
import { SocialIcon } from 'react-social-icons'
import MyModal from './feedback'

export default function Footer() {
  return (
    <footer className="border-t border-accent-2 bg-accent-1">
      <Container>
        <MyModal />
        <SocialIcon url={TWITTER} />
        <SocialIcon url={DISCORD} />
        <SocialIcon url={LINKTREE} />
      </Container>
    </footer>
  )
}



