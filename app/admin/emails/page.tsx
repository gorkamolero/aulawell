"use client"

import { useState, useEffect } from "react"
import { Mail, Send, Clock, CheckCircle, AlertCircle } from "lucide-react"

interface EmailTemplate {
  name: string
  description: string
  variables?: string[]
  emails?: string[]
}

interface EmailFlow {
  _id: string
  name: string
  slug: { current: string }
  description?: string
  trigger: string
  stepCount: number
}

interface EmailResult {
  status: "sent" | "failed"
  name?: string
  error?: string
  id?: string
}

export default function EmailAdminPage() {
  const [templates, setTemplates] = useState<Record<string, EmailTemplate>>({})
  const [flows, setFlows] = useState<EmailFlow[]>([])
  const [selectedFlow, setSelectedFlow] = useState("")

  const [selectedType, setSelectedType] = useState("contact-admin")
  const [loading, setLoading] = useState(false)

  const [message, setMessage] = useState<{
    type: "success" | "error"
    text: string
  } | null>(null)

  useEffect(() => {
    fetchTemplates()
    fetchFlows()
  }, [])

  const fetchTemplates = async () => {
    try {
      const response = await fetch("/api/email/test")
      const data = await response.json()
      setTemplates(data)
    } catch {
      console.error("Failed to fetch templates")
    }
  }

  const fetchFlows = async () => {
    try {
      const response = await fetch("/api/email/flow/test")
      const data = await response.json()
      if (data.flows) {
        setFlows(data.flows)
        if (data.flows.length > 0) {
          setSelectedFlow(data.flows[0].slug.current)
        }
      }
    } catch {
      console.error("Failed to fetch email flows")
    }
  }

  const sendTestEmail = async () => {
    setLoading(true)
    setMessage(null)

    try {
      // Handle welcome-sequence differently - call the demo sequence API
      if (selectedType === "welcome-sequence") {
        const response = await fetch("/api/email/demo-sequence", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            parentName: "Demo Parent",
            studentName: "Demo Student",
          }),
        })

        const data = await response.json()

        if (response.ok) {
          const successCount = data.results.filter(
            (r: EmailResult) => r.status === "sent"
          ).length
          setMessage({
            type: "success",
            text: `Demo sequence completed! ${successCount}/3 emails sent successfully.`,
          })
        } else {
          setMessage({
            type: "error",
            text: data.error || "Failed to send demo sequence",
          })
        }
      } else {
        // Handle other email types normally
        const response = await fetch("/api/email/test", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: selectedType,
          }),
        })

        const data = await response.json()

        if (response.ok) {
          setMessage({
            type: "success",
            text: "Test email sent successfully to miller@bravura.studio!",
          })
        } else {
          setMessage({
            type: "error",
            text: data.error || "Failed to send email",
          })
        }
      }
    } catch {
      setMessage({ type: "error", text: "Network error. Please try again." })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-navy mb-8">
          Email System Admin
        </h1>

        {/* Test Email Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Send className="w-5 h-5" />
            Send Test Emails
          </h2>

          <div className="space-y-4">
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
              <p className="text-sm text-amber-800">
                <strong>Note:</strong> Test emails are currently locked to
                miller@bravura.studio due to Resend domain verification
                requirements.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Template
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
              >
                {Object.entries(templates).map(([key, template]) => (
                  <option key={key} value={key}>
                    {template.name}
                  </option>
                ))}
              </select>
            </div>

            {templates[selectedType] && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">
                  {templates[selectedType].description}
                </p>
                {templates[selectedType].variables && (
                  <p className="text-xs text-gray-500">
                    Variables: {templates[selectedType].variables?.join(", ")}
                  </p>
                )}
              </div>
            )}

            <button
              onClick={sendTestEmail}
              disabled={loading}
              className="w-full bg-gold text-navy font-bold py-3 px-6 rounded-lg hover:bg-gold/90 transition-colors disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Test Email"}
            </button>

            {message && (
              <div
                className={`p-4 rounded-lg flex items-center gap-2 ${
                  message.type === "success"
                    ? "bg-green-50 text-green-800"
                    : "bg-red-50 text-red-800"
                }`}
              >
                {message.type === "success" ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <AlertCircle className="w-5 h-5" />
                )}
                {message.text}
              </div>
            )}
          </div>
        </div>

        {/* Email Sequences Overview */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Mail className="w-5 h-5" />
            Email Sequences
          </h2>

          {templates["welcome-sequence"] && (
            <div className="space-y-3">
              <p className="text-gray-600 mb-4">
                {templates["welcome-sequence"].description}
              </p>
              <div className="space-y-2">
                {templates["welcome-sequence"].emails?.map((email, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-sm">{email}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Email Flows Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mt-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Mail className="w-5 h-5" />
            Email Flows (New!)
          </h2>

          {flows.length > 0 ? (
            <div className="space-y-4">
              <p className="text-gray-600">
                Test the new email flow system that manages sequences of emails with timing and conditions.
              </p>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Flow
                </label>
                <select
                  value={selectedFlow}
                  onChange={(e) => setSelectedFlow(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                >
                  {flows.map((flow) => (
                    <option key={flow._id} value={flow.slug.current}>
                      {flow.name} ({flow.stepCount} steps)
                    </option>
                  ))}
                </select>
              </div>

              {selectedFlow && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  {flows.find(f => f.slug.current === selectedFlow)?.description && (
                    <p className="text-sm text-gray-600 mb-2">
                      {flows.find(f => f.slug.current === selectedFlow)?.description}
                    </p>
                  )}
                  <p className="text-xs text-gray-500">
                    Trigger: {flows.find(f => f.slug.current === selectedFlow)?.trigger}
                  </p>
                </div>
              )}

              <button
                onClick={async () => {
                  setLoading(true)
                  setMessage(null)
                  try {
                    const response = await fetch("/api/email/flow/test", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        flowSlug: selectedFlow,
                        recipientEmail: "miller@bravura.studio",
                      }),
                    })
                    const data = await response.json()
                    if (response.ok) {
                      setMessage({
                        type: "success",
                        text: `Flow "${data.flow.name}" started! ${data.flow.steps} emails will be sent according to the flow timing.`,
                      })
                    } else {
                      setMessage({
                        type: "error",
                        text: data.error || "Failed to start flow",
                      })
                    }
                  } catch {
                    setMessage({ type: "error", text: "Network error" })
                  } finally {
                    setLoading(false)
                  }
                }}
                disabled={loading || !selectedFlow}
                className="w-full bg-navy text-white font-bold py-3 px-6 rounded-lg hover:bg-navy/90 transition-colors disabled:opacity-50"
              >
                {loading ? "Starting Flow..." : "Test Email Flow"}
              </button>
            </div>
          ) : (
            <p className="text-gray-500">
              No active email flows found. Create flows in Sanity Studio under "Email System → Email Flows".
            </p>
          )}
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h3 className="font-semibold text-blue-900 mb-2">
            Setup Instructions
          </h3>
          <ol className="list-decimal list-inside space-y-2 text-sm text-blue-800">
            <li>
              Create email templates in Sanity Studio under "Email System → Email Templates"
            </li>
            <li>
              Use the template slugs: contact-form-admin, contact-form-thank-you
            </li>
            <li>
              Create email flows in Sanity Studio under "Email System → Email Flows"
            </li>
            <li>
              Email flows can have multiple steps with delays and conditions
            </li>
            <li>Test emails and flows here before going live</li>
            <li>Monitor email performance in your Resend dashboard</li>
            <li>Set up webhook endpoint in Resend for tracking</li>
          </ol>
          
          <div className="mt-4 p-4 bg-white rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">Email Flow Features:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-blue-800">
              <li>Trigger flows based on contact form, welcome series, or manual triggers</li>
              <li>Set delays between emails (minutes, hours, days, weeks)</li>
              <li>Add conditions like "if previous email opened" or "if link clicked"</li>
              <li>Skip weekends option for business hours delivery</li>
              <li>Timezone support for scheduled emails</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
