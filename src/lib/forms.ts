import prisma from './db'

// Submit contact form
export async function submitContactForm(data: {
  name: string
  email: string
  phone?: string
  message: string
  sourceUrl?: string
  ipAddress?: string
  userAgent?: string
}) {
  return await prisma.contactForm.create({
    data,
  })
}

// Submit quote request
export async function submitQuoteRequest(data: {
  name: string
  email: string
  phone: string
  loanAmount?: number
  loanPurpose?: string
  employmentStatus?: string
  income?: number
  city?: string
  state?: string
  zipCode?: string
  sourceUrl?: string
  ipAddress?: string
  userAgent?: string
}) {
  return await prisma.quoteRequest.create({
    data,
  })
}

// Submit callback request
export async function submitCallbackRequest(data: {
  name: string
  phone: string
  preferredTime?: string
  loanAmount?: number
  urgency?: string
}) {
  return await prisma.callbackRequest.create({
    data,
  })
}

// Track page view
export async function trackPageView(data: {
  page: string
  pageType?: string
  city?: string
  state?: string
  ipAddress?: string
  userAgent?: string
  referrer?: string
  sessionId?: string
}) {
  return await prisma.pageView.create({
    data,
  })
}

// Subscribe to newsletter
export async function subscribeNewsletter(data: {
  email: string
  name?: string
  city?: string
  state?: string
}) {
  return await prisma.emailSubscriber.upsert({
    where: { email: data.email },
    update: { subscribed: true },
    create: data,
  })
}

// Create lead from any source
export async function createLead(data: {
  name: string
  email?: string
  phone: string
  source: string
  sourceId?: string
  loanAmount?: number
  city?: string
  state?: string
  status?: string
  notes?: string
}) {
  return await prisma.lead.create({
    data,
  })
}

// Update lead status
export async function updateLeadStatus(
  id: string,
  status: string,
  notes?: string
) {
  return await prisma.lead.update({
    where: { id },
    data: {
      status,
      notes,
      lastContactedAt: new Date(),
    },
  })
}

// Get leads by status
export async function getLeadsByStatus(status: string) {
  return await prisma.lead.findMany({
    where: { status },
    orderBy: { createdAt: 'desc' },
  })
}

// Get recent leads
export async function getRecentLeads(limit = 10) {
  return await prisma.lead.findMany({
    take: limit,
    orderBy: { createdAt: 'desc' },
  })
}
