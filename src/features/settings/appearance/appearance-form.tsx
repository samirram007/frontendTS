import { fonts } from '@/config/fonts'
import { cn } from '@/lib/utils'
import { showSubmittedData } from '@/utils/show-submitted-data'
import { zodResolver } from '@hookform/resolvers/zod'
import { ChevronDownIcon } from '@radix-ui/react-icons'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button, buttonVariants } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useFont } from '@/core/contexts/font-context'

const appearanceFormSchema = z.object({
  font: z.enum(fonts, {
    invalid_type_error: 'Select a font',
    required_error: 'Please select a font.',
  }),
})

type AppearanceFormValues = z.infer<typeof appearanceFormSchema>

export function AppearanceForm() {
  const { font, setFont } = useFont()

  const defaultValues: Partial<AppearanceFormValues> = { font }

  const form = useForm<AppearanceFormValues>({
    resolver: zodResolver(appearanceFormSchema),
    defaultValues,
  })

  function onSubmit(data: AppearanceFormValues) {
    if (data.font != font) setFont(data.font)
    showSubmittedData(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='font'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Font</FormLabel>
              <div className='relative w-max'>
                <FormControl>
                  <select
                    className={cn(
                      buttonVariants({ variant: 'outline' }),
                      'w-[200px] appearance-none font-normal capitalize'
                    )}
                    {...field}
                  >
                    {fonts.map((font) => (
                      <option key={font} value={font}>
                        {font}
                      </option>
                    ))}
                  </select>
                </FormControl>
                <ChevronDownIcon className='absolute top-2.5 right-3 h-4 w-4 opacity-50' />
              </div>
              <FormDescription className='font-manrope'>
                Set the font you want to use in the dashboard.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit'>Update preferences</Button>
      </form>
    </Form>
  )
}
