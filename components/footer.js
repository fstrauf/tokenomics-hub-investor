import Container from './container'
import { TWITTER, DISCORD, LINKTREE } from '../lib/constants'
import { SocialIcon } from 'react-social-icons';

export default function Footer() {
  return (
    <footer className="border-t border-accent-2 bg-accent-1">
      <Container>
        <SocialIcon url={TWITTER} />
        <SocialIcon url={DISCORD} />
        <SocialIcon url={LINKTREE} />
      </Container>
    </footer>
  )
}
