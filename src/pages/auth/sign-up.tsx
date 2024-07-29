import { useMutation } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import constants from '@/constants/index.json'
import { registerCompany } from '@/services/registerCompany'
import texts from '@/text/pt-BR.json'

const signUpForm = z.object({
  companyName: z.string(),
  managerName: z.string(),
  phone: z.string(),
  email: z.string().email(),
})

type SignUpForm = z.infer<typeof signUpForm>

export function SignUp() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignUpForm>()

  const { mutateAsync: registerCompanyFn } = useMutation({
    mutationFn: registerCompany,
  })

  async function handleSignUp(data: SignUpForm) {
    try {
      await registerCompanyFn({
        companyName: data.companyName,
        managerName: data.managerName,
        email: data.email,
        phone: data.phone,
      })

      toast.success(texts.register.request.success, {
        action: {
          label: texts.register.sendoToLoginLabel,
          onClick: () => navigate(`/sign-in?email=${data.email}`),
        },
        duration: 10000,
      })
    } catch (error) {
      toast.error(texts.register.request.error)
    }
  }

  return (
    <>
      <Helmet title={texts.register.SEO} />

      <div className="p-8">
        <Button variant="ghost" asChild className="absolute right-8 top-8">
          <Link to="/sign-in">{texts.register.toLoginBtn}</Link>
        </Button>

        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              {texts.register.title}
            </h1>
            <p className="text-sm text-muted-foreground">
              {texts.register.subtitle}
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit(handleSignUp)}>
            <div className="space-y-2">
              <Label htmlFor="companyName">
                {texts.register.form.companyName}
              </Label>
              <Input
                id="companyName"
                type="text"
                {...register('companyName')}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="managerName">
                {texts.register.form.managerName}
              </Label>
              <Input
                id="managerName"
                type="text"
                {...register('managerName')}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">{texts.register.form.email}</Label>
              <Input id="email" type="email" {...register('email')} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">{texts.register.form.phone}</Label>
              <Input id="phone" type="tel" {...register('phone')} />
            </div>

            <Button disabled={isSubmitting} className="w-full" type="submit">
              {texts.register.form.submitButton}
            </Button>

            <p className="px-6 text-center text-sm leading-relaxed text-muted-foreground">
              {texts.register.lgpd.text1}
              <a
                href={constants.lgpd.terms}
                className="underline underline-offset-4"
              >
                {texts.register.lgpd.text2}
              </a>
              {texts.register.lgpd.text3}
              <a
                href={constants.lgpd.privacy}
                className="underline underline-offset-4"
              >
                {texts.register.lgpd.text4}
              </a>
            </p>
          </form>
        </div>
      </div>
    </>
  )
}
