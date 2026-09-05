import { ArrowUpRight, Clock3, MapPin } from 'lucide-react';
import { NOW_ITEMS } from '../content';
import { ButtonLink, ExternalArrow, Reveal, SectionHeader } from '../lib/ui';

export function Now() {
  return (
    <section id="now" className="section section--soft now-section" aria-labelledby="now-title">
      <div className="shell">
        <SectionHeader
          index="09"
          icon={Clock3}
          eyebrow="Now — a current snapshot"
          meta="As of September 2026"
          titleId="now-title"
          title={<>What I am <em>working on.</em></>}
          aside="A current snapshot of work, writing, maintenance, and learning."
        />

        <div className="now-layout">
          <Reveal className="now-intro">
            <p className="now-location"><MapPin size={16} aria-hidden="true" /> Roots in West Bengal · building in Bengaluru · open to remote collaboration</p>
          </Reveal>

          <div className="now-ledger">
            {NOW_ITEMS.map((item) => {
              const Icon = item.icon;
              const external = !item.href.startsWith('#');
              return (
                <article className={`now-row now-row--${item.tone}`} key={item.label}>
                  <div className="now-row__label"><Icon size={16} aria-hidden="true" /><span>{item.label}</span></div>
                  <p>{item.detail}</p>
                  <ButtonLink href={item.href} external={external} className="text-link">{item.action} {external ? <ExternalArrow /> : <ArrowUpRight size={15} />}</ButtonLink>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
