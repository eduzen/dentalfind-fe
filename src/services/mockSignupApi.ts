export type SignupRole = 'professional' | 'practice'

export type SignupCredentials = {
  email: string
  password: string
}

export type ProfessionalSignupProfile = {
  firstName: string
  lastName: string
  profession: string
  city: string
}

export type PracticeSignupProfile = {
  firstName: string
  lastName: string
  practiceName: string
  city: string
  phone: string
}

export type ProfessionalSignupInput = SignupCredentials &
  ProfessionalSignupProfile & {
    role: 'professional'
  }

export type PracticeSignupInput = SignupCredentials &
  PracticeSignupProfile & {
    role: 'practice'
  }

export type SignupInput = ProfessionalSignupInput | PracticeSignupInput

export type MockSignupResult = {
  id: string
  role: SignupRole
  email: string
  isMock: true
}

/** Simulates account creation until a real signup API is available. */
export async function createMockSignup(input: SignupInput): Promise<MockSignupResult> {
  await new Promise((resolve) => setTimeout(resolve, 650))

  return {
    id: `demo-${Date.now()}`,
    role: input.role,
    email: input.email,
    isMock: true,
  }
}
