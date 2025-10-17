

'use client'

import { useForm, type UseFormReturn } from 'react-hook-form'
import { Form } from '@/components/ui/form'


// Services to fetch doctors and report templates
import FormInputField from "@/components/form-input-field";
import { DoctorDropdown } from './dropdown/doctor-dropdown'
import type { TestItem, TestItemConfiguration } from '../data/schema'
import { ReportTemplateFileDropdown } from './dropdown/report-template-files-dropdown'
import { useTestItemReportTemplateFileMutation } from '../data/queryOptions';


type Props = {
  form: UseFormReturn<TestItemConfiguration>
  gapClass?: string
}

export function TestConfigurationForm({ form, gapClass }: Props) {

  const {mutate: saveTestConfig} = useTestItemReportTemplateFileMutation();

  const onSubmit = (values: TestItemConfiguration) => {

    
      saveTestConfig(values,{
        onSuccess:()=>{
          form.reset();
        }
      });

  }

  return (
    <Form {...form}>
      <form
        id='test-configuration-form'
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-6 p-4'
      >
        <FormInputField type='text' form={form} gapClass='sr-only' name='testId' label='Name' />

       <DoctorDropdown form={form} gapClass={gapClass} />
       <ReportTemplateFileDropdown form={form} gapClass={gapClass} />

        <div className='flex justify-end'>
          <button
            type='submit'
            className='px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700'
          >
            Save Configuration
          </button>
        </div>
      </form>
    </Form>
  )
}


interface ConfigPageProps {
    currentRow?: TestItem
}
const ConfigurationPage = ({ currentRow }: ConfigPageProps) => {
  const form = useForm<TestItemConfiguration>({
    defaultValues: {
      testItemId: currentRow?.id,
      doctorId: undefined,
      reportTemplateName: undefined,
    },
  });


  return (
    <div className="p-6">
      <h1 className="font-semibold text-lg mb-4">
        {currentRow?.printName ?? 'Configure Test'}
      </h1>

      <div className="bg-white p-4 rounded shadow">
        <TestConfigurationForm form={form} />
      </div>
    </div>
  )
}



export default ConfigurationPage;