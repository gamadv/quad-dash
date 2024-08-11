import { Loader2 } from 'lucide-react'

interface ChartLoadStateProps {
  size: number
}

export default function ChartLoadState({ size }: ChartLoadStateProps) {
  return (
    <div className="flex h-[240px] w-full items-center justify-center">
      <Loader2
        className="animate-spin text-muted-foreground"
        height={size}
        width={size}
        speed="0.3"
      />
    </div>
  )
}
