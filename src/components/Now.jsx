import { ArrowUpRight, Clock3, MapPin } from 'lucide-react';
import { NOW_ITEMS } from '../content';
import { ButtonLink, Eyebrow, ExternalArrow } from '../lib/ui';

export function Now() {
  return (
    <section id="now" className="section section--soft now-section" aria-labelledby="now-title">
      <div className="shell now-layout">
        <div className="section-intro">
          <Eyebrow icon={Clock3}>Now · August 2026</Eyebrow>
          <h2 id="now-title">What I am<br /><em>working on.</em></h2>
          <p className="intro-lead">A current snapshot of work, writing, maintenance, and learning.</p>
          <div className="now-meta">
            <p><MapPin size={16} /> Roots in West Bengal · building in Bengaluru · open to remote collaboration</p>
          </div>
        </div>
        <div className="now-list">
          {NOW_ITEMS.map((item) => {
            const Icon = item.icon;
            const external = !item.href.startsWith('#');
            return (
              <article className={`now-row now-row--${item.tone}`} key={item.label}>
                <div className="now-row__label"><Icon size={16} /><span>{item.label}</span></div>
                <p>{item.detail}</p>
                <ButtonLink href={item.href} external={external} className="text-link">{item.action} {external ? <ExternalArrow /> : <ArrowUpRight size={15} />}</ButtonLink>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
