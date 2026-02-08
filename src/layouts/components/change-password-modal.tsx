import { useForm } from 'react-hook-form'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/features/auth/contexts/AuthContext'

type FormData = {
  password: string
}

type ChangePasswordModalProps = {
  open: boolean
  onClose: (open: boolean) => void
}

export function ChangePasswordModal({
  open,
  onClose,
}: ChangePasswordModalProps) {
  const { changePassword } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    await changePassword(data)
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change Password</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            type="password"
            placeholder="New password"
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 7,
                message: 'Minimum 7 characters',
              },
            })}
          />

          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Updating...' : 'Update Password'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
