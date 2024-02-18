import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import useSettings from "./useSettings";
import Spinner from "../../ui/Spinner";
import useUpdateSetting from "./useUpdateSetting";

function UpdateSettingsForm() {
  //eslint-disable-next-line no-unused-vars
  const {isLoading,
     settings: {minBookingLength, maxBookingLength, maxGuestsPerBooking, breakfastPrice} = {}, } = useSettings();
  
     const {isUpdating, updateSetting} = useUpdateSetting();
  if (isLoading) return <Spinner/>;
  
  const handleUpdate = (e,type) => {
    const value = e.target.value
    updateSetting({[type]: value})
  }

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input type="number" id="min-nights" disabled={isUpdating} defaultValue={minBookingLength} onBlur={e=>handleUpdate(e,"minBookingLength")}  />
      </FormRow>

      <FormRow label="Maximum nights/booking">
        <Input type="number" id="max-nights" disabled={isUpdating} defaultValue={maxBookingLength} onBlur={e=>handleUpdate(e,"maxBookingLength")} />
      </FormRow>

      <FormRow label="Maximum guests/booking">
        <Input type="number" id="max-guests" disabled={isUpdating} defaultValue={maxGuestsPerBooking} onBlur={e=>handleUpdate(e,"maxGuestsPerBooking")} />
      </FormRow>

      <FormRow label="Breakfast price">
        <Input type="number" id="breakfast-price" disabled={isUpdating} defaultValue={breakfastPrice} onBlur={e=>handleUpdate(e,"breakfastPrice")} />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
