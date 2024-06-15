import { Dice4 } from 'lucide-react'
import { Outlet } from 'react-router-dom'

import { ThemeToggle } from '@/components/theme-toggle'
import texts from '@/text/pt-BR.json'

export function AuthLayout() {
  const currentYear = new Date().getFullYear()
  return (
    <section className="grid min-h-screen grid-cols-2">
      <div className="flex h-full flex-col justify-between border-r border-foreground/5 bg-muted p-10 text-muted-foreground">
        <div className="flex items-center gap-3 text-lg text-foreground">
          <Dice4 className="h-10 w-10" />
          <span className="font-semibold">{texts.dash.title}</span>

          <div className="ml-auto">
            <ThemeToggle />
          </div>
        </div>

        <footer className="text-sm">
          {texts.dash.footer} {currentYear}
        </footer>
      </div>

      <div className="relative flex flex-col items-center justify-center antialiased">
        <Outlet />
      </div>
    </section>
  )
}
