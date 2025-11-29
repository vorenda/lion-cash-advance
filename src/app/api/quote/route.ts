import { NextRequest, NextResponse } from 'next/server'
import { submitQuoteRequest, createLead } from '@/lib/forms'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.name || !body.email || !body.phone) {
      return NextResponse.json(
        { error: 'Name, email, and phone are required' },
        { status: 400 }
      )
    }

    // Get metadata
    const ipAddress = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip')
    const userAgent = request.headers.get('user-agent')
    const sourceUrl = request.headers.get('referer')

    // Submit to database
    const quoteRequest = await submitQuoteRequest({
      name: body.name,
      email: body.email,
      phone: body.phone,
      loanAmount: body.loanAmount ? parseInt(body.loanAmount) : undefined,
      loanPurpose: body.loanPurpose,
      employmentStatus: body.employmentStatus,
      income: body.income ? parseInt(body.income) : undefined,
      city: body.city,
      state: body.state,
      zipCode: body.zipCode,
      ipAddress: ipAddress || undefined,
      userAgent: userAgent || undefined,
      sourceUrl: sourceUrl || undefined,
    })

    // Also create a lead for CRM tracking
    await createLead({
      name: body.name,
      email: body.email,
      phone: body.phone,
      source: 'quote-request',
      sourceId: quoteRequest.id,
      loanAmount: body.loanAmount ? parseInt(body.loanAmount) : undefined,
      city: body.city,
      state: body.state,
    })

    return NextResponse.json({ success: true, id: quoteRequest.id })
  } catch (error) {
    console.error('Quote request error:', error)
    return NextResponse.json(
      { error: 'Failed to submit quote request' },
      { status: 500 }
    )
  }
}
