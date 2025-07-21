import { useFieldArray, useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Plus } from "lucide-react";
import { Fragment } from "react";

const fieldTypes = ["string", "number", "nested","array","boolean"];

export default function SchemaField({ nestIndex = "", namePrefix = "fields" }) {
  const { control, register, watch, setValue } = useFormContext();

  const fullPath = nestIndex ? `${namePrefix}.${nestIndex}` : namePrefix;

  const { fields, append, remove } = useFieldArray({
    control,
    name: fullPath,
  });

  const watchedFields = watch(fullPath) || [];

  return (
    <div className="pl-4 border-l-2 space-y-3 mt-4">
      {fields.map((field, index) => {
        const currentPath = nestIndex
          ? `${nestIndex}.${index}`
          : `${index}`;
        const fieldPath = `${namePrefix}.${currentPath}`;

        return (
          <Fragment key={field.id}>
            <div className="flex items-center gap-3">
              <Input
                {...register(`${fieldPath}.name`)}
                placeholder="Field Name"
                className="w-1/4"
              />

              <select
                {...register(`${fieldPath}.type`)}
                className="border px-2 py-1 rounded"
                onChange={(e) => {
                  const selected = e.target.value;
                  setValue(`${fieldPath}.type`, selected);
                  if (selected === "nested") {
                    setValue(`${fieldPath}.fields`, []);
                  }
                }}
              >
                {fieldTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>

              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => remove(index)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>

            {watchedFields[index]?.type === "nested" && (
              <SchemaField
                nestIndex={`${currentPath}.fields`}
                namePrefix={namePrefix}
              />
            )}
          </Fragment>
        );
      })}

      <Button
  type="button"
  onClick={() => append({ name: "", type: "string" })}
  className="w-70 h-8 bg-blue-700 hover:bg-blue-800 text-white"
>
  <Plus className=" mr-1" />
  Add Field
</Button>

    </div>
  );
}
