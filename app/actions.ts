'use server'

import { createServerClient } from '@/lib/supabase'

type ContactFormData = {
  name: string
  email: string
  phone: string
  message: string
}

type NewsletterData = {
  email: string
}

export async function submitContactForm(data: ContactFormData) {
  const supabase = createServerClient()

  const { error } = await supabase.from('contact_submissions').insert({
    name: data.name.trim(),
    email: data.email.trim().toLowerCase(),
    phone: data.phone.trim(),
    message: data.message.trim(),
  })

  if (error) {
    return { success: false, error: 'Failed to submit. Please try again.' }
  }

  return { success: true }
}

export async function subscribeNewsletter(data: NewsletterData) {
  const email = data.email.trim().toLowerCase()
  const supabase = createServerClient()

  const { error } = await supabase
    .from('newsletter_subscribers')
    .upsert({ email }, { onConflict: 'email' })

  if (error) {
    return { success: false, error: 'Failed to subscribe. Please try again.' }
  }

  return { success: true }
}
