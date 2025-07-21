import { useForm, FormProvider } from "react-hook-form";
import SchemaField from "./SchemaField";
import JsonPreview from "./JsonPreview";
import { Button } from "@/components/ui/button";

export default function SchemaBuilder() {
  const methods = useForm({
    defaultValues: {
      fields: [],
    },
  });

  const { handleSubmit, watch } = methods;

  const onSubmit = (data) => {
    console.log("Generated Schema:", data);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col lg:flex-row gap-6 items-start"
      >
        <div className="flex-1 space-y-6 w-full">
          <h2 className="text-2xl font-semibold ">JSON Schema Builder</h2>
          <SchemaField namePrefix="fields" />
          <Button type="submit">Submit</Button>
        </div>

        <div className="w-full lg:w-[40%]">
          <JsonPreview schema={watch("fields")} />
        </div>
      </form>
    </FormProvider>
  );
}
