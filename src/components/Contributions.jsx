const KINDS = [
  {
    verb: 'Write',
    items: ['Poetry', 'Stories', 'Articles', 'Essays', 'Personal experiences'],
    // fountain-pen nib
    icon: 'M12 3l6 7-6 11-6-11zM12 10v5M12 3v0',
  },
  {
    verb: 'Draw',
    items: ['Sketches', 'Illustrations', 'Comics', 'Paintings', 'Calligraphy'],
    // pencil
    icon: 'M4 20l2-6L16 4l4 4-10 10zM14 6l4 4M4 20l6-2',
  },
  {
    verb: 'Capture',
    items: ['Photography', 'Campus moments', 'People', 'Nature', 'Architecture'],
    // camera
    icon: 'M3 8h4l2-3h6l2 3h4v11H3zM12 17a4 4 0 100-8 4 4 0 000 8z',
  },
  {
    verb: 'Create',
    items: ['Ideas', 'Experiments', 'Technology', 'Designs', 'Anything original'],
    // lightbulb
    icon: 'M9 18h6M10 21h4M12 3a6 6 0 00-4 10.5c1 1 1.5 2 1.5 3.5h5c0-1.5.5-2.5 1.5-3.5A6 6 0 0012 3z',
  },
]

export default function Contributions() {
  return (
    <section className="contribute section" id="contribute">
      <div className="wrap">
        <h2 className="h-section contribute__title" data-reveal>
          What's your page going to look like?
        </h2>

        <ul className="contribute__cards">
          {KINDS.map((k) => (
            <li className="slip" key={k.verb} data-reveal>
              <div className="slip__inner">
                <svg className="slip__icon" viewBox="0 0 24 24" aria-hidden="true">
                  <path d={k.icon} />
                </svg>
                <h3 className="slip__verb">{k.verb}</h3>
                <ul className="slip__items">
                  {k.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
