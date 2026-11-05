import { BadgeCheck, Search, UsersRound } from 'lucide-react'

const icons = [BadgeCheck, Search, UsersRound]

export default function HowItWorksSteps({
  steps,
}: {
  steps: readonly { title: string; description: string }[]
}) {
  return (
    <ol className="how-steps">
      {steps.map((step, index) => {
        const Icon = icons[index % icons.length]
        return (
          <li className="how-step" key={step.title}>
            <div className="how-step-top">
              <span className="how-step-icon">
                <Icon size={24} aria-hidden="true" />
              </span>
              <span className="how-step-number">0{index + 1}</span>
            </div>
            <h2>{step.title}</h2>
            <p>{step.description}</p>
          </li>
        )
      })}
    </ol>
  )
}
