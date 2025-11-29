import { NextRequest, NextResponse } from 'next/server'
import { submitCallbackRequest, createLead } from '@/lib/forms'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.name || !body.phone) {
      return NextResponse.json(
        { error: 'Name and phone are required' },
        { status: 400 }
      )
    }

    // Submit to database
    const callbackRequest = await submitCallbackRequest({
      name: body.name,
      phone: body.phone,
      preferredTime: body.preferredTime,
      loanAmount: body.loanAmount ? parseInt(body.loanAmount) : undefined,
      urgency: body.urgency,
    })

    // Also create a lead for CRM tracking
    await createLead({
      name: body.name,
      phone: body.phone,
      source: 'callback-request',
      sourceId: callbackRequest.id,
      loanAmount: body.loanAmount ? parseInt(body.loanAmount) : undefined,
    })

    return NextResponse.json({ success: true, id: callbackRequest.id })
  } catch (error) {
    console.error('Callback request error:', error)
    return NextResponse.json(
      { error: 'Failed to submit callback request' },
      { status: 500 }
    )
  }
}
