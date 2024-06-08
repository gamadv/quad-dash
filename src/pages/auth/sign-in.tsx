import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import texts from '@/text/pt-BR.json'

const signInForm = z.object({
  email: z.string().email(),
})

type SignInForm = z.infer<typeof signInForm>

export function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignInForm>()

  async function handleSignIn(data: SignInForm) {
    console.log(data)

    await new Promise((resolve) => setTimeout(resolve, 2000))
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast.success(texts.login.request.success, {
        action: {
          label: texts.login.request.resend,
          onClick: () => {
            handleSignIn(data)
          },
        },
        closeButton: true,
      })
    } catch (error) {
      toast.error(texts.login.request.error)
    }
  }

  return (
    <>
      <Helmet title={texts.register.SEO} />
      <Button variant="ghost" asChild className="absolute right-8 top-8">
        <Link to="/sign-up">{texts.register.label}</Link>
      </Button>

      <section className="p-8">
        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              {texts.login.title}
            </h1>
            <p className="text-sm text-muted-foreground">
              {texts.login.subtitle}
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit(handleSignIn)}>
            <div className="space-y-2">
              <Label htmlFor="email">{texts.login.form.inputLabel}</Label>
              <Input id="email" type="email" {...register('email')} />
            </div>

            <Button className="w-full" type="submit" disabled={isSubmitting}>
              {texts.login.form.submitButton}
            </Button>
          </form>
        </div>
      </section>
    </>
  )
}
