import { useState } from 'react';
import { z } from 'zod';
import { toast } from 'sonner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Mail, MessageSquare, Send, MapPin } from 'lucide-react';

const CONTACT_EMAIL = 'hello@nexusblog.com';
const CONTACT_ENDPOINT = import.meta.env.VITE_CONTACT_FORM_ENDPOINT as string | undefined;

const contactSchema = z.object({
  name: z.string().trim().min(1, 'Please tell us your name.'),
  email: z.string().trim().email('Please enter a valid email address.'),
  subject: z.string().trim().min(2, 'A short subject helps us route your message.'),
  message: z.string().trim().min(10, 'Please write at least 10 characters so we can help.'),
});

type ContactFormData = z.infer<typeof contactSchema>;

const initialState: ContactFormData = { name: '', email: '', subject: '', message: '' };

const Contact = () => {
  const [formData, setFormData] = useState<ContactFormData>(initialState);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const usingMailtoFallback = !CONTACT_ENDPOINT;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const parsed = contactSchema.safeParse(formData);
    if (!parsed.success) {
      const next: Partial<Record<keyof ContactFormData, string>> = {};
      for (const issue of parsed.error.errors) {
        const key = issue.path[0] as keyof ContactFormData | undefined;
        if (key && !next[key]) next[key] = issue.message;
      }
      setFieldErrors(next);
      const firstMessage = parsed.error.errors[0]?.message ?? 'Please review the form for errors.';
      setFormError(firstMessage);
      return;
    }

    setFieldErrors({});
    setIsSubmitting(true);

    try {
      if (CONTACT_ENDPOINT) {
        const res = await fetch(CONTACT_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(parsed.data),
        });
        if (!res.ok) {
          throw new Error(`Submission failed (${res.status})`);
        }
        toast.success('Message sent', {
          description: "Thanks for reaching out — we'll reply within 24 hours.",
        });
        setFormData(initialState);
      } else {
        const subject = encodeURIComponent(`[Nexus] ${parsed.data.subject}`);
        const body = encodeURIComponent(
          `Name: ${parsed.data.name}\nEmail: ${parsed.data.email}\n\n${parsed.data.message}`,
        );
        window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
        toast.success('Opening your email app', {
          description: 'Send the prepared draft and we will get back to you shortly.',
        });
      }
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Something went wrong while sending your message.';
      setFormError(message);
      toast.error('Could not send', {
        description: `Please try again, or email us directly at ${CONTACT_EMAIL}.`,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name as keyof ContactFormData]) {
      setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Contact"
        description="Get in touch with the Nexus editorial team — pitches, partnerships, feedback, or just to say hello."
      />
      <Header />

      <main id="main-content" className="container-blog py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Get in Touch
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Have a question, suggestion, or just want to say hello? We'd love to hear from you.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Send us a Message
                </CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={handleChange}
                      autoComplete="name"
                      required
                      aria-invalid={fieldErrors.name ? 'true' : undefined}
                      aria-describedby={fieldErrors.name ? 'name-error' : undefined}
                    />
                    {fieldErrors.name && (
                      <p id="name-error" className="text-sm text-destructive" role="alert">
                        {fieldErrors.name}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      autoComplete="email"
                      inputMode="email"
                      required
                      aria-invalid={fieldErrors.email ? 'true' : undefined}
                      aria-describedby={fieldErrors.email ? 'email-error' : undefined}
                    />
                    {fieldErrors.email && (
                      <p id="email-error" className="text-sm text-destructive" role="alert">
                        {fieldErrors.email}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      placeholder="What's this about?"
                      value={formData.subject}
                      onChange={handleChange}
                      autoComplete="off"
                      required
                      aria-invalid={fieldErrors.subject ? 'true' : undefined}
                      aria-describedby={fieldErrors.subject ? 'subject-error' : undefined}
                    />
                    {fieldErrors.subject && (
                      <p id="subject-error" className="text-sm text-destructive" role="alert">
                        {fieldErrors.subject}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell us more about your inquiry..."
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      aria-invalid={fieldErrors.message ? 'true' : undefined}
                      aria-describedby={fieldErrors.message ? 'message-error' : undefined}
                    />
                    {fieldErrors.message && (
                      <p id="message-error" className="text-sm text-destructive" role="alert">
                        {fieldErrors.message}
                      </p>
                    )}
                  </div>

                  {formError && (
                    <p
                      className="text-sm text-destructive"
                      role="alert"
                      aria-live="polite"
                    >
                      {formError}
                    </p>
                  )}

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    <Send className="h-4 w-4 mr-2" aria-hidden="true" />
                    {isSubmitting
                      ? 'Sending…'
                      : usingMailtoFallback
                        ? 'Send via Email'
                        : 'Send Message'}
                  </Button>

                  {usingMailtoFallback && (
                    <p className="text-xs text-muted-foreground">
                      Submitting opens your email client with a prepared draft to{' '}
                      <a
                        href={`mailto:${CONTACT_EMAIL}`}
                        className="underline underline-offset-2"
                      >
                        {CONTACT_EMAIL}
                      </a>
                      . Configure <code className="font-mono">VITE_CONTACT_FORM_ENDPOINT</code> to wire
                      up direct delivery.
                    </p>
                  )}
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="h-5 w-5" />
                    Contact Information
                  </CardTitle>
                  <CardDescription>Other ways to reach us</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Mail className="h-5 w-5 text-primary" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">Email</h3>
                      <p className="text-muted-foreground">
                        <a
                          href={`mailto:${CONTACT_EMAIL}`}
                          className="hover:text-foreground underline-offset-4 hover:underline"
                        >
                          {CONTACT_EMAIL}
                        </a>
                      </p>
                      <p className="text-sm text-muted-foreground">
                        We typically respond within 24 hours
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <MapPin className="h-5 w-5 text-primary" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">Location</h3>
                      <p className="text-muted-foreground">Global</p>
                      <p className="text-sm text-muted-foreground">
                        We're a distributed team working worldwide
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Frequently Asked Questions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-foreground mb-2">
                        Can I contribute to the blog?
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        We welcome guest contributors! Please reach out with your ideas and writing samples.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-medium text-foreground mb-2">
                        How often do you publish new content?
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        We publish new articles several times a week across all our categories.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-medium text-foreground mb-2">
                        Do you offer partnerships or collaborations?
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Yes! We're open to partnerships with brands and creators that align with our values.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
