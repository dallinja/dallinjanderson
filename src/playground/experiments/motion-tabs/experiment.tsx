import { useState } from 'react'
import './motion-tabs.css'

const TABS = ['Projects', 'Gallery', 'Studio', 'Profile']

/**
 * Ported from a standalone Vite sketch. It keeps its own dark, metallic
 * palette: the tokens are re-scoped on this component's own root element
 * rather than by editing the global theme, which is the escape hatch
 * described in docs/playground.md.
 */
export default function MotionTabs() {
  const [active, setActive] = useState(TABS[0])

  return (
    <div className="motion-tabs">
      <div className="motion-tabs__frame">
        <div className="motion-tabs__inner">
          <div className="motion-tabs__list" role="tablist">
            {TABS.map((tab) => (
              <button
                key={tab}
                type="button"
                role="tab"
                aria-selected={tab === active}
                className={
                  tab === active
                    ? 'motion-tabs__tab is-active'
                    : 'motion-tabs__tab'
                }
                onClick={() => setActive(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="motion-tabs__bubble is-active" aria-hidden />
          <div className="motion-tabs__bubble is-hover" aria-hidden />
        </div>
      </div>
      <p className="motion-tabs__note">
        Needs CSS anchor positioning. In a browser without it the tabs still
        work — the pill just stops following.
      </p>
    </div>
  )
}
