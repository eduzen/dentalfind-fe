import { ArrowRight, BriefcaseBusiness, Building2 } from 'lucide-react'
import type { SignupRole } from '../../services/mockSignupApi'
import type { SignupCopy } from './signupCopy'

type SignupChoiceProps = {
  copy: SignupCopy
  onChoose: (role: SignupRole) => void
}

function SignupChoice({ copy, onChoose }: SignupChoiceProps) {
  return (
    <div className="signup-choice">
      <div className="signup-panel-heading">
        <span className="signup-step">01 / 03</span>
        <h3>{copy.chooseTitle}</h3>
        <p>{copy.chooseHint}</p>
      </div>
      <div className="signup-choice-grid">
        <button
          className="signup-choice-card"
          type="button"
          onClick={() => onChoose('professional')}
        >
          <span className="signup-choice-icon">
            <BriefcaseBusiness size={20} />
          </span>
          <span className="signup-choice-copy">
            <strong>{copy.workTitle}</strong>
            <small>{copy.workDescription}</small>
          </span>
          <ArrowRight className="signup-choice-arrow" size={18} />
        </button>
        <button className="signup-choice-card" type="button" onClick={() => onChoose('practice')}>
          <span className="signup-choice-icon">
            <Building2 size={20} />
          </span>
          <span className="signup-choice-copy">
            <strong>{copy.practiceTitle}</strong>
            <small>{copy.practiceDescription}</small>
          </span>
          <ArrowRight className="signup-choice-arrow" size={18} />
        </button>
      </div>
    </div>
  )
}

export default SignupChoice
