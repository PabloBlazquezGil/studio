import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, Check, Copy, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { Lang } from '@/i18n/routes';
import { useTranslations } from '@/i18n/ui';
import { getBudgetRanges, getProjects, getServices } from '@/lib/content';
import { contactEmail } from '@/lib/data';
import { cn } from '@/lib/utils';

const fieldClass =
  'w-full border border-linen/15 bg-linen/5 px-4 py-3 text-sm text-linen outline-hidden transition-colors placeholder:text-linen/30 focus:border-gold focus:bg-gold/5';
const labelClass = 'mb-2 block text-xs font-medium text-linen/60';

/**
 * Briefing por pasos. Al terminar abre el programa de correo del visitante (mailto:)
 * con todas las respuestas ya escritas en el mensaje.
 */
export default function ContactForm({ lang }: { lang: Lang }) {
  const t = useTranslations(lang).form;
  const steps = t.steps;
  const services = getServices(lang);
  const budgetRanges = getBudgetRanges(lang);
  const { toast } = useToast();
  const [step, setStep] = useState(0);
  const [types, setTypes] = useState<string[]>([]);
  const [when, setWhen] = useState('');
  const [where, setWhere] = useState('');
  const [budget, setBudget] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState<{ subject: string; body: string } | null>(null);
  const [copied, setCopied] = useState(false);

  // Llegar desde un proyecto (?proyecto=slug) deja el mensaje empezado.
  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get('proyecto');
    const project = getProjects(lang).find((p) => p.slug === slug);
    if (project) setMessage((m) => m || t.fromProject(project.title));
  }, [lang, t]);

  const canContinue = [types.length > 0, true, budget !== '', name !== '' && email !== ''][step];

  const toggleType = (type: string) =>
    setTypes((current) => (current.includes(type) ? current.filter((t) => t !== type) : [...current, type]));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (step < steps.length - 1) {
      if (canContinue) setStep(step + 1);
      return;
    }
    if (!name || !email) {
      toast({ variant: 'destructive', title: t.errorTitle, description: t.errorMissing });
      return;
    }

    const mail = t.mail;
    const subject = mail.subject(name);
    const body = [
      mail.greeting,
      '',
      mail.intro(name),
      mail.replyTo(email),
      '',
      `${mail.what}: ${types.join(', ')}`,
      `${mail.date}: ${when || mail.tbd}`,
      `${mail.place}: ${where || mail.tbd}`,
      `${mail.budget}: ${budget}`,
      '',
      `${mail.message}:`,
      message || mail.noMessage,
    ].join('\n');

    setSent({ subject, body });
    window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  };

  const copyMessage = async () => {
    if (!sent) return;
    try {
      await navigator.clipboard.writeText(`${t.copySubject}: ${sent.subject}\n\n${sent.body}`);
      setCopied(true);
    } catch {
      toast({ variant: 'destructive', title: t.copyErrorTitle, description: t.copyErrorText(contactEmail) });
    }
  };

  if (sent) {
    return (
      <div className="text-left" role="status">
        <p className="font-headline text-3xl font-bold uppercase text-linen sm:text-4xl">{t.sentTitle}</p>
        <p className="mt-4 max-w-md leading-relaxed text-linen/70">
          {t.sentText}{' '}
          <a href={`mailto:${contactEmail}`} className="text-gold underline underline-offset-4">
            {contactEmail}
          </a>
          .
        </p>
        <pre className="mt-6 max-h-64 overflow-auto whitespace-pre-wrap border border-linen/15 bg-linen/5 p-4 font-body text-sm text-linen/80">
          {sent.body}
        </pre>
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={copyMessage}
            className="inline-flex items-center gap-2 bg-gold px-6 py-3 font-headline text-lg uppercase tracking-wide text-canopy transition-colors hover:bg-linen"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />} {copied ? t.copied : t.copy}
          </button>
          <a
            href={`mailto:${contactEmail}?subject=${encodeURIComponent(sent.subject)}&body=${encodeURIComponent(sent.body)}`}
            className="inline-flex items-center gap-2 border border-linen/30 px-6 py-3 font-headline text-lg uppercase tracking-wide text-linen transition-colors hover:border-gold hover:text-gold"
          >
            <Mail className="h-4 w-4" /> {t.reopen}
          </a>
          <button
            type="button"
            onClick={() => setSent(null)}
            className="px-2 py-3 font-headline text-lg uppercase tracking-wide text-linen/60 hover:text-linen"
          >
            {t.edit}
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="text-left">
      {/* Progreso */}
      <ol className="mb-10 grid grid-cols-4 gap-2" aria-label={t.stepsLabel}>
        {steps.map((label, index) => (
          <li key={label} aria-current={index === step ? 'step' : undefined}>
            <span className={cn('block h-0.5 transition-colors duration-500', index <= step ? 'bg-gold' : 'bg-linen/15')} />
            <span className={cn('mt-2 hidden text-xs sm:block', index === step ? 'text-linen' : 'text-linen/60')}>
              {String(index + 1).padStart(2, '0')} {label}
            </span>
          </li>
        ))}
      </ol>

      <div key={step} className="min-h-72 animate-in fade-in slide-in-from-right-4 duration-500">
        {step === 0 && (
          <fieldset>
            <legend className="font-headline text-3xl font-bold uppercase text-linen sm:text-4xl">{t.whatTitle}</legend>
            <p className="mt-2 text-sm text-linen/60">{t.whatHint}</p>
            <div className="mt-6 flex flex-wrap gap-2.5">
              {services.map(({ title }) => {
                const selected = types.includes(title);
                return (
                  <button
                    key={title}
                    type="button"
                    onClick={() => toggleType(title)}
                    aria-pressed={selected}
                    className={cn(
                      'inline-flex items-center gap-2 border px-4 py-2.5 font-headline text-lg uppercase tracking-wide transition-colors',
                      selected ? 'border-gold bg-gold text-canopy' : 'border-linen/20 text-linen hover:border-gold',
                    )}
                  >
                    {selected && <Check className="h-4 w-4" />}
                    {title}
                  </button>
                );
              })}
            </div>
          </fieldset>
        )}

        {step === 1 && (
          <fieldset className="space-y-5">
            <legend className="font-headline text-3xl font-bold uppercase text-linen sm:text-4xl">{t.whenTitle}</legend>
            <p className="text-sm text-linen/60">{t.whenHint}</p>
            <div>
              <label htmlFor="when" className={labelClass}>{t.when}</label>
              <input id="when" value={when} onChange={(e) => setWhen(e.target.value)} placeholder={t.whenPlaceholder} className={fieldClass} />
            </div>
            <div>
              <label htmlFor="where" className={labelClass}>{t.where}</label>
              <input id="where" value={where} onChange={(e) => setWhere(e.target.value)} placeholder={t.wherePlaceholder} className={fieldClass} />
            </div>
          </fieldset>
        )}

        {step === 2 && (
          <fieldset>
            <legend className="font-headline text-3xl font-bold uppercase text-linen sm:text-4xl">{t.budgetTitle}</legend>
            <p className="mt-2 text-sm text-linen/60">{t.budgetHint}</p>
            <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
              {budgetRanges.map((range) => (
                <button
                  key={range}
                  type="button"
                  onClick={() => setBudget(range)}
                  aria-pressed={budget === range}
                  className={cn(
                    'border px-4 py-3 text-left font-headline text-xl uppercase tracking-wide transition-colors',
                    budget === range ? 'border-gold bg-gold text-canopy' : 'border-linen/20 text-linen hover:border-gold',
                  )}
                >
                  {range}
                </button>
              ))}
            </div>
          </fieldset>
        )}

        {step === 3 && (
          <fieldset className="space-y-5">
            <legend className="font-headline text-3xl font-bold uppercase text-linen sm:text-4xl">{t.detailsTitle}</legend>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className={labelClass}>{t.name}</label>
                <input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder={t.namePlaceholder} required className={fieldClass} />
              </div>
              <div>
                <label htmlFor="email" className={labelClass}>{t.email}</label>
                <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t.emailPlaceholder} required className={fieldClass} />
              </div>
            </div>
            <div>
              <label htmlFor="message" className={labelClass}>{t.message}</label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                placeholder={t.messagePlaceholder}
                className={cn(fieldClass, 'resize-none')}
              />
            </div>
          </fieldset>
        )}
      </div>

      <div className="mt-8 flex items-center justify-between gap-4">
        {step > 0 ? (
          <button
            type="button"
            onClick={() => setStep(step - 1)}
            className="inline-flex items-center gap-2 font-headline text-lg uppercase tracking-wide text-linen/60 hover:text-linen"
          >
            <ArrowLeft className="h-4 w-4" /> {t.back}
          </button>
        ) : (
          <span />
        )}
        <button
          type="submit"
          disabled={!canContinue}
          className="inline-flex items-center gap-2 bg-gold px-8 py-3.5 font-headline text-lg uppercase tracking-wide text-canopy transition-colors hover:bg-linen disabled:cursor-not-allowed disabled:opacity-40"
        >
          {step < steps.length - 1 ? t.next : t.submit} <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </form>
  );
}
