import { InputBox } from '../../utils/components/InputBox'

const CreateReferredByForm = () => {
  return (
    <>
      <div className="grid grid-cols-3 gap-3">
        <InputBox
          placeholder="Enter Referred name"
          type="text"
          name="agent.name"
          label="Referred Name"
        />
        <InputBox
          placeholder="Enter Referred name"
          type="text"
          name="agent.contact"
          label="Referred Contact"
        />
        <InputBox
          placeholder="Enter Referred name"
          type="number"
          name="agent.comission"
          label="Referred Comission"
        />
      </div>
    </>
  )
}

export default CreateReferredByForm
