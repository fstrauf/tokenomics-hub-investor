import toast from "react-hot-toast"

export enum discordWebhooks {
  consulting = 'DISCORD_CONSULTING',
}

export async function sendDiscordMessage(message: string, webhook: discordWebhooks) {    
    const payload = {
      content: message,
    }
    
    const body = { payload, webhook }
  
    try {
      await fetch('/api/sendDiscordMessage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })      
      toast.success('Message sent', { position: 'bottom-right' })
      return true
    } catch (error) {
      console.error(error)
      toast.error('An error occurred', { position: 'bottom-right' })
      return false
    }

  }