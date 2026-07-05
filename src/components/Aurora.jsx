// Fond « Aurora Sunset » — une seule couche fixe derrière toute la page.
// Des nappes de couleur floutées (violet → magenta → rose → ambre) qui dérivent
// lentement, plus un voile sombre pour garder la lisibilité du texte par-dessus.
// Tout le style vit dans index.css (.aurora*) ; la dérive se coupe en reduced-motion.
export default function Aurora() {
  return (
    <div className="aurora" aria-hidden="true">
      <div className="aurora__blob aurora__blob--violet" />
      <div className="aurora__blob aurora__blob--magenta" />
      <div className="aurora__blob aurora__blob--rose" />
      <div className="aurora__blob aurora__blob--amber" />
      <div className="aurora__veil" />
    </div>
  )
}
