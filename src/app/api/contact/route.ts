import { NextRequest, NextResponse } from 'next/server'
import { submitContactForm, createLead } from '@/lib/forms'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      )
    }

    // Get metadata
    const ipAddress = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip')
    const userAgent = request.headers.get('user-agent')
    const sourceUrl = request.headers.get('referer')

    // Submit to database
    const contactForm = await submitContactForm({
      name: body.name,
      email: body.email,
      phone: body.phone,
      message: body.message,
      ipAddress: ipAddress || undefined,
      userAgent: userAgent || undefined,
      sourceUrl: sourceUrl || undefined,
    })

    // Also create a lead for CRM tracking
    await createLead({
      name: body.name,
      email: body.email,
      phone: body.phone || '',
      source: 'contact-form',
      sourceId: contactForm.id,
    })

    return NextResponse.json({ success: true, id: contactForm.id })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to submit form' },
      { status: 500 }
    )
  }
}
