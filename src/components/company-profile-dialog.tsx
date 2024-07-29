import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import {
  getManagedCompany,
  GetManagedCompanyResponse,
} from '@/services/get-managed-company'
import {
  updateProfile,
  UpdateProfileBody,
} from '@/services/update-company-profile'

import { Button } from './ui/button'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'

const companyProfileSchema = z.object({
  name: z.string().min(1),
  description: z.string().nullable(),
})

type CompanyProfileSchema = z.infer<typeof companyProfileSchema>

export function CompanyProfileDialog() {
  const queryClient = useQueryClient()
  const { data: managedCompany } = useQuery({
    queryKey: ['managed-company'],
    queryFn: getManagedCompany,
  })

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<CompanyProfileSchema>({
    resolver: zodResolver(companyProfileSchema),
    values: {
      name: managedCompany?.name ?? '',
      description: managedCompany?.description ?? '',
    },
  })

  const { mutateAsync: updateProfileFn } = useMutation({
    mutationFn: updateProfile,
    onMutate({ description, name }) {
      const { cached } = updateManagedCompanyCache({ description, name })

      return { previousProfile: cached }
    },
    onError(_, __, context) {
      if (context?.previousProfile) {
        updateManagedCompanyCache(context.previousProfile)
      }
    },
  })

  function updateManagedCompanyCache({
    name,
    description,
  }: CompanyProfileSchema) {
    const cached = queryClient.getQueryData<GetManagedCompanyResponse>([
      'managed-company',
    ])

    if (cached) {
      queryClient.setQueryData<GetManagedCompanyResponse>(['managed-company'], {
        ...cached,
        name,
        description,
      })
    }

    return { cached }
  }

  async function handleUpdateProfile(data: UpdateProfileBody) {
    try {
      await updateProfileFn({
        name: data.name,
        description: data.description,
      })

      toast.success('Perfil atualizado com sucesso!')
    } catch {
      toast.error('Falha ao atualizar o perfil, tente novamente')
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Perfil da loja</DialogTitle>
        <DialogDescription>
          Atualize as informações do seu estabelecimento visíveis ao seu cliente
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit(handleUpdateProfile)}>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="name">
              Nome
            </Label>
            <Input className="col-span-3" id="name" {...register('name')} />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="description">
              Descrição
            </Label>
            <Textarea
              className="col-span-3"
              id="description"
              {...register('description')}
            />
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost" type="button">
              Cancelar
            </Button>
          </DialogClose>
          <Button type="submit" variant="default" disabled={isSubmitting}>
            Salvar
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
